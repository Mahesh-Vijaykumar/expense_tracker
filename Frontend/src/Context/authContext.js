import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Construct base URL for auth endpoints
const getBaseUrl = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    if (!apiUrl) {
        return "http://localhost:5000/api/v1/auth/";
    }
    // If API URL already includes /api/v1, use it as is
    if (apiUrl.includes('/api/v1')) {
        return `${apiUrl}/auth/`;
    }
    // Otherwise, append /api/v1/auth/
    return `${apiUrl}/api/v1/auth/`;
};

const BASE_URL = getBaseUrl();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}user`);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}register`, {
                name,
                email,
                password
            });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}login`, {
                email,
                password
            });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            register,
            login,
            logout,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};


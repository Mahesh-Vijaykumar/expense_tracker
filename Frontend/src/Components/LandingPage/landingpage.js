import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../Context/authContext";

function LandingPage({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (isLogin) {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                onLoginSuccess();
            } else {
                setError(result.message);
            }
        } else {
            if (!formData.name) {
                setError("Name is required");
                setLoading(false);
                return;
            }
            const result = await register(formData.name, formData.email, formData.password);
            if (result.success) {
                onLoginSuccess();
            } else {
                setError(result.message);
            }
        }
        setLoading(false);
    };

    return (
        <LandingPageStyled>
            <div className="landing-container">
                <div className="content-wrapper">
                    <div className="left-section">
                        <h1 className="main-title">
                            <span className="gradient-text">Expense Tracker</span>
                        </h1>
                        <p className="subtitle">
                            Take control of your finances with our modern expense tracking solution
                        </p>
                        <div className="features">
                            <div className="feature-item">
                                <i className="fa-solid fa-chart-line"></i>
                                <span>Track Income & Expenses</span>
                            </div>
                            <div className="feature-item">
                                <i className="fa-solid fa-shield-halved"></i>
                                <span>Secure & Private</span>
                            </div>
                            <div className="feature-item">
                                <i className="fa-solid fa-mobile-screen-button"></i>
                                <span>Easy to Use</span>
                            </div>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="form-container">
                            <div className="form-header">
                                <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
                                <p>{isLogin ? "Sign in to continue" : "Sign up to get started"}</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <div className="input-group">
                                        <i className="fa-solid fa-user"></i>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required={!isLogin}
                                        />
                                    </div>
                                )}
                                <div className="input-group">
                                    <i className="fa-solid fa-envelope"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <i className="fa-solid fa-lock"></i>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {error && <div className="error-message">{error}</div>}
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
                                </button>
                            </form>
                            <div className="form-footer">
                                <p>
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <span onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError("");
                                        setFormData({ name: "", email: "", password: "" });
                                    }}>
                                        {isLogin ? "Sign Up" : "Sign In"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageStyled>
    );
}

const LandingPageStyled = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: move 20s linear infinite;
    }

    @keyframes move {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
    }

    .landing-container {
        width: 100%;
        max-width: 1200px;
        padding: 2rem;
        z-index: 1;
    }

    .content-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 30px;
        padding: 3rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

        @media (max-width: 968px) {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }

    .left-section {
        color: white;
        
        .main-title {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            font-weight: 800;
            
            .gradient-text {
                background: linear-gradient(45deg, #fff, #f0f0f0);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        }

        .subtitle {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            line-height: 1.6;
        }

        .features {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-top: 2rem;

            .feature-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                font-size: 1.1rem;

                i {
                    font-size: 1.5rem;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 0.8rem;
                    border-radius: 12px;
                }
            }
        }
    }

    .right-section {
        .form-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 2.5rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

            .form-header {
                text-align: center;
                margin-bottom: 2rem;

                h2 {
                    font-size: 2rem;
                    color: #333;
                    margin-bottom: 0.5rem;
                }

                p {
                    color: #666;
                    font-size: 0.95rem;
                }
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 1.2rem;

                .input-group {
                    position: relative;
                    display: flex;
                    align-items: center;

                    i {
                        position: absolute;
                        left: 1rem;
                        color: #667eea;
                        font-size: 1.1rem;
                    }

                    input {
                        width: 100%;
                        padding: 1rem 1rem 1rem 3rem;
                        border: 2px solid #e0e0e0;
                        border-radius: 12px;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        background: #f8f9fa;

                        &:focus {
                            outline: none;
                            border-color: #667eea;
                            background: white;
                            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                        }
                    }
                }

                .error-message {
                    background: #fee;
                    color: #c33;
                    padding: 0.8rem;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    text-align: center;
                }

                .submit-btn {
                    padding: 1rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 0.5rem;

                    &:hover:not(:disabled) {
                        transform: translateY(-2px);
                        box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
                    }

                    &:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }
                }
            }

            .form-footer {
                margin-top: 1.5rem;
                text-align: center;
                color: #666;
                font-size: 0.95rem;

                span {
                    color: #667eea;
                    cursor: pointer;
                    font-weight: 600;
                    transition: color 0.3s ease;

                    &:hover {
                        color: #764ba2;
                    }
                }
            }
        }
    }
`;

export default LandingPage;


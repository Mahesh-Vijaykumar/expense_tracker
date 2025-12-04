import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import {GlobalStyles} from "./Styles/GloabalStyle";
import {GlobalProvider} from "./Context/globalContext";
import {AuthProvider} from "./Context/authContext";
import {ThemeProvider} from "./Context/themeContext";

const root=ReactDom.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <GlobalStyles/>
                <GlobalProvider>
                    <App/>
                </GlobalProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
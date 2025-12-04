import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../Context/authContext";
import { useTheme } from "../../Context/themeContext";

function Header() {
    const { user } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <HeaderStyled isDarkMode={isDarkMode}>
            <div className="header-content">
                <div className="left-section">
                    <h1 className="app-title">Expense Tracker</h1>
                </div>
                <div className="right-section">
                    <div className="search-container">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="user-profile" onClick={toggleTheme}>
                        <div className="avatar-circle">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="user-info">
                            <span className="user-name">{user?.name || 'User'}</span>
                            <span className="user-email">{user?.email || 'user@example.com'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </HeaderStyled>
    );
}

const HeaderStyled = styled.header`
    padding: 1.5rem 2rem;
    background: ${props => props.isDarkMode 
        ? 'rgba(26, 26, 46, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)'};
    backdrop-filter: blur(10px);
    border-bottom: 1px solid ${props => props.isDarkMode 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.1)'};
    margin-bottom: 2rem;
    border-radius: 20px 20px 0 0;

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;

        .left-section {
            .app-title {
                font-size: 1.8rem;
                font-weight: 700;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin: 0;
            }
        }

        .right-section {
            display: flex;
            align-items: center;
            gap: 1.5rem;

            .search-container {
                position: relative;
                display: flex;
                align-items: center;
                background: ${props => props.isDarkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.05)'};
                border-radius: 12px;
                padding: 0.6rem 1rem;
                min-width: 300px;
                transition: all 0.3s ease;

                &:focus-within {
                    background: ${props => props.isDarkMode 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.08)'};
                    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
                }

                i {
                    color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
                    margin-right: 0.8rem;
                }

                input {
                    border: none;
                    outline: none;
                    background: transparent;
                    color: ${props => props.isDarkMode ? '#e0e0e0' : '#333'};
                    font-size: 0.95rem;
                    width: 100%;

                    &::placeholder {
                        color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
                    }
                }
            }

            .user-profile {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                cursor: pointer;
                padding: 0.5rem 1rem;
                border-radius: 12px;
                transition: all 0.3s ease;

                &:hover {
                    background: ${props => props.isDarkMode 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.05)'};
                }

                .avatar-circle {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.1rem;
                }

                .user-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    .user-name {
                        font-weight: 600;
                        font-size: 0.9rem;
                        color: ${props => props.isDarkMode ? '#e0e0e0' : '#333'};
                    }

                    .user-email {
                        font-size: 0.75rem;
                        color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
                    }
                }
            }
        }
    }

    @media (max-width: 968px) {
        .header-content {
            flex-direction: column;
            align-items: flex-start;

            .right-section {
                width: 100%;
                flex-direction: column;
                align-items: stretch;

                .search-container {
                    min-width: 100%;
                }
            }
        }
    }
`;

export default Header;


import React, { useState } from 'react';
import styled from "styled-components";
import avatar from "../../img/avatar.png"
import {menuItems} from "../../Utils/menuitems";
import {signout} from "../../Utils/icons";
import {useAuth} from "../../Context/authContext";
import {useTheme} from "../../Context/themeContext";

function Navigation({ active, setActive }) {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMenuClick = (itemId) => {
        setActive(itemId);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <MobileMenuToggle 
                isDarkMode={isDarkMode} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <i className={isMobileMenuOpen ? "fa-solid fa-times" : "fa-solid fa-bars"}></i>
            </MobileMenuToggle>
            <NavStyled isDarkMode={isDarkMode} isOpen={isMobileMenuOpen}>
                <div className="user-con">
                    <img src={avatar} alt="avatar" />
                    <div className="text">
                        <h2>{user?.name || 'User'}</h2>
                        <p>Your Money</p>
                    </div>
                </div>
                <ul className="menu-items">
                    {menuItems.map((item)=>{
                        return <li
                            key={item.id}
                            onClick={() => handleMenuClick(item.id)}
                            className={active === item.id ? 'active': ''}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    })}
                </ul>
                <div className="bottom-nav">
                    <li onClick={toggleTheme} className="theme-toggle">
                        <i className={isDarkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
                        <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                    </li>
                    <li onClick={logout}>
                        {signout} Sign Out
                    </li>
                </div>
            </NavStyled>
            {isMobileMenuOpen && (
                <Overlay onClick={() => setIsMobileMenuOpen(false)} />
            )}
        </>
    )
}

const MobileMenuToggle = styled.button`
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
    background: ${props => props.isDarkMode 
        ? 'rgba(26, 26, 46, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)'};
    border: 2px solid ${props => props.isDarkMode 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 12px;
    padding: 0.75rem;
    cursor: pointer;
    color: ${props => props.isDarkMode ? '#e0e0e0' : '#333'};
    font-size: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
        display: block;
    }
`;

const Overlay = styled.div`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    backdrop-filter: blur(2px);
    
    @media (max-width: 768px) {
        display: block;
    }
`;

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: ${props => props.isDarkMode 
        ? 'rgba(26, 26, 46, 0.85)' 
        : 'rgba(252, 246, 249, 0.78)'};
    border: 3px solid ${props => props.isDarkMode 
        ? 'rgba(255, 255, 255, 0.1)' 
        : '#FFFFFF'};
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    transition: all 0.3s ease;
    color: ${props => props.isDarkMode ? '#e0e0e0' : 'inherit'};
    
    /* Tablet styles */
    @media (max-width: 1024px) {
        width: 300px;
        padding: 1.5rem 1rem;
        border-radius: 24px;
    }
    
    /* Mobile styles */
    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: ${props => props.isOpen ? '0' : '-100%'};
        width: 280px;
        height: 100vh;
        z-index: 1000;
        border-radius: 0 24px 24px 0;
        padding: 4rem 1.5rem 2rem;
        transition: left 0.3s ease;
        box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
    }
    
    /* Small mobile */
    @media (max-width: 480px) {
        width: 260px;
        padding: 3.5rem 1rem 1.5rem;
    }
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        
        @media (max-width: 768px) {
            height: auto;
            padding-bottom: 1rem;
            border-bottom: 1px solid ${props => props.isDarkMode 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.1)'};
            margin-bottom: 1rem;
        }
        
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
            
            @media (max-width: 768px) {
                width: 60px;
                height: 60px;
            }
        }
        h2{
            color: ${props => props.isDarkMode ? '#e0e0e0' : 'rgba(34, 34, 96, 1)'};
            font-size: clamp(1rem, 2vw, 1.3rem);
            
            @media (max-width: 768px) {
                font-size: 1.1rem;
            }
        }
        p{
            color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.7)' : 'rgba(34, 34, 96, .6)'};
            font-size: clamp(0.85rem, 1.5vw, 1rem);
            
            @media (max-width: 768px) {
                font-size: 0.9rem;
            }
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.7)' : 'rgba(34, 34, 96, .6)'};
            padding: 0.75rem 1rem;
            position: relative;
            border-radius: 12px;
            min-height: 48px;
            
            @media (max-width: 768px) {
                padding: 1rem;
                margin: 0.4rem 0;
            }
            
            &:hover {
                background: ${props => props.isDarkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.03)'};
            }
            
            i{
                color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.7)' : 'rgba(34, 34, 96, 0.6)'};
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
                
                @media (max-width: 768px) {
                    font-size: 1.3rem;
                }
            }
            
            span {
                @media (max-width: 768px) {
                    font-size: 0.95rem;
                }
            }
        }
    }

    .active{
        color: ${props => props.isDarkMode ? '#e0e0e0' : 'rgba(34, 34, 96, 1)'} !important;
        i{
            color: ${props => props.isDarkMode ? '#e0e0e0' : 'rgba(34, 34, 96, 1)'} !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: ${props => props.isDarkMode ? '#667eea' : '#222260'};
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav {
        li {
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            min-height: 48px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            
            @media (max-width: 768px) {
                padding: 1rem;
            }
            
            &:hover {
                opacity: 0.8;
                transform: translateX(5px);
                background: ${props => props.isDarkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.03)'};
            }
        }
        .theme-toggle {
            margin-bottom: 1rem;
        }
    }
`;

export default Navigation;
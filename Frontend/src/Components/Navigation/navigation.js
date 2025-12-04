import React from 'react';
import styled from "styled-components";
import avatar from "../../img/avatar.png"
import {menuItems} from "../../Utils/menuitems";
import {signout} from "../../Utils/icons";
import {useAuth} from "../../Context/authContext";
import {useTheme} from "../../Context/themeContext";

function Navigation({ active, setActive }) {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <NavStyled isDarkMode={isDarkMode}>
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
                        onClick={() => setActive(item.id)}
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
    )
}

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
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: ${props => props.isDarkMode ? '#e0e0e0' : 'rgba(34, 34, 96, 1)'};
        }
        p{
            color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.7)' : 'rgba(34, 34, 96, .6)'};
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.7)' : 'rgba(34, 34, 96, .6)'};
            padding-left: 1rem;
            position: relative;
            i{
                color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.7)' : 'rgba(34, 34, 96, 0.6)'};
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
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
            &:hover {
                opacity: 0.8;
                transform: translateX(5px);
            }
        }
        .theme-toggle {
            margin-bottom: 1rem;
        }
    }
`;

export default Navigation;
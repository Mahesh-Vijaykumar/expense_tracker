import styled from "styled-components";
import bg from "./img/bg.png";
import {MainLayout} from "./Styles/layout";
import Orb from "./Components/Orb/orb";
import Navigation from "./Components/Navigation/navigation";
import React from "react";
import { useMemo,useState } from "react"
import Dashboard from "./Components/Dashboard/dashboard";
import Expenses from "./Components/Expenses/expenses";
import Incomes from "./Components/Incomes/incomes";
import {useGlobalContext} from "./Context/globalContext";
import History from "./Components/History/history";
import LandingPage from "./Components/LandingPage/landingpage";
import {useAuth} from "./Context/authContext";
import {useTheme} from "./Context/themeContext";
import Header from "./Components/Header/header";


function App(){
    const[active, setActive] = useState(1);
    const { isAuthenticated, loading } = useAuth();
    const { isDarkMode } = useTheme();
    const orbMemo=useMemo(()=>{
        return <Orb/>
    },[])
    
    const displayData=()=>{
        switch(active){
            case 1:
                return <Dashboard/>
            case 2:
                return <History/>
            case 3:
                return <Incomes/>
            case 4:
                return <Expenses/>
            default:
                return <Dashboard/>
        }
    }
    
    const handleLoginSuccess = () => {
        // This will trigger a re-render and show the main app
    }

    if (loading) {
        return <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            background: isDarkMode ? '#1a1a2e' : '#f5f5f5'
        }}>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <LandingPage onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <AppStyled bg={bg} isDarkMode={isDarkMode} className="App">
            {orbMemo}
            <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                    {displayData()}
                </main>
            </MainLayout>
        </AppStyled>
    );
}

const AppStyled=styled.div`
    height: 100vh;
    background: ${props => props.isDarkMode 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' 
        : `url(${props.bg})`};
    background-size: cover;
    background-position: center;
    position:relative;
    transition: all 0.3s ease;
    
    main{
        flex: 1;
        background: ${props => props.isDarkMode 
            ? 'rgba(26, 26, 46, 0.85)' 
            : 'rgba(252, 246, 249, 0.78)'};
        border: 3px solid ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF'};
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow-x: hidden;
        color: ${props => props.isDarkMode ? '#e0e0e0' : 'inherit'};
        transition: all 0.3s ease;
        &::-webkit-scrollbar{
            width: 0;
        }
    }
`;
export default App;
import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }
    :root{
        --primary-color:#222260;
        --primary-color2: rgba(34,34,96,.6);
        --primary-color3: rgba(34,34,96,.4);
        --color-green:#42AD00;
        --color-gray:#aaa;
        --color-accent:#F56692;
        --color-delete:#FF0000;
        
        /* Dark mode colors */
        --dark-bg: #1a1a2e;
        --dark-secondary: #16213e;
        --dark-tertiary: #0f3460;
        --dark-text: #e0e0e0;
        --dark-card: rgba(26, 26, 46, 0.85);
        --dark-border: rgba(255, 255, 255, 0.1);
    }
    body{
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem,1.5vw,1.2rem);
        overflow: hidden;
        color:rgba(34,34,96,.6);
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    /* DatePicker dark mode styles */
    .react-datepicker {
        background-color: var(--dark-card, #fff) !important;
        border: 1px solid var(--dark-border, #aeaeae) !important;
        color: var(--dark-text, #000) !important;
    }
    
    .react-datepicker__header {
        background-color: var(--dark-secondary, #f0f0f0) !important;
        border-bottom: 1px solid var(--dark-border, #aeaeae) !important;
    }
    
    .react-datepicker__current-month,
    .react-datepicker__day-name,
    .react-datepicker__day {
        color: var(--dark-text, #000) !important;
    }
    
    .react-datepicker__day:hover {
        background-color: var(--dark-tertiary, #f0f0f0) !important;
    }
    
    .react-datepicker__day--selected {
        background-color: #667eea !important;
        color: #fff !important;
    }
    
    h1, h2, h3, h4, h5, h6 {
        transition: color 0.3s ease;
    }
    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(10px);
            }
            50% {
                transform: translateX(-10px);
            }
            75% {
                transform: translateX(10px);
            }
            100% {
                transform: translateX(0);
            }
        }
    }
`;
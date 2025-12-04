import React from "react";
import styled from "styled-components";
import {useGlobalContext} from "../../Context/globalContext";
import {useTheme} from "../../Context/themeContext";

function History() {
    const {transactionHistory} = useGlobalContext()
    const { isDarkMode } = useTheme();

    const [...history] = transactionHistory()

    return (


        <HistoryStyled isDarkMode={isDarkMode}>
            <h2>Recent History</h2>
            {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-₹${amount <= 0 ? 0 : amount}` : `+₹${amount <= 0 ? 0: amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
        color: ${props => props.isDarkMode ? '#e0e0e0' : 'inherit'};
    }

    .history-item{
        background: ${props => props.isDarkMode 
            ? 'rgba(26, 26, 46, 0.6)' 
            : '#FCF6F9'};
        border: 2px solid ${props => props.isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : '#FFFFFF'};
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
    }
`;

export default History;
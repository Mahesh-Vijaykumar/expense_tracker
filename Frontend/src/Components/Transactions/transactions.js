import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../Context/globalContext";
import { useTheme } from "../../Context/themeContext";
import { dateFormat } from "../../Utils/dateFormat";
import { 
    book, food, medical, tv, takeaway, clothing, 
    money, freelance, stocks, users, bitcoin, card, yt, piggy 
} from '../../Utils/icons';

function Transactions() {
    const { transactionHistory } = useGlobalContext();
    const { isDarkMode } = useTheme();

    const history = transactionHistory();

    const getCategoryIcon = (category, type) => {
        if (type === 'expense') {
            switch(category) {
                case 'education': return book;
                case 'groceries': return food;
                case 'health': return medical;
                case 'subscriptions': return tv;
                case 'takeaways': return takeaway;
                case 'clothing': return clothing;
                case 'travelling': return freelance;
                default: return piggy;
            }
        } else {
            switch(category) {
                case 'salary': return money;
                case 'freelancing': return freelance;
                case 'investments': return stocks;
                case 'stocks': return users;
                case 'bitcoin': return bitcoin;
                case 'bank': return card;
                case 'youtube': return yt;
                default: return piggy;
            }
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'education': '#FF6384',
            'groceries': '#36A2EB',
            'health': '#FFCE56',
            'subscriptions': '#4BC0C0',
            'takeaways': '#9966FF',
            'clothing': '#FF9F40',
            'travelling': '#FF6384',
            'salary': '#42AD00',
            'freelancing': '#36A2EB',
            'investments': '#4BC0C0',
            'other': '#C9CBCF'
        };
        return colors[category] || '#C9CBCF';
    };

    return (
        <TransactionsStyled isDarkMode={isDarkMode}>
            <div className="transactions-header">
                <h3>Recent Transactions</h3>
                <button className="see-all-btn">See All</button>
            </div>
            <div className="transactions-list">
                {history.length > 0 ? (
                    history.map((item) => {
                        const { _id, title, amount, type, category, date } = item;
                        const isExpense = type === 'expense';
                        const icon = getCategoryIcon(category, type);
                        const color = getCategoryColor(category);

                        return (
                            <div key={_id} className="transaction-item">
                                <div className="transaction-left">
                                    <div 
                                        className="icon-wrapper"
                                        style={{ backgroundColor: `${color}20`, color: color }}
                                    >
                                        {icon}
                                    </div>
                                    <div className="transaction-info">
                                        <p className="transaction-title">{title}</p>
                                        <p className="transaction-date">{dateFormat(date)}</p>
                                    </div>
                                </div>
                                <div className="transaction-right">
                                    <span 
                                        className={`transaction-amount ${isExpense ? 'expense' : 'income'}`}
                                    >
                                        {isExpense ? '-' : '+'}₹{amount || 0}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-transactions">
                        <i className="fa-solid fa-receipt"></i>
                        <p>No transactions yet</p>
                    </div>
                )}
            </div>
        </TransactionsStyled>
    );
}

const TransactionsStyled = styled.div`
    background: ${props => props.isDarkMode 
        ? 'rgba(26, 26, 46, 0.6)' 
        : '#fff'};
    border: 1px solid ${props => props.isDarkMode 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    .transactions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;

        h3 {
            color: ${props => props.isDarkMode ? '#e0e0e0' : '#333'};
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0;
        }

        .see-all-btn {
            background: transparent;
            border: none;
            color: ${props => props.isDarkMode ? '#667eea' : '#667eea'};
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            transition: all 0.3s ease;

            &:hover {
                background: ${props => props.isDarkMode 
                    ? 'rgba(102, 126, 234, 0.1)' 
                    : 'rgba(102, 126, 234, 0.05)'};
            }
        }
    }

    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-height: 400px;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: ${props => props.isDarkMode 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.05)'};
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background: ${props => props.isDarkMode 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'rgba(0, 0, 0, 0.2)'};
            border-radius: 10px;

            &:hover {
                background: ${props => props.isDarkMode 
                    ? 'rgba(255, 255, 255, 0.3)' 
                    : 'rgba(0, 0, 0, 0.3)'};
            }
        }

        .transaction-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: ${props => props.isDarkMode 
                ? 'rgba(255, 255, 255, 0.03)' 
                : 'rgba(0, 0, 0, 0.02)'};
            border-radius: 12px;
            transition: all 0.3s ease;
            
            @media (max-width: 768px) {
                padding: 0.875rem;
            }

            &:hover {
                background: ${props => props.isDarkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.04)'};
                transform: translateX(5px);
                
                @media (max-width: 768px) {
                    transform: none;
                }
            }

            .transaction-left {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex: 1;
                min-width: 0; /* Allows text to wrap */
                
                @media (max-width: 480px) {
                    gap: 0.75rem;
                }

                .icon-wrapper {
                    width: 45px;
                    height: 45px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    flex-shrink: 0;
                    
                    @media (max-width: 480px) {
                        width: 40px;
                        height: 40px;
                        font-size: 1rem;
                    }
                }

                .transaction-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                    min-width: 0;
                    flex: 1;

                    .transaction-title {
                        font-weight: 600;
                        font-size: clamp(0.85rem, 1.5vw, 0.95rem);
                        color: ${props => props.isDarkMode ? '#e0e0e0' : '#333'};
                        margin: 0;
                        word-wrap: break-word;
                    }

                    .transaction-date {
                        font-size: clamp(0.75rem, 1.2vw, 0.8rem);
                        color: ${props => props.isDarkMode 
                            ? 'rgba(224, 224, 224, 0.6)' 
                            : 'rgba(0, 0, 0, 0.6)'};
                        margin: 0;
                    }
                }
            }

            .transaction-right {
                flex-shrink: 0;
                
                .transaction-amount {
                    font-weight: 700;
                    font-size: clamp(0.9rem, 1.5vw, 1rem);

                    &.expense {
                        color: #FF0000;
                    }

                    &.income {
                        color: #42AD00;
                    }
                }
            }
        }

        .no-transactions {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
            color: ${props => props.isDarkMode 
                ? 'rgba(224, 224, 224, 0.5)' 
                : 'rgba(0, 0, 0, 0.5)'};

            i {
                font-size: 3rem;
                margin-bottom: 1rem;
            }

            p {
                font-size: 1rem;
            }
        }
    }
`;

export default Transactions;


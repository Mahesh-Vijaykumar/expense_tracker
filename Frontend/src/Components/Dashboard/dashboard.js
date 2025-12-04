import React from "react";
import styled from "styled-components";
import {InnerLayout} from "../../Styles/layout";
import {useGlobalContext} from "../../Context/globalContext";
import {useEffect} from "react";
import {useTheme} from "../../Context/themeContext";
import Header from "../Header/header";
import PieChart from "../PieChart/piechart";
import Transactions from "../Transactions/transactions";

function Dashboard() {
    const {totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()
    const { isDarkMode } = useTheme();
    
    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <DashboardStyled isDarkMode={isDarkMode}>
            <InnerLayout>
                <Header />
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon balance-icon">
                            <i className="fa-solid fa-wallet"></i>
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Total Balance</p>
                            <p className="stat-value">₹{totalBalance()}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon income-icon">
                            <i className="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Total Income</p>
                            <p className="stat-value">₹{totalIncome()}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon expense-icon">
                            <i className="fa-solid fa-arrow-trend-down"></i>
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Total Expenses</p>
                            <p className="stat-value">₹{totalExpenses()}</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-content">
                    <div className="chart-section">
                        <PieChart />
                    </div>
                    <div className="transactions-section">
                        <Transactions />
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    padding: 0;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 2rem;

    .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
        
        /* Tablet styles */
        @media (max-width: 1024px) {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.25rem;
            margin-bottom: 1.5rem;
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .stat-card {
            background: ${props => props.isDarkMode 
                ? 'rgba(26, 26, 46, 0.6)' 
                : '#fff'};
            border: 1px solid ${props => props.isDarkMode 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.1)'};
            border-radius: 20px;
            padding: 1.5rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;

            @media (max-width: 768px) {
                padding: 1.25rem;
                gap: 1rem;
            }
            
            @media (max-width: 480px) {
                padding: 1rem;
                flex-direction: column;
                text-align: center;
            }

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
                
                @media (max-width: 768px) {
                    transform: translateY(-2px);
                }
            }

            .stat-icon {
                width: 60px;
                height: 60px;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8rem;
                color: white;
                flex-shrink: 0;
                
                @media (max-width: 768px) {
                    width: 50px;
                    height: 50px;
                    font-size: 1.5rem;
                }
                
                @media (max-width: 480px) {
                    width: 60px;
                    height: 60px;
                    font-size: 1.8rem;
                }
            }

            .balance-icon {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }

            .income-icon {
                background: linear-gradient(135deg, #42AD00 0%, #66D966 100%);
            }

            .expense-icon {
                background: linear-gradient(135deg, #FF0000 0%, #FF6B6B 100%);
            }

            .stat-content {
                flex: 1;

                .stat-label {
                    font-size: 0.9rem;
                    color: ${props => props.isDarkMode 
                        ? 'rgba(224, 224, 224, 0.7)' 
                        : 'rgba(0, 0, 0, 0.6)'};
                    margin: 0 0 0.5rem 0;
                    
                    @media (max-width: 768px) {
                        font-size: 0.85rem;
                    }
                }

                .stat-value {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: ${props => props.isDarkMode ? '#e0e0e0' : '#333'};
                    margin: 0;
                    
                    @media (max-width: 768px) {
                        font-size: 1.5rem;
                    }
                    
                    @media (max-width: 480px) {
                        font-size: 1.8rem;
                    }
                }
            }
        }
    }

    .dashboard-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        
        /* Tablet styles */
        @media (max-width: 1024px) {
            gap: 1.25rem;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .chart-section,
        .transactions-section {
            width: 100%;
        }
    }
`;

export default Dashboard
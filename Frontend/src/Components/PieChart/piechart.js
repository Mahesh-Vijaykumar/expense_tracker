import React from 'react';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/globalContext';
import { useTheme } from '../../Context/themeContext';

ChartJs.register(ArcElement, Tooltip, Legend);

function PieChart() {
    const { expenses } = useGlobalContext();
    const { isDarkMode } = useTheme();

    // Calculate expenses by category
    const categoryTotals = expenses.reduce((acc, expense) => {
        const category = expense.category || 'other';
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
    }, {});

    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);

    // Color palette for categories
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
        '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
    ];

    const data = {
        labels: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
        datasets: [{
            data: amounts,
            backgroundColor: colors.slice(0, categories.length),
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: isDarkMode ? '#e0e0e0' : '#333',
                    padding: 15,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = amounts.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ₹${value} (${percentage}%)`;
                    }
                }
            }
        },
        cutout: '60%'
    };

    const total = amounts.reduce((a, b) => a + b, 0);

    return (
        <PieChartStyled isDarkMode={isDarkMode}>
            <div className="chart-header">
                <h3>Expense Breakdown</h3>
            </div>
            <div className="chart-container">
                {categories.length > 0 ? (
                    <>
                        <div className="chart-wrapper">
                            <Doughnut data={data} options={options} />
                        </div>
                        <div className="chart-center">
                            <span className="center-label">Total</span>
                            <span className="center-amount">₹{total}</span>
                        </div>
                    </>
                ) : (
                    <div className="no-data">
                        <i className="fa-solid fa-chart-pie"></i>
                        <p>No expenses yet</p>
                    </div>
                )}
            </div>
        </PieChartStyled>
    );
}

const PieChartStyled = styled.div`
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

    .chart-header {
        margin-bottom: 1.5rem;
        h3 {
            color: ${props => props.isDarkMode ? '#e0e0e0' : '#333'};
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0;
        }
    }

    .chart-container {
        position: relative;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;

        .chart-wrapper {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .chart-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            pointer-events: none;

            .center-label {
                display: block;
                font-size: 0.9rem;
                color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
                margin-bottom: 0.3rem;
            }

            .center-amount {
                display: block;
                font-size: 1.5rem;
                font-weight: 700;
                color: ${props => props.isDarkMode ? '#e0e0e0' : '#333'};
            }
        }

        .no-data {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.5)' : 'rgba(0, 0, 0, 0.5)'};

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

export default PieChart;


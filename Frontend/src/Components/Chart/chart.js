import React from 'react'
import {Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/globalContext'
import { dateFormat } from '../../Utils/dateFormat'
import {useTheme} from '../../Context/themeContext'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)


function Chart() {
    const {incomes,expenses}=useGlobalContext()
    const { isDarkMode } = useTheme();
    
    const textColor = isDarkMode ? '#e0e0e0' : '#333';
    const gridColor = isDarkMode ? 'rgba(224, 224, 224, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    const data ={
        labels:incomes.map((inc)=>{
            const {date}=inc
            return dateFormat(date)
        }),

        datasets:[
            {
                label: "Incomes",
                data:[
                    ...incomes.map((income)=>{
                        const{amount}=income
                        return amount
                    })
                ],
                backgroundColor:'green',
                borderColor: '#42AD00',
                tension:.5,

            },
            {
                label: "Expenses",
                data:[
                    ...expenses.map((expense)=>{
                        const{amount}=expense
                        return amount
                    })
                ],
                backgroundColor:'red',
                borderColor: '#FF0000',
                tension:.5,
            },

        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColor
                },
                grid: {
                    color: gridColor
                }
            },
            y: {
                ticks: {
                    color: textColor
                },
                grid: {
                    color: gridColor
                }
            }
        }
    };

    return (
        <ChartStyled isDarkMode={isDarkMode}>
            <Line data={data} options={options}/>
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: ${props => props.isDarkMode 
        ? 'rgba(26, 26, 46, 0.6)' 
        : '#FCF6F9'};
    border: 2px solid ${props => props.isDarkMode 
        ? 'rgba(255, 255, 255, 0.1)' 
        : '#FFFFFF'};
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    transition: all 0.3s ease;
`;

export default Chart
import React from "react";
import styled from "styled-components";
import {InnerLayout} from "../../Styles/layout";
import {useGlobalContext} from "../../Context/globalContext";
import {useEffect} from "react";
import ExpenseForm from "./expenseform";
import IncomeItem from '../IncomeItem/incomeitem';
import {useTheme} from "../../Context/themeContext";

function Expenses() {
    const{expenses,getExpenses,deleteExpense,totalExpenses}=useGlobalContext()
    const { isDarkMode } = useTheme();
    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <ExpensesStyled isDarkMode={isDarkMode}>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">
                    Total Expenses:<span>₹{totalExpenses()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm/>
                    </div>
                    <div className="incomes">
                        {expenses.map((income) => {
                            const {_id, title, amount, date, category, description, type,indicatorColor} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                type={type}
                                description={description}
                                amount={amount}
                                date={date}
                                category={category}
                                indicatorColor="var(--color-delete)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpensesStyled>
    )
}

const ExpensesStyled = styled.div`
    display: flex;
    overflow: auto;
    h1 {
        color: ${props => props.isDarkMode ? '#e0e0e0' : 'inherit'};
    }
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${props => props.isDarkMode 
            ? 'rgba(26, 26, 46, 0.6)' 
            : '#FCF6F9'};
        border: 2px solid ${props => props.isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : '#FFFFFF'};
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        color: ${props => props.isDarkMode ? '#e0e0e0' : 'inherit'};
        transition: all 0.3s ease;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-delete);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Expenses
import React from 'react';
import styled from "styled-components";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import {useGlobalContext} from "../../Context/globalContext";
import Button from '../Button/button';
import { plus } from '../../Utils/icons';
import {useTheme} from "../../Context/themeContext";

function Form() {
    const {addIncome,getIncomes,error,setError} = useGlobalContext()
    const { isDarkMode } = useTheme();

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category,description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }
    const handleSubmit = e => {
        e.preventDefault()
        addIncome(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }
    return(
        <FormStyled onSubmit={handleSubmit} isDarkMode={isDarkMode}>
            <div className="input-control">
                {error && <p className='error'>{error}</p>}
                <input
                    type="text"
                    value={title}
                    name={title}
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    type="amount"
                    value={amount}
                    name={amount}
                    placeholder="Salary Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholder='Enter date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date});
                    }
                    }
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investiments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description"
                          cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Add Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#fff'};
        background: ${props => props.isDarkMode ? 'rgba(26, 26, 46, 0.3)' : 'transparent'};
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: ${props => props.isDarkMode ? '#e0e0e0' : 'rgba(34, 34, 96, 0.9)'};
        transition: all 0.3s ease;

        &::placeholder {
            color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.5)' : 'rgba(34, 34, 96, 0.4)'};
        }

        &:focus {
            border-color: ${props => props.isDarkMode ? 'rgba(102, 126, 234, 0.5)' : '#fff'};
            background: ${props => props.isDarkMode ? 'rgba(26, 26, 46, 0.5)' : 'transparent'};
        }
    }

    .input-control {
        input {
            width: 100%;
        }
    }

    .selects {
        display: flex;
        justify-content: flex-end;

        select {
            color: ${props => props.isDarkMode ? 'rgba(224, 224, 224, 0.7)' : 'rgba(34, 34, 96, 0.4)'};

            &:focus, &:active {
                color: ${props => props.isDarkMode ? '#e0e0e0' : 'rgba(34, 34, 96, 1)'};
            }

            option {
                background: ${props => props.isDarkMode ? '#1a1a2e' : '#fff'};
                color: ${props => props.isDarkMode ? '#e0e0e0' : '#222260'};
            }
        }
    }

    .error {
        color: ${props => props.isDarkMode ? '#ff6b6b' : 'red'};
    }

    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
`;

export default Form;
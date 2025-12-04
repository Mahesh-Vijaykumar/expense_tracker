import React from "react";
import styled from "styled-components";
import { rupee,calender,comment,trash,money,freelance,stocks,users,bitcoin,card,yt,piggy,book, food,medical,tv,takeaway,clothing,circle } from '../../Utils/icons';
import Button from "../Button/button";
import {dateFormat} from "../../Utils/dateFormat";
import {useTheme} from "../../Context/themeContext";

function IncomeItem({
                        id,
                        title,
                        amount,
                        date,
                        category,
                        description,
                        deleteItem,
                        indicatorColor,
                        type
                    }) {
    const { isDarkMode } = useTheme();
    const categoryIcon = () =>{
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }
    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }
    return(
        <IncomeItemStyled indicator={indicatorColor} isDarkMode={isDarkMode}>
            <div className="icon">
                {type==='expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>₹ {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>{comment} {description}</p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={()=>deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: ${props => props.isDarkMode 
        ? 'rgba(26, 26, 46, 0.6)' 
        : '#FCF6F9'};
    border: 2px solid ${props => props.isDarkMode 
        ? 'rgba(255, 255, 255, 0.1)' 
        : '#FFFFFF'};
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: ${props => props.isDarkMode ? '#e0e0e0' : '#222260'};
    transition: all 0.3s ease;
    
    /* Mobile styles */
    @media (max-width: 768px) {
        padding: 0.875rem;
        gap: 0.75rem;
        border-radius: 16px;
        flex-wrap: wrap;
    }
    
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: ${props => props.isDarkMode 
            ? 'rgba(102, 126, 234, 0.2)' 
            : '#F5F5F5'};
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid ${props => props.isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : '#FFFFFF'};
        flex-shrink: 0;
        
        @media (max-width: 768px) {
            width: 60px;
            height: 60px;
            border-radius: 16px;
        }
        
        @media (max-width: 480px) {
            width: 50px;
            height: 50px;
        }
        
        i{
            font-size: 2.6rem;
            color: ${props => props.isDarkMode ? '#667eea' : 'inherit'};
            
            @media (max-width: 768px) {
                font-size: 2rem;
            }
            
            @media (max-width: 480px) {
                font-size: 1.6rem;
            }
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        min-width: 0; /* Allows text to wrap */
        
        h5{
            font-size: clamp(1rem, 2vw, 1.3rem);
            padding-left: 2rem;
            position: relative;
            margin: 0;
            word-wrap: break-word;
            
            @media (max-width: 768px) {
                padding-left: 1.5rem;
                font-size: 1.1rem;
            }
            
            @media (max-width: 480px) {
                padding-left: 1.25rem;
                font-size: 1rem;
            }
            
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
                
                @media (max-width: 480px) {
                    width: 0.6rem;
                    height: 0.6rem;
                }
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            
            @media (max-width: 768px) {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.75rem;
            }
            
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                flex-wrap: wrap;
                
                @media (max-width: 768px) {
                    gap: 1rem;
                    width: 100%;
                }
                
                @media (max-width: 480px) {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
                
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: ${props => props.isDarkMode ? '#e0e0e0' : 'var(--primary-color)'};
                    opacity: 0.8;
                    font-size: clamp(0.85rem, 1.5vw, 1rem);
                    margin: 0;
                    
                    @media (max-width: 480px) {
                        font-size: 0.85rem;
                    }
                }
            }
            
            .btn-con {
                flex-shrink: 0;
                
                @media (max-width: 768px) {
                    align-self: flex-end;
                }
            }
        }
    }
`;

export default IncomeItem
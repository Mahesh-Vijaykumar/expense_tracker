import styled from "styled-components";

export const MainLayout=styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;
    
    /* Tablet styles */
    @media (max-width: 1024px) {
        padding: 1.5rem;
        gap: 1.5rem;
    }
    
    /* Mobile styles */
    @media (max-width: 768px) {
        padding: 1rem;
        gap: 1rem;
        flex-direction: column;
        height: auto;
        min-height: 100vh;
    }
    
    /* Small mobile */
    @media (max-width: 480px) {
        padding: 0.75rem;
        gap: 0.75rem;
    }
`;

export const InnerLayout = styled.div`
    padding: 2rem;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    
    /* Tablet styles */
    @media (max-width: 1024px) {
        padding: 1.5rem;
    }
    
    /* Mobile styles */
    @media (max-width: 768px) {
        padding: 1rem;
        height: auto;
        overflow-y: visible;
    }
    
    /* Small mobile */
    @media (max-width: 480px) {
        padding: 0.75rem;
    }
    
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;

        &:hover {
            background: rgba(0, 0, 0, 0.3);
        }
    }
`
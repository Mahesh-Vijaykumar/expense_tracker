import styled from "styled-components";

export const MainLayout=styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap:2rem;
`;

export const InnerLayout = styled.div`
    padding: 2rem;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    
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
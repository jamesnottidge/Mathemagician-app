import styled from "styled-components";

export const StyledHistory = styled.div`
    margin: 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    border-radius: 0.8rem;
    color: ${(props) => props.speed ? "green" : "orange"};
    color: ${(props) => props.value!==props.answer? "red" : ""};
    background-color: rgba(222, 165, 78, 0.501);
    input {
        width: 3rem;
    }
`;
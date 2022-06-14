import { StyledHistory } from "../styledComponents/StyledHistory";

export const History = (props) => {
    const { firstNum, secondNum, sign, value, time, answer, speed } = props;

    return (
        <StyledHistory value={value} answer={answer} speed={speed}>
            <p>{firstNum} {sign} {secondNum} [{time}]</p>
            <p>{value}</p>
        </StyledHistory>
    );

};
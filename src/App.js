import { StateProvider } from "./StateContext";
import { StateApp } from "./StateApp";
export function App(props) {
    return (
        <StateProvider>
            <StateApp /> 
        </StateProvider>
    );
    
}

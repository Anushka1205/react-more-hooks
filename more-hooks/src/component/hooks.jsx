import React, { useReducer } from "react";
import '../App.css';
const initialState = {
    tasks: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, { text: action.payload, isHidden: false }],
            };
        case "TOGGLE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.text === action.payload.text ? { ...task, isHidden: !task.isHidden } : task
                ),
            };
        default:
            return state;
    }
};

const Hooks = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [inputValue, setInputValue] = React.useState('');

    const handleAddTask = (task) => {
        dispatch({ type: "ADD_TASK", payload: task });
        setInputValue(''); // clear the input field
    };

    const handleToggleTask = (task) => {
        dispatch({ type: "TOGGLE_TASK", payload: task });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddTask(inputValue);
        }
    };

    return (
        <>
            <div className="box">
                <input type="text" placeholder="Enter task" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
                <ul className="input">
                    {state.tasks.map((task, index) => (
                        <li key={index}>
                            <span>{task.isHidden ? "The Content is hidden" : task.text}</span>
                            <button onClick={() => handleToggleTask(task)}>Toggle</button>
                        </li>
                    ))}
                </ul>
            </div>  
        </>
        
    );
};

export default Hooks;
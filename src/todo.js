import { useState } from "react";
import { useEffect } from "react";
import React from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all');
    const [showButtons, setShowButtons] = useState(false); 

    useEffect(() => {
        console.log(todos); 
    }, [todos])

    const showInput = (e) => {
        setInput(e.target.value);
    }

    const enterText = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
            setInput('');
            setShowButtons(true); 
        }
    };

    const editInput = (id, newText) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const deleteInput = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        if (updatedTodos.length === 0) {
            setShowButtons(false); 
        }
    };

    const handleToggleComplete = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const doubleClick = (id, text) => {
        const newText = prompt('Enter new text:', text);
        if (newText !== null) {
            editInput(id, newText);
        }
    };

    const filterTodos = () => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    };

    const clearCompleted = () => {
        const updatedTodos = todos.filter(todo => !todo.completed);
        setTodos(updatedTodos);
        if (updatedTodos.length === 0) {
            setShowButtons(false); 
        }
    };

    const selectAll = () => {
        const updatedTodos = todos.map(todo => {
            return { ...todo, completed: true };
        });
        setTodos(updatedTodos);
    };

    return (
        <div className="box">
             <button className="btnselect" onClick={selectAll}>v</button>
            <input
                className="textbox"
                type="text"
                value={input}
                onChange={showInput}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') enterText(e);
                }}
                placeholder="Enter todo"
            />
            
            <div className="content">
                <ul>
                    {filterTodos().map(todo => (
                        <li key={todo.id} className="todo-item">
                            <div className="checkbox-container">
                                <input
                                className="check"
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleComplete(todo.id)}
                                />
                            </div>
                            <div className="text-container">
                                <span
                                    className="todo-text"
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        cursor: 'pointer'
                                    }}
                                    onDoubleClick={() => doubleClick(todo.id, todo.text)}>
                                    {todo.text}
                                </span>
                            </div>
                            <div className="button-container">
                                <button className="btn-delete" onClick={() => deleteInput(todo.id)}>X</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {showButtons && ( 
                <div className="filter-buttons">
                    <button onClick={() => setFilter('all')}>All</button>
                    <button onClick={() => setFilter('active')}>Active</button>
                    <button onClick={() => setFilter('completed')}>Completed</button>
                    <button onClick={clearCompleted}>Clear Completed</button>
                </div>
            )}
        </div>
    );
}

export default TodoList;

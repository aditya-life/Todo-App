import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    let [todos, setTodos] = useState([{ task: "Sample Task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo("");
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
    };

    let upperCaseAll = () => {
        let newArr = todos.map((todo) => {
            return {
                ...todo,
                task: todo.task.toUpperCase(),
            };
        });
        setTodos(newArr);
    };

    const toggleAllDone = () => {
        const allDone = todos.every(todo => todo.isDone);

        const newArr = todos.map(todo => ({
            ...todo,
            isDone: !allDone,
        }));

        setTodos(newArr);
    };


    let toggleCase = (id) => {
        let newArr = todos.map((todo) => {
            if (todo.id === id) {
                const isUpper = todo.task === todo.task.toUpperCase();
                return {
                    ...todo,
                    task: isUpper ? todo.task.toLowerCase() : todo.task.toUpperCase(),
                };
            } else {
                return todo;
            }
        });
        setTodos(newArr);
    };

    const isDone = (id) => {
        const newArr = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone: !todo.isDone,
                };
            }
            return todo;
        });
        setTodos(newArr);
    };

    return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title mb-4">📝 Todo List</h2>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add a new task"
                            value={newTodo}
                            onChange={updateTodoValue}
                        />
                        <button className="btn btn-primary" onClick={addTask}>Add Task</button>
                    </div>

                    <button className="btn btn-secondary mb-4" onClick={toggleAllDone}>All Done</button>

                    <hr />

                    <h4 className="mb-3">📋 Tasks</h4>
                    {todos.length === 0 && <div className="alert alert-info">No tasks available.</div>}

                    <ul className="list-group">
                        {todos.map((todo) => (
                            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <span
                                        style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
                                        className="fw-medium"
                                    >
                                        {todo.task}
                                    </span>
                                    {" "}
                                    {todo.isDone && (
                                        <span className="badge bg-success">Done</span>
                                    )}
                                </div> &nbsp; &nbsp;
                                <div className="btn-group" role="group">
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => toggleCase(todo.id)}
                                    >
                                        {todo.task === todo.task.toUpperCase() ? "Lowercase" : "Uppercase"}
                                    </button>

                                    <button className="btn btn-outline-success btn-sm" onClick={() => isDone(todo.id)}>
                                        {todo.isDone ? "Undo" : "Mark Done"}
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteTodo(todo.id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

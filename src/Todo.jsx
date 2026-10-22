import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
    const [todos, setTodos] = useState(() => {
        try {
            const saved = localStorage.getItem("todo_items");
            return saved ? JSON.parse(saved) : [
                { task: "Welcome to your Todo App! 🎉", id: uuidv4(), isDone: false },
                { task: "Mark tasks as done or delete them", id: uuidv4(), isDone: false }
            ];
        } catch {
            return [{ task: "Sample Task", id: uuidv4(), isDone: false }];
        }
    });

    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        try {
            localStorage.setItem("todo_items", JSON.stringify(todos));
        } catch (e) {
            console.error("Failed to save to localStorage:", e);
        }
    }, [todos]);

    const addTask = (e) => {
        if (e) e.preventDefault();
        const trimmed = newTodo.trim();
        if (!trimmed) return;

        setTodos((prevTodos) => [
            ...prevTodos,
            { task: trimmed, id: uuidv4(), isDone: false }
        ]);
        setNewTodo("");
    };

    const updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
    };

    const toggleAllDone = () => {
        const allDone = todos.every((todo) => todo.isDone);
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({
                ...todo,
                isDone: !allDone,
            }))
        );
    };

    const toggleCase = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    const isUpper = todo.task === todo.task.toUpperCase();
                    return {
                        ...todo,
                        task: isUpper ? todo.task.toLowerCase() : todo.task.toUpperCase(),
                    };
                }
                return todo;
            })
        );
    };

    const isDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isDone: !todo.isDone,
                    };
                }
                return todo;
            })
        );
    };

    const clearAll = () => {
        if (window.confirm("Are you sure you want to clear all tasks?")) {
            setTodos([]);
        }
    };

    return (
        <div className="container my-5" style={{ maxWidth: "680px" }}>
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <h2 className="card-title mb-4 text-center">📝 Todo List</h2>

                    <form onSubmit={addTask} className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add a new task (Press Enter)..."
                            value={newTodo}
                            onChange={updateTodoValue}
                        />
                        <button className="btn btn-primary px-4" type="submit">
                            Add Task
                        </button>
                    </form>

                    <div className="d-flex justify-content-between mb-4">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={toggleAllDone}
                            disabled={todos.length === 0}
                        >
                            Toggle All Done
                        </button>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={clearAll}
                            disabled={todos.length === 0}
                        >
                            Clear All
                        </button>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">📋 Tasks ({todos.length})</h5>
                        <small className="text-muted">
                            {todos.filter((t) => t.isDone).length} of {todos.length} completed
                        </small>
                    </div>

                    {todos.length === 0 && (
                        <div className="alert alert-info text-center">
                            No tasks yet! Add your first task above.
                        </div>
                    )}

                    <ul className="list-group">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2"
                            >
                                <div className="d-flex align-items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input mt-0"
                                        checked={todo.isDone}
                                        onChange={() => isDone(todo.id)}
                                        id={`check-${todo.id}`}
                                    />
                                    <label
                                        htmlFor={`check-${todo.id}`}
                                        style={{
                                            textDecoration: todo.isDone ? "line-through" : "none",
                                            cursor: "pointer",
                                            color: todo.isDone ? "#6c757d" : "inherit",
                                        }}
                                        className="fw-medium mb-0"
                                    >
                                        {todo.task}
                                    </label>
                                    {todo.isDone && (
                                        <span className="badge bg-success">Done</span>
                                    )}
                                </div>
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => toggleCase(todo.id)}
                                        title="Toggle uppercase / lowercase"
                                    >
                                        {todo.task === todo.task.toUpperCase()
                                            ? "Aa"
                                            : "AA"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => deleteTodo(todo.id)}
                                        title="Delete task"
                                    >
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

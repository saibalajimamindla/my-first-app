'use client'
import React, { useReducer, useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface State {
  tasks: Task[];
}

type Action =
  | { type: 'add_task'; payload: string }
  | { type: 'toggle_task'; payload: number }
  | { type: 'delete_task'; payload: number };

const initialState: State = {
  tasks: []
};


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add_task':
      return {
        tasks: [
          ...state.tasks,
          { id: Date.now(), text: action.payload, completed: false }
        ]
      };
    case 'toggle_task':
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        )
      };
    case 'delete_task':
      return {
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      throw new Error('Unknown action type');
  }
}

const TodoList: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      dispatch({ type: 'add_task', payload: newTask });
      setNewTask('');
    }
  };

  const handleToggleTask = (taskId: number) => {
    dispatch({ type: 'toggle_task', payload: taskId });
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch({ type: 'delete_task', payload: taskId });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">Todo List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className=" text-black flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleAddTask}
          className="p-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-3">
        {state.tasks.length > 0 ? (
          state.tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-3 rounded-md shadow-sm text-black ${
                task.completed ? 'bg-green-100 line-through' : 'bg-gray-100'
              }`}
            >
              <span
                onClick={() => handleToggleTask(task.id)}
                className="cursor-pointer"
              >
                {task.text}
              </span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks added</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;

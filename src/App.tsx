import React, {useState} from 'react';

// Define the structure of a todo item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {

const [todos, setTodos] = useState<Todo[]>([]);
const [newTodo, setNewTodo] = useState<string>('');

  // Handle input change for new to-do
  const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  // Add a new to-do to the list
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTask: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      setTodos([...todos, newTask]);
      setNewTodo('');

    }
};

// Toggle the completion status of a to-do
const toggleTodoCompletion = (id: number) => {
  setTodos(
    todos.map(todo =>
      todo.id === id? {...todo, completed: !todo.completed} : todo
    )
  );
};

// Remove a to-do from the list
const deleteTodo = (id: number) => {
  setTodos(todos.filter(todo => todo.id !== id));
};
 
  return (
    <div style={{maxWidth: '500px', margin: 'auto', textAlign: 'center'}}>
      <h1>To-Do App</h1>
      
      {/* input */}
      <input type="text" value={newTodo} 
      onChange={handleInputChange}
      placeholder= "Enter new to-do"
      style={{padding: '8px', width: '70%', marginRight: '5px'}} />

      {/* add Button */}
      <button onClick={addTodo} style={{padding: '8px'}}>Add</button>

      {/* display to-do list */}
      <ul style={{listStyleType: "none", padding: 0}}>
        {todos.map(todo => (
        <li key={todo.id} style={{display: 'flex', alignItems: 'center', margin: '8px 0'}}>

          <input type="checkbox" checked={todo.completed}
          onChange={() => toggleTodoCompletion(todo.id)} />

          <span style={{ textDecoration:todo.completed? 'line-through' : 'none',flexGrow: 1, marginLeft: "8px"}}>
            {todo.text}
          </span>

          {/* delete button */}
      <button onClick={() => deleteTodo(todo.id)} style={{marginLeft: "8px"}}>Delete</button>
        </li>
        ))}
      </ul>
    </div>
  );
};
  

export default App

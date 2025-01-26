import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";

function App() {
  // State for todos array of todo objs
  const [todos, setTodos] = useState([]);
  // State for a new todo to push onto todos array
  const [newTodo, setNewTodo] = useState({ title: "", date: "", comments: "" });
  // State to track which todo is being edited
  const [isEditing, setIsEditing] = useState(null);
  // State to track edits for a specific todo
  const [editTodo, setEditTodo] = useState({});

  // Func handles input changes in the form fields.
  function handleChange(e) {
    // Destructures name and value of the input (whether it's title, date, and comments)
    // Gets the name and value of targeted input (depending on one chosen in form)
    // Remember that name and value are props of the event obj, not named by us
    const { name, value } = e.target;

    // setNewTodo() setter
    setNewTodo((prev) => ({
      ...prev, // Spread operator spreads out previous state to keep old data in todo array
      [name]: value, // Update the specific input to hold typed value dynamically
    }));
  }

  // Func to handle the submission of our form
  function handleSubmit(e) {
    e.preventDefault(); // Keeps page from reloading

    // Break out of func if title, date, or comments aren't provided
    if (!newTodo.title || !newTodo.date || !newTodo.comments) return;

    // Create a new todo object
    const todo = {
      id: Date.now(), // Method to get unique timestamp as an ID
      title: newTodo.title,
      date: newTodo.date,
      comments: newTodo.comments,
      completed: false, // Incomplete todo (checkbox not clicked)
    };

    // Use setTodos state setter to add a new todo
    // Takes the todoArray we had previously, spreads it out so we keep the elements we had prior, then we add the new todo obj made above
    setTodos((prevTodoArray) => [...prevTodoArray, todo]);

    // Reset the form input fields after submission
    setNewTodo({ title: "", date: "", comments: "" });
  }

  // Func to delete todos from array
  function deleteTodo(id) {
    // .filter() keeps all todos except for the one with the matching id, effectively deleting it
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Function to mark a todo as complete
  function toggleComplete(id) {
    // Todo array hit with .map() to change the "completed" status of the todo with the matching ID to true rather than our default of false. Otherwise, change nothing
    setTodos(
      todos.map((todo) => {
        // Note spread operator was used to keep obj properties, then we simply update the todo's complete property to be reversed. (false --> true & ture --> false each click)
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  }

  // Func to start editing a todo
  function startEditing(todo) {
    setIsEditing(todo.id); // Choose todo at specific id to begin edit
    setEditTodo({ ...todo }); // Places todo's data back in our form
  }

  // Func that cancels our editing state
  function cancelEditing() {
    setIsEditing(null); // Resetting our editing state to null
    setEditTodo({}); // Clear our edit form
  }

  // Saves edits made on todo
  function saveChanges() {
    setTodos(
      todos.map((todo) => (todo.id === editTodo.id ? { ...editTodo } : todo))
    );
    setIsEditing(null); // Exit our "edit" mode/state, set back to null
    setEditTodo({}); // Clear edited todo data
  }

  return (
    <Router>
      <div>
        <h1>To-Do List</h1>

        {/* Form to add new todos */}
        <form className="flex-column" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Todo Name"
            value={newTodo.title} // Value = state.title
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={newTodo.date} // Value = state.date
            onChange={handleChange}
          />

          <textarea
            name="comments"
            placeholder="Additional Comments"
            value={newTodo.comments} // Value = state.comments
            onChange={handleChange}
          ></textarea>

          <input type="submit" value="Add Todo" />
        </form>

        {/* Acutal Todo List */}
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id} className={todo.completed ? "completed" : ""}>
                {/* Link to go to specific todos detail page to see extra comments */}
                {/* Link from npm 'RDR'*/}
                <Link to={`/todos/${todo.id}`}>{todo.title}</Link>

                {/* Are we editing and do the id's match */}
                {isEditing === todo.id ? (
                  <div>
                    {/* Edit Todo Form */}
                    <input
                      type="text"
                      name="title"
                      value={editTodo.title}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo, title: e.target.value })
                      }
                    />
                    <input
                      type="date"
                      name="date"
                      value={editTodo.date}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo, date: e.target.value })
                      }
                    />
                    <textarea
                      name="comments"
                      value={editTodo.comments}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo, comments: e.target.value })
                      }
                    />
                    <button onClick={saveChanges}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="space"
                      onClick={() => startEditing(todo)}
                    >
                      Edit
                    </button>
                  </div>
                )}

                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <input
                  className="toggle-box"
                  type="checkbox"
                  checked={todo.completed} // True of false, depending on toggle
                  onChange={() => toggleComplete(todo.id)} // Completion toggle on click of box
                />
              </li>
            );
          })}
        </ul>

        {/* Routes for Todo Detail */}
        <Routes>
          <Route path="/todos/:id" element={<TodoDetail todos={todos} />} />
        </Routes>
      </div>
    </Router>
  );
}

function TodoDetail({ todos }) {
  const { id } = useParams(); // Grabs todo ID from the URL
  // Finds todo based on unique ID (set by date timestamp)
  const todo = todos.find((todo) => todo.id === parseInt(id));

  // If there's no matching todo, then return out of function
  if (!todo) return <p>No todo found with matching id of {id}</p>;

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.date}</p>
      <p>Comments: {todo.comments}</p>
    </div>
  );
}

export default App;

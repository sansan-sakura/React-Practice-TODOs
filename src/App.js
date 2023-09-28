import { useId, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  function handleTodos(todo) {
    setTodos((items) => [...items, todo]);
    console.log(todos);
  }
  function toddoleItem(id) {
    setTodos((items) =>
      items.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  }
  function deleteItem(id) {
    setTodos((items) => items.filter((item) => item.id !== id));
  }
  function deleteAll() {
    setTodos([]);
  }
  return (
    <>
      <div className="App">
        <h1>ToDo List</h1>
        <h3>🦋 Be Productive by Organizing Your Tasks 🐞</h3>
        <main>
          <Form onAddTodos={handleTodos} />
          <CreateTodoList todoList={todos} onToggleItem={toddoleItem} onDeleteItem={deleteItem} />

          <div className="sorting_box"></div>
        </main>
      </div>
      <State todoList={todos} onDeleteItem={deleteAll} />
    </>
  );
}

export default App;

function Form({ onAddTodos }) {
  const [priority, setPriority] = useState("high");
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const todoPriority = useId();
  const todoDate = useId();

  const today = new Date().toLocaleDateString("en-CA");

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      todo: todo,
      priority: priority,
      date: date,
      done: false,
      id: Date.now(),
    };
    onAddTodos(newTodo);
    setPriority("high");
    setTodo("");
    setDate("");
  }
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form_upper_container">
        <div className="priority-box">
          <label htmlFor={todoPriority}>Priority 🚦</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            id={todoPriority}
            required
          >
            <option value="high">🔥 HIGH 🔥</option>
            <option value="medium">💨 MEDIUM 💨</option>
            <option value="low"> 🌟 LOW 🌟</option>
          </select>
        </div>
        <div className="date-box">
          <label htmlFor={todoDate}>Date 📅</label>
          <input
            type="date"
            value={today}
            onChange={(e) => setDate(e.target.value)}
            id={todoDate}
            required
          />
        </div>
      </div>
      <input
        type="text"
        placeholder="ToDo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        required
      />
      <button className="addBtn">Add</button>
    </form>
  );
}

function CreateTodoList({ todoList, onToggleItem, onDeleteItem }) {
  const [sortBy, setSportBy] = useState("input");
  let sortedItem;
  if (sortBy === "input") sortedItem = todoList;
  if (sortBy === "status") {
    sortedItem = todoList.slice().sort((a, b) => Number(a.done) - Number(b.done));
  }
  if (sortBy === "priority") {
    const high = todoList.filter((todo) => todo.priority === "high");
    const medium = todoList.filter((todo) => todo.priority === "medium");
    const low = todoList.filter((todo) => todo.priority === "low");
    sortedItem = [...high, ...medium, ...low];
    console.log(sortedItem);
  }
  return (
    <>
      <ul className="todo_list">
        {sortedItem.length !== 0 ? (
          sortedItem.map((item) => (
            <TodoItem
              todo={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
              key={item.id}
            />
          ))
        ) : (
          <p>Add Your TODOs 🤖</p>
        )}
      </ul>
      <div className="sort_box">
        <button onClick={onDeleteItem} className="delete_btn">
          DELETE ALL
        </button>
        <div>
          <span>Sort</span>
          <select value={sortBy} onChange={(e) => setSportBy(e.target.value)}>
            <option value="input">By Input</option>
            <option value="priority">By Priority</option>
            <option value="status">By Status</option>
          </select>
        </div>
      </div>
    </>
  );
}

function TodoItem({ todo, onToggleItem, onDeleteItem }) {
  const onlyDate = todo.date.split("-").slice(1).join("-");

  return (
    <li>
      <span>
        <span
          className={todo.priority === "high" ? "high" : todo.priority === "low" ? "low" : "medium"}
        >
          {" "}
          <input type="checkbox" className="checkbox" onChange={() => onToggleItem(todo.id)} />
          {todo.priority}
        </span>
        <span className="list_date">{onlyDate}</span>
      </span>
      <p className={todo.done ? "done" : ""}>{todo.todo}</p>{" "}
      <button onClick={() => onDeleteItem(todo.id)}>❌</button>
    </li>
  );
}

function State({ todoList }) {
  console.log(todoList);
  const howManyItems = todoList.length;
  const howManyLeft = todoList.filter((item) => item.done !== true).length;

  return (
    <footer>
      <div className="footer_inner">
        <p>
          {howManyItems !== 0
            ? `You have ${howManyItems} todos 🛠 ${
                howManyLeft !== 0 ? `You need to get it done ${howManyLeft} todos 💪` : ""
              }`
            : "Let's add some TODOs 🎀"}
        </p>
      </div>
    </footer>
  );
}

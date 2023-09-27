
import { useId, useState } from 'react';


function App() {
  const [todos,setTodos]=useState([])
  function handleTodos(todo){
    setTodos(items=>[...items,todo])
  }
  function toddoleItem(id){
    setTodos(items=>items.map(item=>item.id===id? {...item,done:!item.done}:item))
  }

  function deleteItem(id){
    setTodos(items=>items.filter(item=>item.id!==id))
  }
  return (
    <div className="App">
    <h1>ToDo List</h1>
     <h3>Be Productive by Organizing Your Tasks!!</h3>
     <main>
      <Form onAddTodos={handleTodos}/>
    <CreateTodoList todoList={todos} onToggleItem={toddoleItem} onDeleteItem={deleteItem}/>
      <div className='sorting_box'></div>
     </main>
    </div>
  );
}

export default App;

function Form ({onAddTodos}){
  const [priority,setPriority]=useState("high")
  const [todo,setTodo]=useState("")
  const todoPriority=useId()
function handleSubmit(e){
e.preventDefault()
const newTodo={
  todo:todo, priority:priority,done:false,id: Date.now()
}
onAddTodos(newTodo)
setPriority("high")
setTodo("")
  }
return (
  <form className="todo-form" onSubmit={handleSubmit}>
    <div className="priority-box">
    <label htmlFor={todoPriority}>Priority</label>
    <select value={priority} onChange={(e)=>setPriority(e.target.value)} id={todoPriority}>
      <option value="high">HIGH</option>
      <option value="medium">MEDIUM</option>
      <option value="low">LOW</option>
    </select>
    </div>
    <input type="text" placeholder='ToDo...' value={todo} onChange={(e)=>setTodo(e.target.value)}/>
    <button className='addBtn'>Add</button>
  </form>
)
}

function CreateTodoList({todoList,onToggleItem,onDeleteItem}){
  console.log(todoList)
  return (
    <ul className="todo_list">
      
{todoList.map(item=>( <TodoItem todo={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>))}

    </ul>
  )
}

function TodoItem ({todo,onToggleItem,onDeleteItem}){
  console.log(todo.priority)
  return(
    <li>
     
      <span className={todo.priority==="high"?"high":todo.priority==="low"?"low":"medium"}> <input type="checkbox" className='checkbox'onChange={()=>onToggleItem(todo.id)}/>{todo.priority}</span>
       <p className={todo.done?"done":""}>{todo.todo}</p> <button onClick={()=>onDeleteItem(todo.id)}>❌</button>
       </li>
  )
}
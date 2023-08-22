import { useEffect, useState } from 'react'
import './App.css'
import { AppContext } from './context/context'
import AppRoutes from './routes/appRoutes'

const App = () => {
  //שם קבוע למפתח של הרשימה בלוקאל סטוראג׳
  const TODOS_KEY = 'todos'

  //סטייט גלובלי של רשימת המטלות
  const [todos, setTodos] = useState([])

  //הוספת רשומה חדשה בעזרת סט ללא פוש
  const addTodo = (todoObj) => {
    // const newTodos = [...todos]
    // newTodos.push(todoObj)
    // setTodos(newTodos)
    setTodos([...todos, todoObj])
  }

  const isCompleted = (id) => {
    setTodos(todos.filter(todo => {
      if (todo.id == id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }
  //מחיקה של רשומה לפי איידי בעזרת פיטלר המחזיר מערך חדש בזיכרון

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    //arr = [1,2,3,4,5,6]
    //  arr[i] != 3
    //arr =  [1,2,4,5,6]
  }
  const saveInLocalStorage = () => {
    localStorage.setItem(TODOS_KEY,JSON.stringify(todos))
  }

  const getTodosFromLocalStorage = () => {
    setTodos(JSON.parse(localStorage.getItem(TODOS_KEY)))
  }

  //בכל כניסה לאפליקציה תאותחל הרשימה בעזרת מה שקיים בלוקאל סטוראג׳
useEffect(()=>{
  getTodosFromLocalStorage()
},[])
  // בכל עדכון של רשימת המטלות הקומפננטה תתרנדר מחדש ותשמור בלוקאל סטורג את הרשימה
useEffect(()=>{
   //קריאה לפונקציה ששומרת לנו בלוקאל סטוראג׳
  saveInLocalStorage()
},[todos])

  return (
    <AppContext.Provider
      value={{
        todos, addTodo, deleteTodo, isCompleted
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  )
}

export default App

import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import AddIcon from "@mui/icons-material/Add";
import { db } from "./firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  orderBy,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input) return;
    const newTodo = await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
      timestamp: serverTimestamp(),
    });
    setTodos((prev) => {
      return [...prev, newTodo];
    });
    setInput("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form className={style.form} onSubmit={addTodo}>
          <input
            className={style.input}
            type="text"
            placeholder="Add Todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={style.button}>
            <AddIcon />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos && todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;

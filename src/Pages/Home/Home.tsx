import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import FormCreateTodo from "../../components/FormCreateTodo/FormCreateTodo";
import ManageTodo from "../../components/ManageTodo/ManageTodo";
import todos from "../../store/todos";
import { observer } from "mobx-react-lite";
import "./Home.scss";
import MyButton from "../../components/Button/MyButton";
import Loader from "../../components/Loader/Loader";

export const Home: FC = observer(() => {
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [openModal, setModalOpen] = useState<boolean>(false);

  const sortedPosts = () => {
    if (active)
      return [...todos.todos].filter((item) => item.completed === false);
    if (completed)
      return [...todos.todos].filter((item) => item.completed === true);
    else return todos.todos;
  };

  useEffect(() => {
    if(todos.isAuth){
      todos.fetchTodos();
    } 
  }, []);

  return (
    <div className="App">
      {todos.loading&&<Loader/>}
      {todos.isAuth?
        <section>
        <h1>todos</h1>
        <div>
          <h2 className="todo-title">What is need to be done</h2>
          {todos.todos.length > 0 ? (
            sortedPosts().map(
              (
                item: {
                  userId: number;
                  id: number;
                  title: string;
                  completed: boolean;
                },
                index: number
              ) => <Todo todo={item} todoIndex={index + 1} key={item.id} />
            )
          ) : (
            <h2>There are no todo. Create a todo</h2>
          )}
        </div>
        <ManageTodo
          setActive={setActive}
          setCompleted={setCompleted}
          active={active}
          completed={completed}
        />
        <button onClick={()=>{setModalOpen(true)}}>Add new Todo</button>
      </section>
      :
      <Link to='./login'><h2>Go to Login page please</h2></Link>}
      {openModal&&<FormCreateTodo openModal={openModal} setShowModal={setModalOpen}/>}
    </div>
  );
});

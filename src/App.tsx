import React, { FC } from "react";
import { useState } from "react";
import Todo from "./components/Todo/Todo";
import FormCreateTodo from "./components/FormCreateTodo/FormCreateTodo";
import ManageTodo from "./components/ManageTodo/ManageTodo";
import todos from "./store/todos";
import { observer } from "mobx-react-lite";

import "./App.scss";

const App:FC = observer(() => {
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const sortedPosts = () => {
    if (active) return [...todos.todos].filter((item) => item.done === false);
    if (completed) return [...todos.todos].filter((item) => item.done === true);
    else return todos.todos;
  };

  return (
    <div className="App">
      <section>
        <h1>todos</h1>
        <div>
          <h2 className="todo-title">What is need to be done</h2>
          {todos.todos.length > 0 ? (
            sortedPosts().map((item: any, index: any) => (
              <Todo todo={item} todoIndex={index + 1} key={item.id} />
            ))
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
        <FormCreateTodo />
      </section>
    </div>
  );
});

export default App;

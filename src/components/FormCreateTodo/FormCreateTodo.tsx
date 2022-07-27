import React, { ChangeEvent } from "react";
import { FC } from "react";
import { useState } from "react";
import MyButton from "../Button/MyButton";
import styles from "./FormCreateTodo.module.scss";
import todos from "../../store/todos";
import { observer } from "mobx-react-lite";


const FormCreateTodo:FC = observer(() => {
  const [inputName, setInputName] = useState("");

  function createTodo(e: React.MouseEvent<HTMLButtonElement>) {
   
    e.preventDefault();
    if (inputName) {
      setInputName("");
      todos.addTodo({ id: Date.now(), text: inputName, done: false });
    }
  }

  return (
    <form className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Todo description"
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
      ></input>

      <MyButton onClick={createTodo} disabled={!inputName}>
        Create todo2
      </MyButton>
    </form>
  );
});

export default FormCreateTodo;

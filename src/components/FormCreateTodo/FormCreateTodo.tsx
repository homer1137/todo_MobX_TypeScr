import React  from "react";
import { useState } from "react";
import styles from "./FormCreateTodo.module.scss";
import todos from "../../store/todos";


type Props = {
  openModal: boolean;
  setShowModal: (value: boolean) => void;
};

const FormCreateTodo = ({ openModal, setShowModal }: Props) => {
  const [inputName, setInputName] = useState("");

  function createTodo(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (inputName) {
      
      todos.postTodo({
        userId: 1,
        id: Date.now(),
        title: inputName,
        completed: false,
      });
      setInputName("");
      setShowModal(false);
    }
  }

  return (
    <div className={openModal?styles.active :styles.wrapper} onClick={()=>setShowModal(false)}>
      <form className={styles.form_wrapper} onClick={(e)=>e.stopPropagation()}>
        <input
          className={styles.input}
          type="text"
          placeholder="Todo description"
          onChange={(e) => setInputName(e.target.value)}
          value={inputName}
        ></input>

        <button onClick={createTodo} disabled={!inputName}>
          Create todo2
        </button>
      </form>
    </div>
  );
};

export default FormCreateTodo;

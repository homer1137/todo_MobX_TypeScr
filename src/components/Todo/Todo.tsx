import React from "react";
import styles from "./Todo.module.scss";
import { IoIosRadioButtonOff, IoIosCheckmark } from "react-icons/io";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import todos from "../../store/todos";

interface TodoProps {
  todo: { userId: number, id: number; title: string; completed: boolean };
  todoIndex: number;
}

const Todo: FC<TodoProps> = observer(({ todo, todoIndex }:TodoProps) => {


  return (
    <div className={styles.todo}>
      <div className={styles.checkWrapper}>
      <IoIosRadioButtonOff
        onClick={() => { todos.updateTodo(todoIndex-1)}}
        className={styles.circle}
      />
      {todo.completed ? <IoIosCheckmark className={styles.check} /> : null}
      </div>
      
      <div className={styles.todoContent}>
        <strong
          style={
            todo.completed
              ? { textDecoration: "line-through" }
              : { textDecoration: "" }
          }
        >
          {todoIndex} {todo.title} 
        </strong>
        <button onClick={()=>todos.deleteTodo(todo.id)}>delete</button>
      </div>
      <div>{todo.completed}</div>
    </div>
  );
});

export default Todo;

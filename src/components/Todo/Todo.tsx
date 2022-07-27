import React from "react";
import styles from "./Todo.module.scss";
import { IoIosRadioButtonOff, IoIosCheckmark } from "react-icons/io";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import todos from "../../store/todos";

interface TodoProps {
  todo: { id: number; text: string; done: boolean };
  todoIndex: number;
}

const Todo: FC<TodoProps> = observer(({ todo, todoIndex }) => {
  return (
    <div className={styles.todo}>
      <div className={styles.checkWrapper}>
      <IoIosRadioButtonOff
        onClick={() => todos.completeTodo(todoIndex - 1)}
        className={styles.circle}
      />
      {todo.done ? <IoIosCheckmark className={styles.check} /> : null}
      </div>
      
      <div className={styles.todoContent}>
        <strong
          style={
            todo.done
              ? { textDecoration: "line-through" }
              : { textDecoration: "" }
          }
        >
          {todoIndex} {todo.text}
        </strong>
      </div>
      <div>{todo.done}</div>
    </div>
  );
});

export default Todo;

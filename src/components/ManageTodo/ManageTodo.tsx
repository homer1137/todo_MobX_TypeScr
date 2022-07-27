import React from "react";
import MyButton from "../Button/MyButton";
import classes from "./ManageTodo.module.scss";
import todos from "../../store/todos";
import { observer } from "mobx-react-lite";
import { FC } from "react";

interface ManageTodoProps{
    setActive: (arg0?:boolean|any)=> void;
    setCompleted: (arg0:boolean|any)=>void;
    active: boolean;
    completed: boolean;
   children?: React.ReactNode
 }

const ManageTodo:FC<ManageTodoProps>  = observer(
  ({ setActive, setCompleted, active, completed }) => {
    let result = todos.todos.filter((item) => item.done !== true).length;
    let resultDone = todos.todos.filter((item) => item.done === true).length;

    return (
      <div className={classes.wrapper}>
        <div className={classes.text}>{result} items left</div>
        <div className={classes.wrapperButtons}>
          <MyButton
            onClick={() => {
              setActive(false);
              setCompleted(false);
            }}
            style={{
              border: !active && !completed ? "2px solid coral" : "none",
              borderRadius: 5,
              fontWeight: 300,
            }}
          >
            All
          </MyButton>
          <MyButton
            onClick={() => {
              setActive((prev:boolean) => !prev);
              setCompleted(false);
            }}
            style={{
              border: active ? "2px solid coral" : "none",
              borderRadius: 5,
              fontWeight: 300,
            }}
          >
            Active
          </MyButton>
          <MyButton
            onClick={() => {
              setCompleted((prev:boolean) => !prev);
              setActive(false);
            }}
            style={{
              border: completed ? "2px solid coral" : "none",
              borderRadius: 5,
              fontWeight: 300,
            }}
          >
            Completed
          </MyButton>
        </div>
        <MyButton
          onClick={() => todos.removeTodo()}
          style={{
            fontWeight: 300,
            fontSize: "1.3rem",
          }}
          disabled={!resultDone}
          color='red'
        >
          <span>Clear completed</span>
        </MyButton>
      </div>
    );
  }
);

export default ManageTodo;

import React from 'react'
import styles from './MyButton.module.scss'
import { FC } from 'react'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: (arg:any) => void;
  disabled?: boolean;
  style?: object;
  color?: string;
}

const MyButton:FC<ButtonProps>=({children, color, ...props})=> {
  return (
    <button {...props} className={color?styles.myBtnRed:styles.myBtn} >
       {children} 
    </button>
  )
}

export default MyButton;
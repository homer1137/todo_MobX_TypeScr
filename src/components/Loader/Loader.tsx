import React from 'react'
import styles from "./Loader.module.scss";

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className={styles.loader}></div>
  )
}

export default Loader
import React from 'react'
import styles from './NotFoundBlock.module.scss' 

export const NotFoundBlock = () => {
  return (
    <div class={styles.root}>
        <span>😞</span>
        <h1>Ничего не найдено</h1>
        <p class={styles.description}>Подобной страницы в нашем интернет-магазине нет</p>
    </div>
  )
}

export default NotFoundBlock;

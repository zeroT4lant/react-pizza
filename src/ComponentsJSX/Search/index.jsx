import React from "react";
import search from './search.svg'
import close from './close.svg'
import styles from "./search.module.scss";

const Search = ({searchValue,setSearchValue}) => {

  
  return (
    <div className={styles.root}>
      <img alt="searchIcon" className={styles.icon} src={search}/>
      <input onChange={(el) => setSearchValue(el.target.value)}
      className={styles.input}
      placeholder="Поиск пиццы..."
      value={searchValue}
      />
      {
        searchValue && (<img onClick={() => setSearchValue('')} alt="close" src={close} className={styles.close}/>)
      }
    </div>
  );
};

export default Search;

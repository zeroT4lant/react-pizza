import React from "react";
import search from "./search.svg";
import close from "./close.svg";
import { SearchContext } from "../../App";

import styles from "./search.module.scss";

const Search = () => {
  //вытаскиваем переменную контекстом
  const { searchValue, setSearchValue } = React.useContext(SearchContext); //делаем деструкторизацию
  //так как передавали объект и содержимое его
  //если одну переменную, то просто название для const

  return (
    <div className={styles.root}>
      <img alt="searchIcon" className={styles.icon} src={search} />
      <input
        onChange={(el) => setSearchValue(el.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={searchValue}
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue("")}
          alt="close"
          src={close}
          className={styles.close}
        />
      )}
    </div>
  );
};

export default Search;

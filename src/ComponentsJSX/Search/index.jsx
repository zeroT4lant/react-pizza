import React from "react";
import search from "./search.svg";
import close from "./close.svg";
import debounce from "lodash.debounce";

import styles from "./search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  //вытаскиваем переменную контекстом

  //так как передавали объект и содержимое его
  //если одну переменную, то просто название для const

  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus(); //current для изменения как в случае со стейтами, позволяет взаимодействовать с переменной
  };

  const updateSearchValue = React.useCallback(
    //функция один раз создается и всё
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 150),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div class={styles.root}>
      <img alt="searchIcon" class={styles.icon} src={search} />
      <input
        ref={inputRef}
        onChange={onChangeInput}
        class={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
      />
      {value && ( //если searchValue не пустой, появляется крестик
        <img
          onClick={onClickClear}
          alt="close"
          src={close}
          class={styles.close}
        />
      )}
    </div>
  );
};

export default Search;

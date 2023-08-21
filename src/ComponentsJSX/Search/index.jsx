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

  const inputRef = React.useRef();

  const onClickClear = () => {// TS (event: React.MouseEvent<SVGSVGElement>)
    //<HTMLInputElement> - чтобы работали value
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus(); //current для изменения как в случае со стейтами, позволяет взаимодействовать с переменной
    // в TS inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    //функция один раз создается и всё
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 150),
    []
  );

  const onChangeInput = (event) => {// TS (event: React.ChangeEvent<HTMLInputElement>)
    //<HTMLInputElement> - чтобы работали value
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img alt="searchIcon" className={styles.icon} src={search} />
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


//ChangeEvent - при вводе текста куда либо, MouseEvent - при клике
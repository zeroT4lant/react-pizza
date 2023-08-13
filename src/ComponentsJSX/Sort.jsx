import React, { useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import {setSort} from "../redux/slices/filterSlice"

export const sortOptions = [
  {name:"популярности (desc)",sort: 'rating'},
  {name:"популярности (asc)",sort: '-rating'},
  {name:"цене (desc)",sort: 'price'},
  {name:"цене (asc)",sort: '-price'},
  {name:"алфавиту (desc)",sort: 'title'},
  {name:"алфавиту (asc)",sort: '-title'},
];

function Sort() {//впервые sortType приходит как объект с двумя полями(свойствами)
//{ sortType, onClickSort }
  const dispatch = useDispatch()
  const ssort = useSelector(state => state.filter.ssort)


  const [open, setOpen] = useState(false); //делаем ниже крутую проверку
  // если open==true, то рендерим выпадающий список

  // const sortName = sortOptions[sortType]

  const selectOptionAndClose = (i, open) => {
    dispatch(setSort(i))
    setOpen(!open);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{ssort.name}</span>
      </div>
      {
        //если open === true, то выводим выпадающий список. Два амперсанта работают так, что иду по очерёдности до конца, выполняя последнее ТРУ действие
        //например при 3 && 4 && 6 - выведется 6
        //в случае 3 && false && 6 - выведется false
        open && (
          <div className="sort__popup">
            <ul>
              {sortOptions.map((obj, i) => (
                <li
                  key={i}
                  onClick={() => selectOptionAndClose(obj, open)}
                  className={ssort.sort === obj.sort ? "active" : ""}
                >
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  );
}

export default Sort;

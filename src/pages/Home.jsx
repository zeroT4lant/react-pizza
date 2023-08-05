import React, { useEffect, useState } from "react";

import Sort from "../ComponentsJSX/Sort";
import PizzaBlock from "../ComponentsJSX/PizzaBlock";
import Categories from "../ComponentsJSX/Categories";
import Skeleton from "../ComponentsJSX/PizzaBlock/Skeleton";

export const Home = () => {
  const [items, setItems] = useState([]); //для начала пустой массив
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(1); //категории

  const [sortType, setSortType] = useState({//сортировка
    name: "популярности",
    sort: "rating",
  }); 

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://64ca4e9a700d50e3c704afbc.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sort}&order=desc`
    ) //вытаскиваем данные фетчем
      .then((res) => {
        return res.json();
      })
      .then(
        (
          arr //устанавливаем данные
        ) => {
          setItems(arr);
          setIsLoading(false);
        }
      );
    window.scrollTo(0, 0);
  }, [categoryId, sortType]); //скобки пустые в конце значат, что рендерим один раз при загрузке

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onClickCategory={(id) => setCategoryId(id)}
          />

          <Sort sortType={sortType} onClickSort={(sort) => setSortType(sort)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
            : items.map((el) => <PizzaBlock key={el.id} {...el} />)}
        </div>
      </div>
    </>
  );
};

export default Home;

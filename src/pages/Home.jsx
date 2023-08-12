import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

import Sort from "../ComponentsJSX/Sort";
import PizzaBlock from "../ComponentsJSX/PizzaBlock";
import Categories from "../ComponentsJSX/Categories";
import Skeleton from "../ComponentsJSX/PizzaBlock/Skeleton";
import Pagination from "../ComponentsJSX/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId); //для категорий
  const currentPage   = useSelector((state) => state.filter.currentPage);
  const ssort = useSelector((state) => state.filter.ssort.sort); //вытащили изначальное состояние - rating

  const { searchValue } = React.useContext(SearchContext); //делаем чтобы применить контекст
  const [items, setItems] = useState([]); //для начала пустой массив
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = ssort; //const sortBy = ssort.sort;
    const category = categoryId > 0 ? `category=${categoryId}` : ""; //work category
    const search = searchValue ? `&title=*${searchValue}*` : ""; //work search

    axios
      .get(
        `https://1e1f1345ed33866a.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`
      )
      .then((res) => {
        //ответ от сервера в res
        console.log(res.data.items)
        setItems(res.data.items);
        setIsLoading(false);
      });
  }, [categoryId, ssort, searchValue, currentPage]); //скобки пустые в конце значат, что рендерим один раз при загрузке

  const pizzasss = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onClickCategory={onClickCategory}
          />

          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzasss}</div>
        <Pagination value={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;

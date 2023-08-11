import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

import Sort from "../ComponentsJSX/Sort";
import PizzaBlock from "../ComponentsJSX/PizzaBlock";
import Categories from "../ComponentsJSX/Categories";
import Skeleton from "../ComponentsJSX/PizzaBlock/Skeleton";
import Pagination from "../ComponentsJSX/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  const { searchValue } = React.useContext(SearchContext); //делаем чтобы применить контекст
  const [items, setItems] = useState([]); //для начала пустой массив
  const [isLoading, setIsLoading] = useState(true);
  //const [categoryId, setCategoryId] = useState(1); //категории
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    //сортировка
    name: "популярности",
    sort: "rating",
  });

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);

    // const order = sortType.sort.includes("-") ? "asc" : "desc";
    // const sortBy = sortType.sort.replace("-", "");
    const sortBy = sortType.sort;
    const category = categoryId > 0 ? `category=${categoryId}` : ""; //work category
    const search = searchValue ? `&title=*${searchValue}*` : ""; //work search

    fetch(
      `https://1e1f1345ed33866a.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`
    ) //вытаскиваем данные фетчем
      .then((res) => {
        return res.json();
      })
      .then(
        (
          data //устанавливаем данные
        ) => {
          setItems(data.items);
          setIsLoading(false);
        }
      );
  }, [categoryId, sortType, searchValue, currentPage]); //скобки пустые в конце значат, что рендерим один раз при загрузке

  

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

          <Sort sortType={sortType} onClickSort={(sort) => setSortType(sort)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzasss}</div>
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
    </>
  );
};

export default Home;

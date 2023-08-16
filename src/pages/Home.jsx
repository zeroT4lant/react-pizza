import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from 'qs'
import { useNavigate } from "react-router-dom";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";

import Sort, { sortOptions } from "../ComponentsJSX/Sort";
import PizzaBlock from "../ComponentsJSX/PizzaBlock";
import Categories from "../ComponentsJSX/Categories";
import Skeleton from "../ComponentsJSX/PizzaBlock/Skeleton";
import Pagination from "../ComponentsJSX/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);//вместе с useRef используется current для изменений
  const isMounted = React.useRef(false)

  const categoryId = useSelector((state) => state.filter.categoryId); //для категорий
  const currentPage = useSelector((state) => state.filter.currentPage);
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

  const fetchPizzas = () => {
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
        setItems(res.data.items);
        setIsLoading(false);
      });
  }

  //Если изменили парaметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort:ssort,
        categoryId,
        currentPage,
      });
  
      navigate(`?${queryString}`);
    }
    isMounted.current = true
  },[categoryId, ssort, currentPage])

  //если был первый рендер, то проверяем URL-параметры и сохраняем в редaксе
  React.useEffect(()=> {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortOptions.find(obj => obj.sort === params.sort)

      dispatch(setFilters({
        ...params,
        sort,
      }))
      isSearch.current = true;
    }
  }, [])

  React.useEffect(() => {//при каждом изменении параметров в квадратных скобках ниже ререндерит страницу
    
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;

  }, [categoryId, ssort, searchValue, currentPage]); //скобки пустые в конце значат, что рендерим один раз при загрузке

  const pizzasss = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div class="container">
        <div class="content__top">
          <Categories
            categoryId={categoryId}
            onClickCategory={onClickCategory}
          />

          <Sort />
        </div>
        <h2 class="content__title">Все пиццы</h2>
        <div class="content__items">{isLoading ? skeletons : pizzasss}</div>
        <Pagination value={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;

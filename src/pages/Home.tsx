import React from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import {
  filterSelector,
  searchSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
  sortSelector,
  ssortSelector,
} from "../redux/slices/filterSlice";

import Sort, { sortOptions } from "../ComponentsJSX/Sort";
import PizzaBlock from "../ComponentsJSX/PizzaBlock";
import Categories from "../ComponentsJSX/Categories";
import Skeleton from "../ComponentsJSX/PizzaBlock/Skeleton";
import Pagination from "../ComponentsJSX/Pagination";
import { fetchPizzas, pizzaSelector } from "../redux/slices/pizzasSlice";

export const Home : React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false); //вместе с useRef используется current для изменений
  const isMounted = React.useRef(false);

  //СЕЛЕКТОРЫ
  // const categoryId = useSelector((state) => state.filter.categoryId); //для категорий
  // const currentPage = useSelector((state) => state.filter.currentPage);
  const {categoryId,currentPage} = useSelector(filterSelector)
  const ssort = useSelector(ssortSelector); //вытащили изначальное состояние - rating
  const { items, status } = useSelector(pizzaSelector);//вытащили из pizzaSlice
  
  const searchValue = useSelector(searchSelector)


  const onClickCategory = (id : number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page : number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = ssort; //const sortBy = ssort.sort;
    const category = categoryId > 0 ? `category=${categoryId}` : ""; //work category
    const search = searchValue ? `&title=*${searchValue}*` : ""; //work search

    dispatch(
      //@ts-ignore
      fetchPizzas({
        sortBy,
        category,
        search,
        currentPage,
        })
         );//Передаём параметры в pizzasSlice
  };

  //Если изменили парaметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: ssort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, ssort, currentPage]);

  //если был первый рендер, то проверяем URL-параметры и сохраняем в редaксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortOptions.find((obj) => obj.sort === params.sort);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    //при каждом изменении параметров в квадратных скобках ниже ререндерит страницу

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, ssort, searchValue, currentPage]); //скобки пустые в конце значат, что рендерим один раз при загрузке

  const pizzasss = items.map((obj : any) => <PizzaBlock key={obj.id} {...obj} />);
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
        {status === "error" ? (
          <div className="content__error-info">
            <h2>Ошибка бля</h2>
            <p>Чини, Козёл</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzasss}
          </div>
        )}
        <Pagination value={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;

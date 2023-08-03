import React, { useEffect, useState } from 'react'
import "./scss/app.scss"
import Header from './ComponentsJSX/Header';
import Sort from './ComponentsJSX/Sort';
import PizzaBlock from './ComponentsJSX/PizzaBlock';
import Categories from './ComponentsJSX/Categories';
import Skeleton from './ComponentsJSX/PizzaBlock/Skeleton';


function App() {

  const [items, setItems] = useState([]);//для начала пустой массив
  const [isLoading, setIsLoading] = useState(true)
;
  useEffect(() => {
  fetch('https://64ca4e9a700d50e3c704afbc.mockapi.io/items')//вытаскиваем данные фетчем
    .then((res) => {
      return res.json();
    })
    .then((arr) =>//устанавливаем данные
      {
        setItems(arr)
        setIsLoading(false)
      });
    }, []);//скобки пустые в конце значат, что рендерим один раз при загрузке

  return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                isLoading
                ? [...new Array(9)].map((_,index) => <Skeleton  key={index} />)
                : items.map((el) => <PizzaBlock key={el.id} {...el}/>)
              }
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;

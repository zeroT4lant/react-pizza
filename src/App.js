import React, { useEffect, useState } from 'react'
import "./scss/app.scss"
import Header from './ComponentsJSX/Header';
import Sort from './ComponentsJSX/Sort';
import PizzaBlock from './ComponentsJSX/PizzaBlock';
import Categories from './ComponentsJSX/Categories';


function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
  fetch()
    .then((res) => {
      return res.json();
    })
  .then((arr) =>
    {setItems(arr)
    });
  }, []);

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
                items//берём из pizzas.json и парсим
                .map(obj => <PizzaBlock key={obj.id}
                  {...obj}//спред оператором вставляем все пропсы , передаём в атрибуты тега , а не внутрь
                  >
                  </PizzaBlock>)
              }
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;

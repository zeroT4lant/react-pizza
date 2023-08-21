import React from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoriesProps = {
  categoryId : number;
  onClickCategory : (idx : number) => void;
}

const Categories : React.FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {


  const categoriesElement = categories.map((el, i) => (
    <li
      key={i}
      onClick={() => onClickCategory(i)} //ниже - когда нынешний стейт будет равен выбранному индексу, добавляем active
      className={categoryId === i ? "active" : ""}
    >
      {el}
    </li>
  )); //парсим все элементы

  return (
    <div className="categories">
      <ul>{categoriesElement}</ul>
    </div> //при проверке проверяет индекс и передаём класс 'актив', если индекс совпадает
  );
}
export default Categories;

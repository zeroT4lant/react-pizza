import React from "react";

function Categories(){
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Мясные','Все','Вегетарианская','Гриль','Острые','Закрытые']

  const onClickCategory = (index) => {
    setActiveIndex(index);
  }

  const categoriesElement = categories
    .map((el,i) => <li key={i} onClick={() => onClickCategory(i)} className={activeIndex === i ? 'active' : ''}>{el}</li>)//парсим все элементы

  return (
    <div className="categories">
      <ul>
        {categoriesElement}
      </ul>
    </div>//при проверке проверяет индекс и передаём класс 'актив', если индекс совпадает
  );
}
export default Categories;
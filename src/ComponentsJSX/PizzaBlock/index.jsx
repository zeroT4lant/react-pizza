import { useState } from "react";
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addItem } from "../../redux/slices/cartSlice";

function PizzaBlock({ id, title, price,imageUrl,sizes,types}) {

  const dispatch = useDispatch();
  //в массиве items ищем элемент, где айди будут совпадать
  const cartItem = useSelector(state => state.cart.items.find(obj => obj.id === id))

  //если нашёлся такой товар, то возвращаем count
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type:typeNames[activeType],
      size:activeSize,
    };
    dispatch(addItem(item));
  }


  const [activeType,setActiveType] = useState(types[0])

  //"sizes": [26, 30, 40],
  const [activeSize,setActiveSize] = useState(sizes[0])

  //types = [0,1]
  const typeNames = ['тонкое','традиционное'];

  return (
    <div class="pizza-block-wraper">
      <div class="pizza-block">
      <img
        class="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 class="pizza-block__title">{title}</h4>
      <div class="pizza-block__selector">
        <ul>
          {
            types.map((type,i) => <li class={activeType === type ? 'active' : ''} key={type} onClick={() => setActiveType(type)}>{typeNames[type]}</li>)
          }
        </ul>
        <ul>
          {
            sizes.map((size) => <li class={activeSize === size ? 'active' : ''} key={size} onClick={() => setActiveSize(size)}>{size} см.</li>)
          }
        </ul>
      </div>
      <div class="pizza-block__bottom">
        <div class="pizza-block__price">{price} ₽</div>
        <button
          onClick={onClickAdd}
          class="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
    </div>
  );
}

export default PizzaBlock;
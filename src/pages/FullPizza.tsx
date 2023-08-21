import axios from 'axios';
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const FullPizza: React.FC = () => {//FC - тип функционального компонента
    const [pizza,setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const {id} = useParams();//ДОСТАЁТСЯ из адрессной строки и позволяет использовать динамические параметры
    //используется для запроса
    //показывает, что нужно делать перерисовку, если меняется адрессная строка
    const navigate = useNavigate();


    React.useEffect(() => {
        async function fetchPizza(){
            try {
                const {data} = await axios.get('https://1e1f1345ed33866a.mokky.dev/items/' + id)
                setPizza(data);
            }
            catch (error){
                alert('Ошибка при получении пиццы!')
                navigate('/')
            }
        }

        fetchPizza();
    },[id])

    if (!pizza) {
        return <>Загрузка</>;
    }

  return (
    <div className='container'>
        <img src={pizza.imageUrl} />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} $</h4>
    </div>
  )
}

export default FullPizza
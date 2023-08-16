import { createSlice } from "@reduxjs/toolkit"

//связан с filterSlice
const initialState = {//создаём начальные значения
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        //B actions объектом с типом действия и payload(то что передали)
        addItem(state,action){
            const findItem = state.items.find(obj => obj.id === action.payload.id)//если был найден объект
            //передаём айди так как потом пригодится в другом методе CartItem`a - onClickPlus
            if (findItem){
                findItem.count++;
            }
            else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            
            state.totalPrice = state.items.reduce((sum,obj) => {
                return sum + (obj.price * obj.count);
            }, 0);//начинаем суммировать с нуля
            
        },
        minusItem(state,action){
            const findItem = state.items.find(obj => obj.id === action.payload)//если был найден объект
            if (findItem){
                findItem.count--;
            }
        },
        removeItem(state,action){
            //первое значение - sum это: текущее значение
            //второе значение - obj : добавляемое
            state.items = state.items.filter(obj => obj.id !== action.payload)
            //оставляем массив, где нет объекта подходящего под условие
        },
        clearItems(state){
            state.items = [];
            state.totalPrice = 0;
        },
    }
})

export const {addItem, removeItem, clearItems,minusItem} = cartSlice.actions;
//actions - по сути тот же reducers, разрабы решили так сделать
//actions == reducers

export default cartSlice.reducer;
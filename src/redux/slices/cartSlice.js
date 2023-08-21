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
            const replica = state.items.find(obj => {
                return(
                obj.id===action.payload.id
                && obj.size===action.payload.size
                && obj.type===action.payload.type)})
            const findItem = state.items.find(obj => obj.id === action.payload.id)//если был найден объект
            //передаём айди так как потом пригодится в другом методе CartItem`a - onClickPlus
            
            if (replica){//СЛУЧАЙ - НАШЛИ РЕПЛИКУ ПИЦЦЫ
                replica.count++;
            }
            else{
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            
            
            //первое значение - sum это: перебирает каждый элемент, прибавляет прошлое значение
            //второе значение - obj : добавляемое
            state.totalPrice = state.items.reduce((sum,obj) => {
                return sum + (obj.price * obj.count);
            }, 0);//начинаем суммировать с нуля
            //проходит циклом и считает всю сумму
            
        },
        minusItem(state,action){//work
            const findItem = state.items.find(obj => obj.id === action.payload)//если был найден объект
            if (findItem){
                findItem.count--;
                state.totalPrice = findItem.count * findItem.price;//меняет один айтем
                state.totalPrice = state.items.reduce((sum,obj) => {//проходит по циклу и вычисляет всю сумму
                    return sum + (obj.price * obj.count);
                }, 0);
            }
        },
        removeItem(state,action){//work
            const findItem = state.items.find(obj => obj.id === action.payload)//если был найден объект
            if (findItem){
                findItem.count = 0;
                state.totalPrice = findItem.count * findItem.price;//меняет один айтем
                state.totalPrice = state.items.reduce((sum,obj) => {//проходит по циклу и вычисляет всю сумму
                    return sum + (obj.price * obj.count);
                }, 0);
            }
            state.items = state.items.filter(obj => obj.id !== action.payload)
            //оставляем массив, где нет объекта подходящего под условие
            
        },
        clearItems(state){
            state.items = [];
            state.totalPrice = 0;
        },
    }
})

export const selectCart = (state) => state.cart;
export const selectCartItem = state => state.cart.items.find(obj => obj.id === id)
export const selectCartItems = state => state.cart.items
export const selectTotalPrice = (state) => state.cart.totalPrice

export const {addItem, removeItem, clearItems,minusItem} = cartSlice.actions;
//actions - по сути тот же reducers, разрабы решили так сделать
//actions == reducers

export default cartSlice.reducer;
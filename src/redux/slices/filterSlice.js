import { createSlice } from "@reduxjs/toolkit"

//связан с filterSlice
const initialState = {//создаём начальное значение
    categoryId: 0,
    sort: {
        //сортировка
        name: "популярности",
        sort: "rating",
    },
}

const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers: {
        //B actions объектом с типом действия и payload(то что передали)
        setCategoryId(state, action) {
            state.categoryId = action.payload
        }
    }
})

export const {setCategoryId} = filterSlice.actions;
//actions - по сути тот же reducers, разрабы решили так сделать
//actions == reducers

export default filterSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

//связан с filterSlice
const initialState = {//создаём начальные значения
    categoryId: 0,  //для категорий
    currentPage : 1,
    ssort: {    //для сортировок
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
        },
        setSort(state, action) {
            state.ssort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    }
})

export const {setCategoryId,setSort,setCurrentPage} = filterSlice.actions;
//actions - по сути тот же reducers, разрабы решили так сделать
//actions == reducers

export default filterSlice.reducer;
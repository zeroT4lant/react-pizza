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
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage)
            state.ssort = action.payload.sort//было ssort в гайде 15 урок до 10 минуты
            state.categoryId = Number(action.payload.categoryId)
        },
    }
})

export const {setCategoryId,setSort,setCurrentPage,setFilters} = filterSlice.actions;
//actions - по сути тот же reducers, разрабы решили так сделать
//actions == reducers

export default filterSlice.reducer;
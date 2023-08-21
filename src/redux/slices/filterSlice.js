import { createSlice } from "@reduxjs/toolkit";

//связан с filterSlice
const initialState = {
  //создаём начальные значения
  searchValue: "",
  categoryId: 0, //для категорий
  currentPage: 1,
  ssort: {
    //для сортировок
    name: "популярности",
    sort: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    //B actions объектом с типом действия и payload(то что передали)
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.ssort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.ssort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const sortSelector = (state) => state.filter.ssort
export const ssortSelector = (state) => state.filter.ssort.sort
export const filterSelector = (state) => state.filter
export const searchSelector = (state) => state.filter.searchValue

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
//actions - по сути тот же reducers, разрабы решили так сделать
//actions == reducers

export default filterSlice.reducer;

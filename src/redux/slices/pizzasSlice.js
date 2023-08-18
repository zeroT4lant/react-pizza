import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",//чтобы был понятный статус в редаксе, к ним добавляются статусы из Экстра Редюсеров
  async (params,thunkAPI) => {
    const { sortBy, category, search, currentPage } = params;
    const res = await axios.get(
      `https://1e1f1345ed33866a.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`
    );

    return res.data.items;
  }
);

//связан с pizzasSlice
const initialState = {
  //создаём начальные значения
  items: [],
  status: 'loading'
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
          state.status = "loading";
          state.items = [];
          console.log("Отправка");
        })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
        console.log("Успешно");
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
        console.log("пЛОХ");
      });
  },
});

export const { setItems } = pizzasSlice.actions;
//actions - по сути тот же reducers, разрабы решили так сделать
//actions == reducers

export default pizzasSlice.reducer;
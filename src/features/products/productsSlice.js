import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL } from '../../utils/constans'
import { shuffle } from '../../utils/common';

export const getProducts = createAsyncThunk('categories/getProducts', async (_, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/products`)
    return res.data
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error)
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    filtered: [],
    related: [],
    isLoading: false
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload)
    },
    getRelatedProducts: (state, { payload }) => {
      const list =  state.list.filter(({category: {id}}) => id === payload)
      state.related = shuffle(list)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload
      state.isLoading = false
    })
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const {filterByPrice, getRelatedProducts} = productsSlice.actions

export default productsSlice.reducer
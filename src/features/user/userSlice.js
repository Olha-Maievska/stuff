import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL } from '../../utils/constans'

export const createUser = createAsyncThunk('users/createUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, payload)
    return res.data
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error)
  }
})

export const loginUser = createAsyncThunk('users/loginUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, payload)
    const login = await axios(`${BASE_URL}/auth/profile`, {
      headers: {
        "Authorization": `Bearer ${res.data.access_token}`
      }
    })
    return login.data
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateUser = createAsyncThunk('users/updateUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload)
    return res.data
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error)
  }
})

const addCurrentUser = (state, action) => {
  state.currentUser = action.payload
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    cart: [],
    favourites: [],
    isLoading: false,
    formType: 'signup',
    showForm: false,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart]
      const found = state.cart.find(({ id }) => id === payload.id)
      if (found) {
        newCart = newCart.map(item => {
          return item.id === payload.id ? {...item, quantity: payload.quantity || item.quantity + 1} : item
        })
      } else newCart.push({ ...payload, quantity: 1 })
      
      state.cart = newCart
    },
    addItemToFavourites: (state, { payload }) => {
      let newItem = [...state.favourites]
      const found = state.favourites.find(({ id }) => id === payload.id)
      if (found) return 
      else {
        newItem.push({ ...payload})
      }
      state.favourites = newItem
    },
    removeItemFromCart: (state, { payload}) => {
      state.cart = state.cart.filter(({id}) => id !== payload)
    },
    removeItemFromFavourites: (state, { payload}) => {
      state.favourites = state.favourites.filter(({id}) => id !== payload)
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser)
    builder.addCase(loginUser.fulfilled, addCurrentUser)
    builder.addCase(updateUser.fulfilled, addCurrentUser)
  }
})

export const {
  addItemToCart,
  addItemToFavourites,
  toggleForm,
  toggleFormType,
  removeItemFromCart,
  removeItemFromFavourites
} = userSlice.actions

export default userSlice.reducer
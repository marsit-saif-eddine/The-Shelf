// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appBooks/getAllData', async () => {
  const response = await axios.get('/book/books')
  
  return response.data
})

 export const getData = createAsyncThunk('appBooks/getAllAcceptedData', async params => {
  
  const response = await axios.get('/book/filter_books', 
  {params: {
    q: params.q,
    sortColumn: params.sortColumn,
    sort: params.sort,
    page: params.page,
    perPage: params.perPage,
    accepted: params.accepted,
    available: params.available
  }})
  
  return {
    params,
    data: response.data.books,
    totalPages: response.data.total
    
  }
})

export const getBook = createAsyncThunk('appBooks/getBook', async id => {
  const response = await axios.get('book/', { params:{BookId:id} })
  console.log('dataa msg',response.data)

  
  return response.data
})
/* 

export const addUser = createAsyncThunk('appBooks/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/users/add-user', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})*/

export const deleteBook = createAsyncThunk('appBooks/deleteBook', async (id, { dispatch, getState }) => {
  await axios.delete('book/', { id })
  await dispatch(getData(getState().books.params))
  await dispatch(getAllData())
  return id
})
export const updateStatusBook = createAsyncThunk('appBooks/updatStatus', async (id, accepted, { dispatch, getState }) => {
  await axios.put('book/switch_accepted', { id }, {accepted})
  await dispatch(getData(getState().books.params))
  await dispatch(getAllData())
  return id
})


export const appBooksSlice = createSlice({
  name: 'appBooks',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedBook: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
        
      })
      .addCase(getData.fulfilled, (state, action) => {
        
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.selectedBook = action.payload
      })
      .addCase(updateStatusBook.fulfilled, (state, action) => {
        state.allData = action.payload
      })
  }
})

export default appBooksSlice.reducer

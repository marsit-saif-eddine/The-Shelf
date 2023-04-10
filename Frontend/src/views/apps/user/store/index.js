// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await axios.get('/user/AllusersForAdmin')
  
  return response.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  
  const response = await axios.get('/user/usersForAdmin', 
  {params: {
    q: params.q,
    sortColumn: params.sortColumn,
    sort: params.sort,
    page: params.page,
    perPage: params.perPage,
    role: params.role,
    status: params.status
  }})
  
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
    
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get('/user/userprofile', { params:{userId:id} })
  console.log(response.data)
  return response.data
})
export const rateUser = createAsyncThunk('appUsers/rateUser', async (data) => {
  console.log(data)
  await axios.put("/user/rateUser", data)
  await dispatch(getAllData())
  return profileId
})
export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/users/add-user', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/users/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
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
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUsersSlice.reducer

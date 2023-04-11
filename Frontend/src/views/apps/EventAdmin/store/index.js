// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appEvents/getAllData', async () => {
  const response = await axios.get('/events')
  
  return response.data
})

export const getData = createAsyncThunk('appEvents/getData', async params => {
  
  const response = await axios.get('/events', 
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
    data: response.data.events,
    totalPages: response.data.total
    
  }
})

export const getEvent = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get('/events', { params:{eventId:id} })
  console.log(response.data)
  return response.data
})

export const appEventsSlice = createSlice({
  name: 'appEvents',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedEvent: null
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
        state.selectedEvent = action.payload
      })
  }
})

export default appEventsSlice.reducer

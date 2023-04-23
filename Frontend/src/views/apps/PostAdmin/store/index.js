// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appPosts/getAllData', async () => {
  const response = await axios.get('/post/posts')
  
  return response.data
})

 export const getData = createAsyncThunk('appPosts/getAllAcceptedData', async params => {
  
  const response = await axios.get('/post/filter_posts', 
  {params: {
    q: params.q,
    sortColumn: params.sortColumn,
    sort: params.sort,
    page: params.page,
    perPage: params.perPage,
    is_accepted: params.accepted
  }})
  
  return {
    params,
    data: response.data.posts,
    totalPages: response.data.total
  }
})

export const getPost = createAsyncThunk('appPosts/getPost', async id => {
  const response = await axios.get('post/', { params:{PostId:id} })
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

export const deletePost = createAsyncThunk('appPosts/deletePost', async (id, { dispatch, getState }) => {
  await axios.delete('post/', { params:{id:id} })
  await dispatch(getData(getState().posts.params))
  await dispatch(getAllData())
  return id
})
export const updateStatusPost = createAsyncThunk('appPosts/updatStatus', async (id, accepted, { dispatch, getState }) => {
  await axios.put(`post/switch_accepted/`, { params:{id:id} },{body: {accepted}})
  console.log('useeer', id)
  await dispatch(getData(getState().posts.params))
  await dispatch(getAllData())
  return id
})


export const appPostsSlice = createSlice({
  name: 'appPosts',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedPost: null
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
      .addCase(getPost.fulfilled, (state, action) => {
        state.selectedPost = action.payload
      })
      .addCase(updateStatusPost.fulfilled, (state, action) => {
        state.allData = action.payload
      })
  }
})

export default appPostsSlice.reducer

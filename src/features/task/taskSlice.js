import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    loading:false,
    tasks : [],
    Error:false,
}

export const getUserTasks = createAsyncThunk('getUserTasks', async() =>{
    const response = await api.get('/users/user-tasks')
    return response.data
})

export const deleteUserTask = createAsyncThunk('deleteUserTask',async(id) => {
    const response = await api.delete(`/tasks/delete-task/${id}`)
    return response.data
})


export const createTask = createAsyncThunk('createTask', async(task) => {
    const response = await api.post('/tasks/create-task',task)
    return response.data
})

export const updateTaskAction = createAsyncThunk('updateTask',async(task)  => {
    const response = await api.patch(`tasks/update-task/${task._id}`, task)
    return response.data
} )

export const taskSlice = createSlice({
    name:'task',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder) => {
        builder.addCase(getUserTasks.pending,(state) => {
            state.loading = true
        }),
        builder.addCase(getUserTasks.fulfilled,(state,action) => {
            state.loading = false,
            state.tasks = action.payload.data
        }),
        builder.addCase(getUserTasks.rejected,(state,action) => {
            console.error('Error',action.payload)
            state.Error = true
        }),
        builder.addCase(deleteUserTask.pending,(state,) =>{
            state.loading = true
            
        } ),
        builder.addCase(deleteUserTask.fulfilled,(state,action) => {
            state.loading = false 
            state.tasks = action.payload.data
        }),
        builder.addCase(deleteUserTask.rejected,(state,action) => {
            state.Error = action.payload
            console.error('Error', action.payload)
        }),

        builder.addCase(createTask.pending , (state)=> {
            state.loading = true
        }),
        builder.addCase(createTask.fulfilled,(state,action) => {
            state.loading = false
            state.tasks = action.payload.data
        }),
        builder.addCase(createTask.rejected,(state,action) => {
            state.loading = false
            console.error('Error', action.payload)
            state.Error = true
        }),

        builder.addCase(updateTaskAction.pending, (state ) => {
            state.loading = true
        }),
        builder.addCase(updateTaskAction.fulfilled , (state,action ) => {
            state.loading = false
            state.tasks = action.payload.data
        }),
        builder.addCase(updateTaskAction.rejected , (state,action) => {
            state.Error = action.payload
            console.error('Error', action.payload)
        })

    }
})

export default taskSlice.reducer
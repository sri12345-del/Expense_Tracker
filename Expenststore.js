import { createSlice } from "@reduxjs/toolkit"

const expensSlice = createSlice({
    name: "expense",
    initialState: {item:[],amount:0},
    reducers: {
        Addfromform(state, action) {
            state.amount=state.amount+Number(action.payload.money)
            const item = state.item.find(val => val.id === action.payload.id)
            if (item) {
                state.item=[...state.item]
            } else {
                state.item=[...state.item, action.payload]
            }
        },
      
        deleteexpense(state, action) {
           state.amount=state.amount-Number(action.payload.money)
            state.item = state.item.filter(item => item.id != action.payload.id)
        },
       

    }
})


export const expenseaction = expensSlice.actions

export default expensSlice
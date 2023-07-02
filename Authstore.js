import { createSlice } from "@reduxjs/toolkit"

const key = localStorage.getItem("key")
const authstore={token:key,loogedin:!!key}
const authslice = createSlice({
    name: "auth",
    initialState: authstore,
    reducers: {
        addtoken(state,actions) {
            state.token = actions.payload
            state.loogedin=!!state.token
        },
        removetoken(state) {
            state.loogedin=false
        }
    }
})

export const authaction=authslice.actions


export default authslice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const themeslice = createSlice({
    name: "theme",
    initialState: { theme: true },
    reducers: {
        themehandler(state) {
            state.theme=!state.theme
        }
    }
    
})

export const themeaction = themeslice.actions

export default themeslice
import { configureStore } from "@reduxjs/toolkit"
import authreducer from "./Authstore"
import expenseslice from "./Expenststore"
import themeslice from "./themereducer"

const store = configureStore({
    reducer:{auth:authreducer,expense:expenseslice.reducer,theme:themeslice.reducer}
})

export default store
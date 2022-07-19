import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../counter/counterSlice'

export const demoStore = configureStore({
    reducer: {
        counter: counterReducer,
    },
})

export type AppDispatch = typeof demoStore.dispatch
export type RootState = ReturnType<typeof demoStore.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

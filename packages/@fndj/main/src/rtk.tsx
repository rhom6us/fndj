import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state, {payload:[num, when]}:PayloadAction<[num:number, when?:Date]>) => state + num,
  },
})
// Will handle the action type `'counter/increment'`
counterSlice.actions.increment([3])

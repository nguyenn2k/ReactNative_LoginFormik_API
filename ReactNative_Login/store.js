import { View, Text } from 'react-native'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'

import LoginReducer from './src/Login/LoginSlice'

export const store = configureStore ({
    reducer:{
        //Có thể khai báo nhiều Reducer ở đây:
        LoginReducer
    }
})
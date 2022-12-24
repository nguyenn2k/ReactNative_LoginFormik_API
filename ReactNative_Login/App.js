import { View, Text } from 'react-native'
import React from 'react'
import Login from './src/Login/Login'
import { Provider } from 'react-redux'
import { store } from './store'

export default function App() {
  return (
    <Provider store={store}>
      <View style={{flex:1}}>
        <Login/>
      </View>
    </Provider>
  )
}
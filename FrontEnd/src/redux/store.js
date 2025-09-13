import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import expenseSlice from './expenseSlice'

const store=configureStore({

	reducer:{
		auth:userSlice,
		expense:expenseSlice
	}
})

export default store;
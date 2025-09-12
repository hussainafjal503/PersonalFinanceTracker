import {createSlice} from '@reduxjs/toolkit'

BASE_URL="http://localhost:5173"
const expenseSlice=createSlice({
	name:"expense",
	initialState:{
		message:null,
		data:[],
		response:"",

		

	},
	reducers:{

		
		addExpenseSuccess:(state,action)=>{
			state.message=action.payload.message;
			state.response=action.payload;

		},
		
		getAllDataSuccess:(state,action)=>{
			state.message=action.payload.message;
			state.data=action.payload

		},

		expenseUpdate:(state,action)=>{
			state.message=action.payload.message;
			state.response=action.payload

		},

		deleteExpense:(state,action)=>{
			state.message=action.payload.message;
			state.response=action.payload

		},



		clearAllError:(state,action)=>{

			state.message=null;
		}

	}
})


export const createExpenseDispatch=(data)=>async(dispatch)=>{


	try{

	}catch(err){
		console.log("error occured while creating Expenses : ",err);
	}

}




export default expenseSlice.reducer;
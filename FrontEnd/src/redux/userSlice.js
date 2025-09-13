import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


const BASE_URL="http://localhost:5000"
const userSlice=createSlice({
	name:"auth",
	initialState:{
			name:"",
			email:"",
			status:false,
			loading:null,
			message:null,
			userData:null
	},
	reducers:{
		createUserRequest:(state,action)=>{
			state.loading=true;
			state.status=false;

		},

		userSuccess:(state,action)=>{
			state.loading=false;
			state.status=true;
			state.name=action.payload.name;
			state.email=action.payload.email;
			state.message=action.payload.message;
			state.userData=action.payload;

		},
		userFail:(state,action)=>{
			state.loading=false;
			state.status=false;
		},

		clearAllError:(state,action)=>{
			state.loading=null;
			
		}
	}

})


export const createUser=(data)=>async(dispatch)=>{
	try{
		dispatch(userSlice.actions.createUserRequest());

		
		
		const response=await axios.post(`${BASE_URL}/api/v1/user/create-user`,data,
			{
				withCredentials:true,
				headers:{
					"Content-Type":"application/json"
				}
			}
		)

		if(response?.data?.success==false){
			dispatch(userSlice.actions.userFail(response?.data?.message));
			return;
		}
		dispatch(userSlice.actions.userSuccess(response?.data?.data));
		dispatch(userSlice.actions.clearAllError());
		


	}catch(Err){

		dispatch(userSlice.actions.userFail())
		console.log("Error occured in creating user slice : ",Err);
	}

}


export const getUserData=(data)=>async(dispatch)=>{
	try{


		if(!data){
			return;
		}
		const response=await axios.get(`${BASE_URL}/api/v1/user/get-user-details/${data?._id}`);

		if(!response) throw new Error("unable to fetch data ");
		// console.log(response);
		dispatch(userSlice.actions.userSuccess(response?.data?.data));

	}catch(err){
		console.error("Error occured ", err);
	}
}

export default userSlice.reducer;
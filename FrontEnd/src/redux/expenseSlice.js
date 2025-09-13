import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "http://localhost:5000";
const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenseMessage: null,
    data: [],
    response: "",
    spendAmount: 0,
    earnedAmount: 0,
  },
  reducers: {
    addExpenseSuccess: (state, action) => {
    //   console.log(action.payload);
      state.expenseMessage = action.payload.message;
      state.response = action.payload;
    },

    getAllDataSuccess: (state, action) => {
      // console.log(action.payload)
      state.data = action.payload.data;
      state.earnedAmount = action.payload.earnedAmount;
      state.spendAmount = action.payload.spendAmount;
    },

    expenseUpdate: (state, action) => {
      state.expenseMessage = action.payload.message;
      state.response = action.payload.data;
    },

   deleteExpense: (state, action) => {
  const deletedId = action.payload;
  state.data = state.data.filter((item) => item._id !== deletedId);
  state.expenseMessage = "Deleted Successfully";
},

    clearAllError: (state, action) => {
      state.message = null;
    },
  },
});

export const createExpenseDispatch = (data) => async (dispatch) => {
  try {
    data.setExpenseLoading(true);
    const response = await axios.post(`${BASE_URL}/api/v1/expense/add`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(response)
    dispatch(expenseSlice.actions.addExpenseSuccess(response?.data));
  } catch (err) {
    console.log("error occured while creating Expenses : ", err);
  } finally {
    data.setExpenseLoading(false);
  }
};

export const createEarnDispatch = (data) => async (dispatch) => {
  try {
    data.setExpenseLoading(true);
    const response = await axios.post(
      `${BASE_URL}/api/v1/expense/updateAmount`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response)
    dispatch(expenseSlice.actions.addExpenseSuccess(response?.data));
  } catch (err) {
    console.log("error occured while creating Expenses : ", err);
  } finally {
    data.setExpenseLoading(false);
  }
};

export const getAllExpenseData = (data) => async (dispatch) => {
  // console.log(data);
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/expense/getAll/${data}`
    );
    // console.log(response);

    let totalSpend = 0;
    let totalEarned = 0;
    response?.data?.data?.expenseId.forEach((item) => {
      if (item.status === "spend") {
        totalSpend += item.amount;
      } else if (item.status === "earned") {
        totalEarned += item.amount;
      }
    });

    const newData = {
      data: response?.data?.data.expenseId,
      spendAmount: totalSpend,
      earnedAmount: totalEarned,
    };

    dispatch(expenseSlice.actions.getAllDataSuccess(newData));
  } catch (err) {
    console.log("Error occured while getting all expense Data : ", err);
  }
};

export const DeleteHandler = (data) => async (dispatch) => {
  try {
    // console.log(data);
   const response= await axios.delete(`${BASE_URL}/api/v1/expense/${data.id}/delete`, {
      data: { userId: data.userId }, 
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

// console.log(response?.data?.response._id);
	if(response){
		dispatch(expenseSlice.actions.deleteExpense(response?.data?.response._id))
	}
  } catch (Err) {
    console.log("Error occured while deleting..", Err);
  }
};



export const updateHandlerDispatch=(data)=>async(dispatch)=>{
	try{

		const formData=data.expenseFormData;

		// console.log(data);
		const response=await axios.put(`${BASE_URL}/api/v1/expense/${data.id}/edit`,formData,{
			withCredentials:true,
			headers:{
				'Content-Type':"application/json"
			}
		})
		if(!response){
			throw new Error("unable to recieve response");
		}

		// console.log(response);
		dispatch(expenseSlice.actions.expenseUpdate(response?.data))
	}catch(err){
		console.log("Error occured while updating : ",err);
	}
}



export default expenseSlice.reducer;

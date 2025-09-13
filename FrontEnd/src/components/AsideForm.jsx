import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'


import {
  createExpenseDispatch,
  createEarnDispatch,
  updateHandlerDispatch,
} from "../redux/expenseSlice";

import { useDispatch, useSelector } from "react-redux";

function AsideForm({ setExpenseAside, expenseAside,update,setUpdate,updateId, setUpdateId}) {
  const expenseInitialDetail = {
    title: "",
    amount: "",
    date: "",
    category: "",
  };

  const {userData}=useSelector(state=>state.auth);
  const {data}=useSelector(state=>state.expense);
  

  const [expenseFormData, setExpenseFormData] = useState(expenseInitialDetail);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const dispatch = useDispatch();



  const expenseInputHandler = (e) => {
    const { name, value } = e.target;
    setExpenseFormData({
      ...expenseFormData,
      [name]: value,
    });
  };

  const expenseSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !expenseFormData.title ||
      !expenseFormData.amount ||
      !expenseFormData.date ||
      !expenseFormData.category
    ) {
      Swal.fire({
        title: "Fields are required",
        icon: "warning",
      });

      return;
    }

    if (expenseFormData.amount < 0) {
      Swal.fire({
        title: "Amount Should be greater than Zero",
        icon: "warning",
      });
      return;
    }

    const data = { ...expenseFormData };
    data.setExpenseLoading = setExpenseLoading;
    data.userId = userData._id;

    if (expenseAside === "expense") {
      dispatch(createExpenseDispatch(data));
    } else if (expenseAside === "income") {
      dispatch(createEarnDispatch(data));
    } else {

        expenseFormData.userId=userData._id;
      let updatedData={
        id:updateId,
        expenseFormData

      }

      dispatch(updateHandlerDispatch(updatedData))
    }
    setExpenseFormData(expenseInitialDetail);
    setExpenseAside(null);
  };


useEffect(() => {
  if (!updateId) return;

  const expenseEditData = data.find((item) => item._id === updateId);

  if (expenseEditData) {
    // console.log(expenseEditData);
    setExpenseFormData(expenseEditData); 
  }
}, [updateId, data]);


  return (
    <div>
      <div
        style={{
          right: expenseAside ? 0 : -400,
          display: expenseAside ? "block" : "none",
        }}
        className={`absolute top-20  bg-zinc-800 h-[615px] w-full md:w-[400px] px-6 py-6 text-white transition-all duration-400 z-1  `}
      >
        <div className="flex flex-col gap-6">
          <div className="relative">
            <button
              onClick={() =>{ setExpenseAside(null)
                  setExpenseFormData(expenseInitialDetail)
                  setUpdate(false)
                  setUpdateId(null);
              }
              }
              className="absolute top-0 right-4 font-bold text-lg cursor-pointer hover:text-red-500 transtion-all duration-200 "
            >
              X
            </button>
          </div>

          <form
            action=""
            className=" flex flex-col gap-6 mt-6"
            onSubmit={expenseSubmitHandler}
          >
            <div className="flex flex-row gap-4 w-full h-full">
              <div className="flex flex-col gap-6">
                <label className="py-2" htmlFor="title">
                  Title
                </label>
                <label className="py-2" htmlFor="amount">
                  Amount
                </label>
                <label className="py-2" htmlFor="date">
                  Date
                </label>
                <label className="py-2" htmlFor="category">
                  Category
                </label>
              </div>

              <div className=" w-full flex flex-col gap-6">
                <input
                  type="text"
                  id="title"
                  placeholder="Enter Title"
                  name="title"
                  className=" w-full rounded-md border border-gray-400 py-2 px-6 outline-none"
                  value={expenseFormData.title}
                  onChange={expenseInputHandler}
                />

                <input
                  type="text"
                  id="amount"
                  placeholder=" Enter ₹ Amount"
                  name="amount"
                  className="rounded-md border border-gray-400 py-2 px-6 outline-none"
                  value={expenseFormData.amount}
                  onChange={expenseInputHandler}
                />

                <input
                  type="date"
                  id="date"
                  placeholder="Enter Date"
                  name="date"
                  className="rounded-md border border-gray-400 py-2 px-6 outline-none"
                  value={expenseFormData.date}
                  onChange={expenseInputHandler}
                />

                <input
                  type="text"
                  id="category"
                  placeholder="Enter Category"
                  name="category"
                  className="rounded-md border border-gray-400 py-2 px-6 outline-none"
                  value={expenseFormData.category}
                  onChange={expenseInputHandler}
                />
              </div>
            </div>
            <button
              disabled={expenseLoading}
              type="submit"
              className={`font-semibold text-white  hover:scale-90 transition-all duration-300 py-2 rounded-md hover:bg-zinc-950 cursor-pointer ${update ? "bg-yellow-600" :"bg-zinc-900"}`}
            >
              {update
                ? "update"
                : expenseAside === "income"
                ? "Income"
                : "Expense"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AsideForm;

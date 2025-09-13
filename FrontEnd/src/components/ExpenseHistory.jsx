import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenseData } from "../redux/expenseSlice";
import AsideForm from "./AsideForm";
import { useLocation } from "react-router-dom";

function ExpenseHistory() {

	const [expenseAside,setExpenseAside]=useState(false);
  const { data } = useSelector((state) => state.expense);
  const { userData } = useSelector((state) => state.auth);
   const [update,setUpdate]=useState(false);

  const dispatch = useDispatch();
  const location=useLocation();
  console.log(location)

  useEffect(() => {
    if (userData?._id) {
      dispatch(getAllExpenseData(userData._id));
    }
  }, []);

  return (
    <div className="pt-25 bg-zinc-700 w-full min-h-screen  flex flex-col gap-4 text-white font-semibold px-4 sm:px-8 md:px-12 lg:px-20 overflow-auto overflow-x-hidden">
      {data &&
        data?.map((item, index) => {

			if(item.status=="spend" && location.pathname=="/your-expenses"){
				return  (<div
            key={index}
            className="shadow-sm shadow-gray-600 rounded-md hover:bg-zinc-800 transition-all duration-300 px-4 sm:px-6 py-3"
          >
            {/* -------------------- Mobile Layout -------------------- */}
            <div className="flex flex-col gap-3 lg:hidden">
              {/* Top row -> Category left, Amount right */}
              <div className="flex justify-between items-center">
                <p className="capitalize text-base font-semibold">
                  {item.category}
                </p>
                <p className="text-red-500 font-bold text-lg flex items-center gap-1">
                  <span>-</span> {item.amount}
                </p>
              </div>

              {/* Date */}
              <p className="text-gray-400 text-sm">
                {new Date(item.date).toLocaleDateString()}
              </p>

              {/* Title */}
              <h2 className="text-sm sm:text-base font-light">{item.title}</h2>

              {/* Buttons (center aligned bottom) */}
              <div className="flex gap-6 justify-center">
                <button className="cursor-pointer hover:text-green-500 transition-all duration-300 hover:scale-110"
				
				onClick={()=>{
				setUpdate(true)	
					setExpenseAside(true)}
				}
				
				>
                  Update
                </button>
                <button className="cursor-pointer hover:text-red-500 transition-all duration-300 hover:scale-110"
				
					onClick={dispatch()}

				>
                  Delete
                </button>
              </div>
            </div>

            {/* -------------------- Laptop/Desktop Layout -------------------- */}
            <div className="hidden lg:flex flex-row items-center justify-between gap-4">
              {/* LEFT SIDE (Category, Date, Title) */}
              <div className="flex flex-col lg:w-1/3">
                <div className="flex items-center gap-4 text-lg capitalize">
                  <p>{item.category}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <h2 className="mt-2 text-base font-light">{item.title}</h2>
              </div>

              {/* AMOUNT (Center) */}
              <div className="lg:w-1/3 flex justify-center">
                <p className="flex items-center gap-2 text-lg font-semibold text-red-500">
                  <span className="font-bold text-2xl">-</span>
                  {item.amount}
                </p>
              </div>

              {/* BUTTONS (Right side) */}
              <div className="flex gap-4 justify-end lg:w-1/3">
                <button className="cursor-pointer hover:text-green-500 transition-all duration-300 hover:scale-110"
				
			onClick={()=>{
				setUpdate(true)	
					setExpenseAside(true)}
				}
				>
                  Update
                </button>
                <button className="cursor-pointer hover:text-red-500 transition-all duration-300 hover:scale-110">
                  Delete
                </button>
              </div>
            </div>
          </div>)
			}else if(item.status=="earned" && location.pathname=="/your-income"){
				return  (<div
            key={index}
            className="shadow-sm shadow-gray-600 rounded-md hover:bg-zinc-800 transition-all duration-300 px-4 sm:px-6 py-3"
          >
            {/* -------------------- Mobile Layout -------------------- */}
            <div className="flex flex-col gap-3 lg:hidden">
              {/* Top row -> Category left, Amount right */}
              <div className="flex justify-between items-center">
                <p className="capitalize text-base font-semibold">
                  {item.category}
                </p>
                <p className="text-red-500 font-bold text-lg flex items-center gap-1">
                  <span>-</span> {item.amount}
                </p>
              </div>

              {/* Date */}
              <p className="text-gray-400 text-sm">
                {new Date(item.date).toLocaleDateString()}
              </p>

              {/* Title */}
              <h2 className="text-sm sm:text-base font-light">{item.title}</h2>

              {/* Buttons (center aligned bottom) */}
              <div className="flex gap-6 justify-center">
                <button className="cursor-pointer hover:text-green-500 transition-all duration-300 hover:scale-110"
				
				onClick={()=>{
				setUpdate(true)	
					setExpenseAside(true)}
				}
				
				>
                  Update
                </button>
                <button className="cursor-pointer hover:text-red-500 transition-all duration-300 hover:scale-110">
                  Delete
                </button>
              </div>
            </div>

            {/* -------------------- Laptop/Desktop Layout -------------------- */}
            <div className="hidden lg:flex flex-row items-center justify-between gap-4">
              {/* LEFT SIDE (Category, Date, Title) */}
              <div className="flex flex-col lg:w-1/3">
                <div className="flex items-center gap-4 text-lg capitalize">
                  <p>{item.category}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <h2 className="mt-2 text-base font-light">{item.title}</h2>
              </div>

              {/* AMOUNT (Center) */}
              <div className="lg:w-1/3 flex justify-center">
                <p className="flex items-center gap-2 text-lg font-semibold text-red-500">
                  <span className="font-bold text-2xl">-</span>
                  {item.amount}
                </p>
              </div>

              {/* BUTTONS (Right side) */}
              <div className="flex gap-4 justify-end lg:w-1/3">
                <button className="cursor-pointer hover:text-green-500 transition-all duration-300 hover:scale-110"
				
			onClick={()=>{
				setUpdate(true)	
					setExpenseAside(true)}
				}
				>
                  Update
                </button>
                <button className="cursor-pointer hover:text-red-500 transition-all duration-300 hover:scale-110">
                  Delete
                </button>
              </div>
            </div>
          </div>)
			}
         
})}


<AsideForm setExpenseAside={setExpenseAside} expenseAside={expenseAside}  update={update}/>
    </div>
  );
}

export default ExpenseHistory;

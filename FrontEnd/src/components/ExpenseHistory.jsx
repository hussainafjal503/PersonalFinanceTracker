import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenseData, DeleteHandler } from "../redux/expenseSlice";
import AsideForm from "./AsideForm";
import { useLocation } from "react-router-dom"; 
import Swal from "sweetalert2";

function ExpenseHistory() {
  const [expenseAside, setExpenseAside] = useState(false);
  const [update, setUpdate] = useState(false);
  const[updateId,setUpdateId]=useState(null);


  const { data, expenseMessage,response } = useSelector((state) => state.expense);
  const { userData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (userData?._id) {
      dispatch(getAllExpenseData(userData._id));
    }
  }, [dispatch, userData?._id,response]);

  useEffect(() => {
    if (expenseMessage) {
      Swal.fire({
        title: expenseMessage,
        icon: "success",
      });
    }
  }, [expenseMessage,response,]);

  const handleDelete = (id) => {
    if (!userData?._id) return;

    // ✅ Dispatch delete action
    dispatch(DeleteHandler({ id, userId: userData._id }))
      .unwrap()
      .then(() => {
        // ✅ Re-fetch expenses after delete
        dispatch(getAllExpenseData(userData._id));
      })
      .catch((err) => {
        Swal.fire({
          title: "Delete failed!",
          text: err?.message || "Something went wrong",
          icon: "error",
        });
      });
  };

  return (
    <div className="pt-25 bg-zinc-700 w-full min-h-screen flex flex-col gap-4 text-white font-semibold px-4 sm:px-8 md:px-12 lg:px-20 overflow-auto overflow-x-hidden">
      {data &&
        data
          .filter(
            (item) =>
              (item.status === "spend" && location.pathname === "/your-expenses") ||
              (item.status === "earned" && location.pathname === "/your-income")
          )
          .map((item, index) => (
            <div
              key={item._id}
              className="shadow-sm shadow-gray-600 rounded-md hover:bg-zinc-800 transition-all duration-300 px-4 sm:px-6 py-3"
            >
              {/* -------------------- Mobile Layout -------------------- */}
              <div className="flex flex-col gap-3 lg:hidden">
                <div className="flex justify-between items-center">
                  <p className="capitalize text-base font-semibold">{item.category}</p>
                  <p
                    className={`font-bold text-lg flex items-center gap-1 ${
                      item.status === "spend" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    <span>{item.status === "spend" ? "-" : "+"}</span> {item.amount}
                  </p>
                </div>
                <p className="text-gray-400 text-sm">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <h2 className="text-sm sm:text-base font-light">{item.title}</h2>
                <div className="flex gap-6 justify-center">
                  <button
                    className="cursor-pointer hover:text-green-500 transition-all duration-300 hover:scale-110"
                    onClick={() => {
                      setUpdate(true);
                      setExpenseAside(true);
                      setUpdateId(item._id)

                      
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="cursor-pointer hover:text-red-500 transition-all duration-300 hover:scale-110"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* -------------------- Desktop Layout -------------------- */}
              <div className="hidden lg:flex flex-row items-center justify-between gap-4">
                <div className="flex flex-col lg:w-1/3">
                  <div className="flex items-center gap-4 text-lg capitalize">
                    <p>{item.category}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <h2 className="mt-2 text-base font-light">{item.title}</h2>
                </div>
                <div className="lg:w-1/3 flex justify-center">
                  <p
                    className={`flex items-center gap-2 text-lg font-semibold ${
                      item.status === "spend" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    <span className="font-bold text-2xl">
                      {item.status === "spend" ? "-" : "+"}
                    </span>
                    {item.amount}
                  </p>
                </div>
                <div className="flex gap-4 justify-end lg:w-1/3">
                  <button
                    className="cursor-pointer hover:text-green-500 transition-all duration-300 hover:scale-110"
                    onClick={() => {
                      setUpdate(true);
                      setExpenseAside(true);
                       setUpdateId(item._id)
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="cursor-pointer hover:text-red-500 transition-all duration-300 hover:scale-110"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      <AsideForm setExpenseAside={setExpenseAside} expenseAside={expenseAside} update={update}  setUpdate={setUpdate} updateId={updateId} setUpdateId={setUpdateId}/>
    </div>
  );
}

export default ExpenseHistory;

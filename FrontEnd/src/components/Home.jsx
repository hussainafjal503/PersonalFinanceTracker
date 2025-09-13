import React, { useEffect, useState } from "react";
import emoji from "../assets/emoji.png";
import { NavLink, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import AsideForm from "../components/AsideForm";

import { createUser } from "../redux/userSlice";
import { getAllExpenseData } from "../redux/expenseSlice";

function Home() {
  const menu = [
    {
      title: "Your Income",
      path: "/your-income",
    },
    {
      title: "Your Expenses",
      path: "/your-expenses",
    },
  ];

  const initalData = {
    name: "",
    email: "",
  };

  const [formData, setFormData] = useState(initalData);

  const [expenseAside, setExpenseAside] = useState(null);
  const [menuButton, setMenuButton] = useState(true);
  const [checkCurrentAmount, setCheckCurrentAmount] = useState(false);

  const dispatch = useDispatch();

  const { name, loading, message, status, userData } = useSelector(
    (state) => state.auth
  );
  const { expenseMessage, spendAmount, earnedAmount } = useSelector(
    (state) => state.expense
  );
  const inputHandler = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      Swal.fire({
        title: "Fields are Required",
        icon: "warning",
      });
      return;
    } else if (!formData.email.includes("@")) {
      Swal.fire({
        title: "Invalid Email",
        icon: "warning",
      });
      return;
    }

    dispatch(createUser(formData));
    setFormData(initalData);
  };

  useEffect(() => {
    console.log(message || expenseMessage);
    if (message || expenseMessage) {
      Swal.fire({
        title: message || expenseMessage,
        icon: "success",
      });
    }
  }, [message, expenseMessage]);
  console.log(userData);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setMenuButton(true);
    }
    dispatch(getAllExpenseData(userData?._id));
  }, [dispatch]);

  return (
    <div className="max-w-screen max-h-screen h-[900px] bg-zinc-700 ">
      <nav className=" w-full bg-zinc-900 md:py-1 px-10 flex flex-row justify-between items-center fixed top-0 left-0 z-10 py-4">
        <div className="flex flex-row gap-4 text-white font-bold items-center">
          <div className="">
            <img
              src={emoji}
              alt=""
              className="w-18 h-18 rounded-full md:block hidden"
            />
            <button
              onClick={() => setMenuButton(!menuButton)}
              className="hover:scale-90 transition-all duration-300 cursor-pointer text-white font-bold text-lg md:hidden"
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>
          <p className="capitalize"> {name ? ` Hi!   ${name}` : ""}</p>
        </div>

        <div className="font-bold text-lg text-white flex gap-4 ">
          <button
            onClick={() => {
              if (!status) {
                Swal.fire({
                  title: "Please Enter Your Details",
                  icon: "warning",
                });
                returnl;
              }

              setExpenseAside("income");
            }}
            className="hover:scale-90 cursor-pointer bg-[#556B2F] rounded-md px-2 w-fit transition-all duration-300 py-1 hover:bg-[#405e0e]"
          >
            <span className="md:inline-blockblock hidden">Add</span>
            <span>Income</span>
          </button>

          <button
            onClick={() => {
              if (!status) {
                Swal.fire({
                  title: "Please Enter Your Details",
                  icon: "warning",
                });
                return;
              }

              setExpenseAside("expense");
            }}
            className="hover:scale-90 cursor-pointer bg-[#EF7722] rounded-md px-2 w-fit transition-all duration-300 py-1 hover:bg-[#a64c0b]"
          >
            <span className="md:inline-blockblock hidden">Add</span>
            <span>Expenses</span>
          </button>
        </div>
      </nav>

      <div className="max-w-screeen  relative">
        {/* menu sidebar */}
        <div className="flex flex-col md:flex-row gap-2">
          <div
            style={{
              top: menuButton ? "0px" : "-700px",
            }}
            className={`absolute md:relative md:h-screen h-fit bg-zinc-800 w-full md:w-[250px] pt-25 flex flex-col gap-2 md:pb-2 pb-6 transition-all duration-400  `}
          >
            <div className="flex justify-center px-6 ">
              <div
                onClick={() => setCheckCurrentAmount(!checkCurrentAmount)}
                className="cursor-pointer md:w-30 md:h-30 h-fit w-fit px-6 py-2 shadow-md md:rounded-full bg-zinc- shadow-zinc-600 text-green-600 flex md:flex-col gap-2 justify-center items-center"
              >
                <p className="font-bold text-md text-center">
                  {checkCurrentAmount ? "Current Amount" : "Total Earned"}
                </p>
                <p>
                  ₹ {checkCurrentAmount ? userData?.TotalAmmount : earnedAmount}
                </p>
              </div>
            </div>
            {menu.map((item, index) => (
              <NavLink key={index} to={item.path}>
                <button className="hover:bg-zinc-950 font-bold transition-all duration-300 cursor-pointer text-white py-4 w-full px-8">
                  {item.title}
                </button>
              </NavLink>
            ))}

            <div className="flex justify-center">
              <div className="md:w-30 md:h-30 h-fit w-fit px-6 py-2 shadow-md md:rounded-full bg-zinc- shadow-zinc-600 text-red-600 flex md:flex-col gap-2 justify-center items-center">
                <p className="font-bold text-md text-center">Total Spend</p>
                <p>₹ {spendAmount}</p>
              </div>
            </div>

            <div className="font-semibold md:flex flex-col  hidden gap-4 text-center text-gray-400 mt-15">
              <p>Keep Tracking</p>
              <p>Thank You !!</p>
            </div>
          </div>

          <div className="w-full overflow-auto h-screen pb-6">
            <Outlet />
          </div>
        </div>

        {/* form for expense details */}

        <AsideForm
          setExpenseAside={setExpenseAside}
          expenseAside={expenseAside}
        />
        {/* Email and name detail form */}

        {!status && (
          <div className="w-full md:w-fit absolute top-[48%] md:top-[30%] md:left-[40%] bg-zinc-700 shadow-sm shadow-gray-600 px-6 py-4 md:py-20 md:px-25 rounded-md text-white">
            <form
              action=""
              className="bg-zinc-700 flex flex-col gap-6"
              onSubmit={formSubmitHandler}
            >
              <div className="flex flex-row gap-6">
                <div className="flex flex-col gap-6 items-center">
                  <label htmlFor="name" className="py-2">
                    Name
                  </label>
                  <label htmlFor="email" className="py-2">
                    Email
                  </label>
                </div>

                <div className="flex flex-col gap-6 items-center">
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name"
                    name="name"
                    className="rounded-md border border-gray-400 py-2 px-6 outline-none"
                    value={formData.name}
                    onChange={inputHandler}
                  />

                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Your Name"
                    name="email"
                    className="rounded-md border border-gray-400 py-2 px-6 outline-none"
                    value={formData.email}
                    onChange={inputHandler}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-fit ml-auto px-6 py-2 font-semibold text-white bg-zinc-900 hover:scale-90 transition-all duration-300  rounded-md hover:bg-zinc-800 cursor-pointer"
                disabled={loading}
              >
                {loading ? "loading.." : "Submit"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

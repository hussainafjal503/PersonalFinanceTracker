import React, { useEffect, useState } from "react";
import emoji from "../assets/emoji.png";
import { NavLink, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { createUser } from "../redux/userSlice";

function Home() {
  const menu = [
    {
      title: "Your Expenses",
      path: "/your-expenses",
    },
    {
      title: "Your Income",
      path: "/your-income",
    },
  ];

  const initalData = {
    name: "",
    email: "",
  };

  const [formData, setFormData] = useState(initalData);
  const dispatch = useDispatch();
  const { name, loading, message, status } = useSelector((state) => state.auth);

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
    } else if (!formData.email.includes("@")) {
      Swal.fire({
        title: "Invalid Email",
        icon: "warning",
      });
    }

    dispatch(createUser(formData));
    setFormData(initalData);
  };

  useEffect(() => {
    if (message) {
      Swal.fire({
        title: message,
        icon: "success",
      });
    }
  }, [message]);

  console.log(name, status);

  return (
    <div className="max-w-screen max-h-[900px] bg-zinc-700 relative">
      <nav className=" w-full bg-zinc-900 py-1 px-10 flex flex-row justify-between items-center fixed top-0 left-0 ">
        <div className="flex flex-row gap-4 text-white font-bold items-center">
          <img src={emoji} alt="" className="w-18 h-18 rounded-full" />
          <p>{name ? ` Hi!   ${name}` : ""}</p>
        </div>

        <div className="font-bold text-lg text-white flex gap-4 ">
          <button className="hover:scale-90 cursor-pointer bg-[#556B2F] rounded-md px-2 w-fit transition-all duration-300 py-1 hover:bg-[#405e0e]">
            Add Income
          </button>

          <button className="hover:scale-90 cursor-pointer bg-[#EF7722] rounded-md px-2 w-fit transition-all duration-300 py-1 hover:bg-[#a64c0b]">
            Add Expense
          </button>
        </div>
      </nav>

      {/* menu sidebar */}
      <div className="flex flex-row gap-0">
        <div className="h-screen bg-zinc-800 w-[250px] pt-25 flex flex-col gap-2 ">
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full bg-white flex flex-col gap-2 justify-center items-center">
              <p className="font-bold text-2xl">₹</p>
              <p>Amount</p>
            </div>
          </div>
          {menu.map((item, index) => (
            <NavLink key={index} to={item.path}>
              <button className="hover:bg-zinc-950 font-bold transition-all duration-300 cursor-pointer text-white py-4 w-full px-8">
                {item.title}
              </button>
            </NavLink>
          ))}

          <div className="font-semibold flex flex-col gap-4 text-center text-gray-400 mt-45">
            <p>Keep Tracking</p>
            <p>Thank You !!</p>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>

      {/* Email and name detail form */}

      {!status && (
        <div className=" absolute top-[30%] left-[40%] bg-zinc-700 shadow-sm shadow-gray-600 py-20 px-25 rounded-md text-white">
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
              className="font-semibold text-white bg-zinc-900 hover:scale-90 transition-all duration-300 py-1 rounded-md hover:bg-zinc-800 cursor-pointer"
              disabled={loading}
            >
              {loading ? "loading.." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;

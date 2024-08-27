import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdTaskAlt,
  MdSettings,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import Logo from '../assets/erplogo.png';


const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  // Team and Trash links will be conditionally rendered
];

const NavLink = ({ el, path, closeSidebar }) => (
  <Link
    to={el.link}
    onClick={closeSidebar}
    className={clsx(
      "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
      path === el.link ? "bg-blue-700 text-neutral-100" : ""
    )}
  >
    {el.icon}
    <span className="hover:text-[#2564ed]">{el.label}</span>
  </Link>
);

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = linkData;

  // Conditionally add Team and Trash links
  if (!user) {
    sidebarLinks.push(
      {
        label: "Team",
        link: "team",
        icon: <FaUsers />,
      },
      {
        label: "Trash",
        link: "trashed",
        icon: <FaTrashAlt />,
      }
    );
  }

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
     <h1 className="flex gap-1 items-center">
    <p className=" p-2 rounded-full">
      <img src={Logo} alt="Logo" className="w-15 h-12 rounded-full" /> 
    </p>
    <span className="text-2xl font-bold text-black">System</span>
  </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink
            el={link}
            key={link.label}
            path={path}
            closeSidebar={closeSidebar}
          />
        ))}
      </div>

      <div className="">
        <button
          onClick={closeSidebar}
          className="w-full flex gap-2 p-2 items-center text-lg text-gray-800 hover:bg-[#2564ed2d] rounded-full"
        >
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

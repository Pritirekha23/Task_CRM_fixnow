import React, { useState } from "react";
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
    label: "Inventory",
    link: "#",
    icon: <FaTasks />,
    subLinks: [
      { label: "Product", link: "inventory/product" },
      { label: "Shortage Products", link: "inventory/shortage-products" }
    ]
  },
  {
    label: "Purchase",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "Sales",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Accounts",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Report",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "POS",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const NavLink = ({ el, path, closeSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => setIsOpen(!isOpen);

  if (el.subLinks) {
    return (
      <div className="relative">
        <button
          onClick={handleDropdownToggle}
          className={clsx(
            "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-white text-base hover:bg-[#475fe7]",
            path === el.link ? "bg-blue-700 text-neutral-100" : ""
          )}
        >
          {el.icon}
          <span className="flex-1">{el.label}</span>
          <span className={`ml-auto ${isOpen ? "rotate-180" : ""}`}>▼</span>
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-lg">
            {el.subLinks.map((subLink) => (
              <Link
                key={subLink.label}
                to={subLink.link}
                onClick={closeSidebar}
                className={clsx(
                  "block px-4 py-2 text-white text-base hover:bg-[#475fe7]",
                  path === subLink.link ? "bg-blue-700 text-neutral-100" : ""
                )}
              >
                {subLink.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={el.link}
      onClick={closeSidebar}
      className={clsx(
        "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-white text-base hover:bg-[#475fe7]",
        path === el.link ? "bg-blue-700 text-neutral-100" : ""
      )}
    >
      {el.icon}
      <span className="hover:text-gray-300">{el.label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = linkData;

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5" style={{ backgroundColor: "#1E201E" }}>
      <h1 className="flex gap-1 items-center">
        <p className="p-2 rounded-full">
          <img src={Logo} alt="Logo" className="w-15 h-12 rounded-full" />
        </p>
        <span className="text-2xl font-bold text-white">System</span>
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
          className="w-full flex gap-2 p-2 items-center text-lg text-white hover:bg-[rgba(37,100,237,0.18)] hover:text-gray-300 rounded-full"
        >
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

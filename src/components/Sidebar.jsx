import React from "react"
import {
  FaHome,
  FaCog,
  FaBox,
  FaShoppingCart,
  FaSignOutAlt,
  FaTable,
  FaTruck,
  FaUsers,
} from "react-icons/fa"
import { NavLink } from "react-router"

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />, isParent: true},
    { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable />, isParent: false},
    { name: "Products", path: "/admin-dashboard/products", icon: <FaBox />, isParent: false},
    { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck />, isParent: false},
    { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart />, isParent: false},
    { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers />, isParent: false},
    { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog />, isParent: false},
    { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt />, isParent: false},
  ]

  return (
    <div className="flex flex-col h-screen bg-black text-white w-16 md:w-64 fixed shadow-lg">
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <span className="hidden md:block text-xl font-bold">Inventory MS</span>
        <span className="md:hidden text-xl font-bold">IMS</span>
      </div>

      {/* Menu */}
      <ul className="space-y-1 p-3">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
            end={item.isParent}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg transition duration-200 
                hover:bg-gray-700 
                ${isActive ? "bg-gray-700 text-white" : "text-gray-300"}`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="ml-4 hidden md:block">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

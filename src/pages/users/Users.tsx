import React, { useState, useEffect } from "react";
import axios from "axios";

// Yangilangan User interfeysi
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // User array state

  useEffect(() => {
    // Ma'lumotlarni olish
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:3000/users"); // URLni to'g'rilash
        setUsers(response.data); // Ma'lumotlarni holatda saqlash
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Funksiyani chaqirish
  }, []); // Komponent bir marta render bo'lganda chaqiriladi

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Users</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">First Name</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Last Name</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Email</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Username</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Password</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Phone</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-300">
              <td className="py-2 px-4">{user.firstName}</td>
              <td className="py-2 px-4">{user.lastName}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.password}</td>
              <td className="py-2 px-4">{user.phone}</td>
              <td className="py-2 px-4 flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

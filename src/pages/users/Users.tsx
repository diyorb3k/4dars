import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  additionalInfo?: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    additionalInfo: "",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv so'zini saqlash

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        additionalInfo: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  const handleEditUser = async () => {
    if (editingUser) {
      try {
        const response = await axios.put(
          `http://localhost:3000/users/${editingUser.id}`,
          editingUser
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editingUser.id ? response.data : user
          )
        );
        setEditingUser(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error editing user:", error);
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) 
   
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Users</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <button
        onClick={() => {
          setIsModalOpen(true);
          setEditingUser(null);
        }}
        className="bg-green-500 text-white px-3 py-2 rounded mb-4 hover:bg-green-600 transition"
      >
        Add User
      </button>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">First Name</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Last Name</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Email</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Username</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Password</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Phone</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Bunga ham</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t border-gray-300">
              <td className="py-2 px-4">{user.firstName}</td>
              <td className="py-2 px-4">{user.lastName}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.password}</td>
              <td className="py-2 px-4">{user.phone}</td>
              <td className="py-2 px-4">{user.additionalInfo}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setEditingUser(user);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingUser ? handleEditUser() : handleAddUser();
              }}
            >
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={editingUser ? editingUser.firstName : newUser.firstName}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={editingUser ? editingUser.lastName : newUser.lastName}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={editingUser ? editingUser.email : newUser.email}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={editingUser ? editingUser.username : newUser.username}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={editingUser ? editingUser.password : newUser.password}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={editingUser ? editingUser.phone : newUser.phone}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="text"
                name="additionalInfo"
                placeholder="Additional Info"
                value={editingUser ? editingUser.additionalInfo : newUser.additionalInfo} // Yangi input maydoni uchun
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

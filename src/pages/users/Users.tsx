import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get<User[]>('http://localhost:3000/User');
        setUsers(response.data); // Ma'lumotlarni holatda saqlash
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Funksiyani chaqirish
  }, []); // Komponent bir marta render bo'lganda chaqiriladi

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email} ({user.phone})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

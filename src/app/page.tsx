"use client";

import React, { useEffect, useState } from "react";
import Content from "./components/content";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_num: number;
}

interface ApiResponse {
  users: User[];
  numUsers: any;
}

const Home: React.FC = () => {
  //States
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [refresh, setRefresh] = useState(false); //used to refresh page after changes have been made

  //fetches the specified users from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setRefresh(false);

        const url = `/api/?currentPage=${currentPage}`;
        
        const response = await fetch(url, { method: "GET" });
        
        const data = await response.json() as ApiResponse;
        setUsers(data.users);
        setTotalUsers(data.numUsers[0].numUsers);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, refresh]);

  return (
    <div className="bg-gray-200 h-svh flex flex-col items-center justify-center">
      <h1 className="text-black text-5xl font-bold mb-4">User List</h1>

      {/* pass props to the content component */}
      <Content
        users={users}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalUsers={totalUsers}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Home;
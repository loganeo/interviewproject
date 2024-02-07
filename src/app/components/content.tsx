import React, { useState } from "react";
import UserForm from "./userForm";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_num: number;
}

interface ContentProps {
  users: User[] | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalUsers: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const USERS_PER_PAGE = 20;

const Content: React.FC<ContentProps> = ({
  users,
  currentPage,
  setCurrentPage,
  totalUsers,
  setRefresh,
}) => {

  //States
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
  const [ifVisible, setIfVisible] = useState(false); //User form visibility

  //handles the pagination previous button
  const handlePreviousPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    setSelectedUser(null); // close the menu when changing pages
  };

  //handles the pagination next button
  const handleNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
    setSelectedUser(null); // close the menu when changing pages
  };

  //handles the pagination numbers being clicked
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectedUser(null);
  };

  //handles a user list user being selected
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIfVisible(true);
  };

  //handles the user list add button
  const handleAddButtonClicked = () => {
    setIfVisible(true);
    setSelectedUser(null);
  };

  //handles the user form close button
  const handleCloseButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIfVisible(false);
    event.stopPropagation();
    setSelectedUser(null); // close the menu when the close button is clicked
  };

  return (
    <div className="bg-gray-100 p-4 w-1/2 h-4/5 flex flex-col">
      <div className="justify-center flex-grow">
        {/* User List */}
        <table className="mx-auto max-w-3/5 w-full relative mb-5">
          <thead>
            <tr>
              <th className="text-black px-2 py-1" style={{ width: '35%', textAlign: 'left'  }}>Name</th>
              <th className="text-black px-2 py-1" style={{ width: '45%', textAlign: 'left'  }}>Email</th>
              <th className="text-black px-2 py-1" style={{ width: '20%', textAlign: 'left'  }}>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className={`${
                    index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                  } text-black cursor-pointer`}
                >
                  <td className="px-2 py-0.5">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-2 py-0.5">{user.email}</td>
                  <td className="px-2 py-0.5">{user.phone_num}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* User Form */}
        {ifVisible && (
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="relative flex flex-col items-center space-y-2 bg-white z-10">
              <button
                onClick={handleCloseButtonClick}
                className="text-gray-500 hover:text-gray-700 px-2 py-1 absolute top-0 right-0"
              >
                X
              </button>
              <UserForm
                userSelected={selectedUser}
                setRefresh={setRefresh}
                setVisible={setIfVisible}
              />
            </div>
          </div>
        )}
      </div>
      <div className="relative mt-auto flex justify-center">

        {/* Add User button */}
        <button
          onClick={handleAddButtonClicked}
          className="absolute bottom-0 left-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Add User
        </button>

        {/* Pagination */}
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 text-black rounded-md"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageClick(i + 1)}
            className={`mx-1 px-3 py-2 ${
              currentPage === i + 1
                ? "bg-blue-500 text-black"
                : "bg-gray-200 text-black"
            } rounded-md`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="ml-2 px-4 py-2 text-black rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Content;

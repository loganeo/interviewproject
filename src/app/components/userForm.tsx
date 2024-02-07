import React, { useState, useEffect } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_num: number;
}

interface ContentProps {
  userSelected: User | null;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserForm: React.FC<ContentProps> = ({ userSelected, setRefresh, setVisible }) => {
  //States
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [editedFirstName, setEditedFirstName] = useState<string>("");
  const [editedLastName, setEditedLastName] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");
  const [editedPhoneNum, setEditedPhoneNum] = useState<number | null>(null);

  //select user vs add user
  useEffect(() => {
    if (userSelected) {
      setSelectedUser(userSelected);
      setEditedUser(userSelected);
      setEditedFirstName(userSelected.first_name);
      setEditedLastName(userSelected.last_name);
      setEditedEmail(userSelected.email);
      setEditedPhoneNum(userSelected.phone_num);
    } else {
      // If userSelected is null, set all fields to null or empty
      setSelectedUser(null);
      setEditedUser(null);
      setEditedFirstName("");
      setEditedLastName("");
      setEditedEmail("");
      setEditedPhoneNum(null);
    }
  }, [userSelected]);

  //handles save changes button
  const handleEditButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
 
      event.stopPropagation();
      const requestBody = {
        first_name: editedFirstName,
        last_name: editedLastName,
        email: editedEmail,
        phone_num: editedPhoneNum,
        id: editedUser?.id,
      };

      //format and send api request
      const response = await fetch("api/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.error(error);
    }

    //rerender page and hide userform
    setRefresh(true);
    setVisible(false);
  };

  //handles delete button
  const handleDeleteButtonClick = async () => {
    try {
      //display confirmation dialog
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );

      //user canceled the deletion
      if (!isConfirmed) {
        return;
      }

      //format and send api request
      const requestBody = {
        id: editedUser?.id,
      };
 
      const response = await fetch("api/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        //deletion unsuccessful
        console.error("Error deleting user:", response.statusText);
      }

      //rerender page and hide user form
      setVisible(false);
      setRefresh(true);
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  //handles the add user button
  const handleAddButtonClicked = async () => {
    try {
      //formats and sends api request
      const requestBody = {
        first_name: editedFirstName,
        last_name: editedLastName,
        email: editedEmail,
        phone_num: editedPhoneNum,
      };

      const response = await fetch("api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.error(error);
    }

    setVisible(false);
    setRefresh(true);
    setSelectedUser(null);
  };

  return (
    <div>
      {/* User Form */}
      <div className="bg-white p-4 rounded-md">
        <div className="flex flex-col mb-2">
          <label className="mr-2 text-black">First Name:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded-md text-black"
            value={editedFirstName}
            onChange={(e) => setEditedFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="mr-2 text-black">Last Name:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded-md text-black"
            value={editedLastName}
            onChange={(e) => setEditedLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="mr-2 text-black">Email:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded-md text-black"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="mr-2 text-black">Phone Number:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded-md text-black"
            value={editedPhoneNum || ""}
            onChange={(e) => setEditedPhoneNum(Number(e.target.value) || null)}
          />
        </div>
        {/*checks if user is being edited or added */}
        {userSelected ? (
          <div className="flex mt-2">
            <button
              onClick={handleEditButtonClick}
              className="bg-blue-500 text-black px-2 py-1 rounded-md mr-2"
            >
              Save Changes
            </button>
            <button
              onClick={handleDeleteButtonClick}
              className="bg-blue-500 text-black px-2 py-1 rounded-md"
            >
              Delete User
            </button>
          </div>
        ) : 
        <div className="flex mt-2">
            <button
              onClick={handleAddButtonClicked}
              className="bg-blue-500 text-black px-2 py-1 rounded-md"
            >
              Add User
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default UserForm;
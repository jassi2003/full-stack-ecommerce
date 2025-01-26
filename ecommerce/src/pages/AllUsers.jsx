import React, { useState, useEffect } from 'react';
import summaryApi from '../common/Index';
import moment from 'moment';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [editRole, setEditRole] = useState(false);
  const[updateUserDetails,setUpdateUserDetails]=useState({
      email:"",
      name:"",
      role:"",
      _id:""
})

  const fetchAllUsers = async () => {
    const fetchData = await fetch(summaryApi.allUser.url, {
      method: summaryApi.allUser.method,
      credentials: 'include',
    });
    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      {/* Table */}
      <div className="bg-white">
        <table className="w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-500 font-semibold">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Sr No.</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {allUsers.map((el, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{el?.name}</td>
                <td className="border border-gray-300 px-4 py-2">{el?.email}</td>
                <td className="border border-gray-300 px-4 py-2">{el?.role || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{moment(el?.createdAt).format('ll') || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2 ">
                  <button
                    className="text-lg bg-green-100 hover:bg-green-500 p-4 rounded-full"
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setEditRole(true)}}
                      >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal and Background Blur */}
      {editRole && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-10 z-70">
          <ChangeUserRole onClose={() => setEditRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
          />
        </div>
      )}
    </div>
  );
};

export default AllUsers;

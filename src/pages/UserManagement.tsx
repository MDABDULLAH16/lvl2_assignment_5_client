/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/api/baseApi";

const UserManagement = () => {
  const { data: allUsers, isLoading, isError } = useGetAllUserQuery(undefined);
  const [updateUser] = useUpdateUserMutation(); // Mutation to update user roles
  const [selectedUser, setSelectedUser] = useState<any>(null);

  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Loading users...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-lg text-red-500">
        Error fetching users. Please try again later.
      </p>
    );
  }

  const handleEditRole = (user: any) => {
    setSelectedUser(user);
  };

  const closeEditRoleModal = () => {
    setSelectedUser(null);
  };

  const handleRoleUpdate = async () => {
    const payload = {
      _id: selectedUser._id,
      data: { role: selectedUser.role },
    };

    await updateUser(payload).unwrap();
  };
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.data.map((user: any, index: number) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditRole(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Roles */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Role</h2>
            <p className="mb-4">
              Update the role for <strong>{selectedUser.name}</strong>.
            </p>
            <form onSubmit={handleRoleUpdate} className="space-y-4">
              <div>
                <label className="block font-medium">Role:</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={closeEditRoleModal}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

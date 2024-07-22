import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsersAction } from "../redux/users/users.actions";

import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "email",
    headerName: "Email",
    width: 270,
  },
  {
    field: "username",
    headerName: "Username",
    width: 160,
  },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
];

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersAction(() => console.log("error")));
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <DataGrid
        style={{ backgroundColor: 'rgb(255, 200, 200, 0.8)' }}
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          sorting: { sortModel: [{ field: "id", sort: "asc" }] }
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
};

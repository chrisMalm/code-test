import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../store/users/usersSlice";
import { Box } from "@mui/material";

const UserList = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error}</Box>;
  return (
    <Box className="pb-8">
      <h2 className="pb-4">
        GET user from db postgres with redux createAsyncThunk :
      </h2>
      {list.map((user, index) => (
        <Box key={user.id}>
          <span className="pr-2">{index + 1}.</span>
          {user.name}
        </Box>
      ))}
    </Box>
  );
};

export default UserList;

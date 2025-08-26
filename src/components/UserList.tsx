import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../store/users/usersSlice";

const UserList = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="wrapper-userlist">
      <h2 className="get-title">
        GET user from db postgres with redux createAsyncThunk
      </h2>
      {list.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default UserList;

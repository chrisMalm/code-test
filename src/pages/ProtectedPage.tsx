import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProtectedData } from "../store/protected/protectedSlice";
import { useNavigate } from "react-router-dom";

const ProtectedPage = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.protected);

  useEffect(() => {
    dispatch(fetchProtectedData());
  }, [dispatch]);

  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Logga in</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Protected Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProtectedPage;

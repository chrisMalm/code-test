import { Box } from "@mui/material";
import Counter from "../components/Counter";
import UserList from "../components/UserList";

const Home = () => {
  return (
    <Box>
      <UserList />
      <Counter />
    </Box>
  );
};

export default Home;

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/login/loginSlice";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  type LoginInputs = {
    email: string;
    password: string;
  };

  const loginUserSchema = z.object({
    email: z.string().email({ message: "Invalid Emal address" }),
    password: z
      .string()
      .min(6, { message: "Password needs to be atleast 6 letters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
  });

  type LoginUserFomData = z.infer<typeof loginUserSchema>;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.login);

  const [open, setOpen] = useState<boolean>(false);
  const [ErrorMsg, setErrorMsg] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUserFomData>({
    resolver: zodResolver(loginUserSchema),
  });
  // Om valideringen misslyckas så körs inte din onSubmit-funktion alls
  // och lägger in felen i formState.errors istället.
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        reset();
        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMsg(""); // reset error message
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={ErrorMsg || `Welocome back ${user?.name}`}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
          gap: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ paddingTop: "0.5rem" }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Sign-in
          </Button>
        </Box>
        <Box sx={{ width: "50%", textAlign: "end" }}>
          Dont have any account? <Link to="/signup">Signup</Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;

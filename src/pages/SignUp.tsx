import { Box, Button, Snackbar, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signUpUser } from "../store/singup/signupSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  type Inputs = {
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    address: string;
  };
  //  dispatch är för attt uppdatera redux state
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // useAppSelector används för att häng a data från redux state
  const { error, loading, user } = useAppSelector((state) => state.signup);
  const [open, setOpen] = useState(false);

  const UserSchema = z
    .object({
      name: z.string().min(1, "Name is required"),
      address: z.string().min(1, "Address is required"),
      email: z.string().email({ message: "Invalid email address" }),
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
      repeatPassword: z.string(),
    })
    // refine tar zod objectet och här jämförs password med reapeat password
    .refine((data) => data.password === data.repeatPassword, {
      // path: Om lösenorden inte matchar, lägg felet på det fält som heter repeatPassword i controller
      path: ["repeatPassword"],
      message: "Passwords do not match",
    });

  type UserFormData = z.infer<typeof UserSchema>;
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UserFormData>({ resolver: zodResolver(UserSchema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Är samma som att filtrera ut repeatPassword och lägga in resten i ett nytt objekt
    const { repeatPassword, ...userData } = data;

    dispatch(signUpUser(userData))
      .unwrap()
      .then((res) => {
        setOpen(true);
        reset();
        navigate("/"); // navigera till home route efter signup
      })
      .catch((err) => {
        console.log(err, "err");
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error || `Welcome Home ${user?.name}`}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* vi använder controller från react-hook-form och textfield från mui  */}
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Address"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
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
          <Controller
            name="repeatPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Repeat password"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;

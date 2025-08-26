import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch } from "../store/hooks";
import { postUser } from "../store/users/usersSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

//Post user to db pg with createasyncThunk with CONTROLLER form with MUI

const ControllerForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [ErrorMsg, setErrorMsg] = useState("");

  type Inputs = {
    name: string;
    email: string;
    address: string;
  };

  const UserSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    address: z.string().min(1, { message: "Address is required" }),
  });

  type UserFormData = z.infer<typeof UserSchema>;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data) {
      dispatch(postUser(data))
        // Jag använder inte redux state här för att kolla
        // om det gick bra utan använder return värdet i unwrap itstället.
        .unwrap()
        .then((res) => {
          console.log("User saved:", res);
          setOpen(true);
          reset();
        })
        .catch((err) => {
          setErrorMsg(err);
          setOpen(true);
          console.error("Failed to save user:", err);
        });
    }
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
        message={ErrorMsg || "User created successfully!"}
      />
      <div className="container-form  border-t-2 border-white ">
        <h2 className="text-lg font-bold mt-4">
          Post user to DB using Redux, createAsyncThunk, React Hook Form, and
          Zod validation
        </h2>
        <p>
          This form uses <strong>React Hook Form's Controller</strong> to
          integrate smoothly with third-party UI libraries like MUI. Controller
          is recommended over <code>register</code> when working with components
          that don't expose a native <code>ref</code>.
        </p>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ maxWidth: 400, mx: "auto" }}
        >
          {/* name - med controller */}
          {/* controller från react-forms med mui componeter   */}
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

          {/* email - med Controller */}
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

          {/* address - med controller */}
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

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit controller form
          </Button>
        </Box>
      </div>
    </>
  );
};

export default ControllerForm;

import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../store/hooks";
import { postUser } from "../store/users/usersSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//Post user to db pg with createasyncThunk with REGISTER form

const UserForm = () => {
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data) {
      dispatch(postUser(data));
      // här skulle ja kunna använda unwrap för att kolla på
      // värdet ja får tillbaka ifrån Backend
      // skulle kunna användas till en snackbar/toast
      // för att visa om posten går igenom ex
    }
  };
  return (
    <div className="container-form">
      <h2>
        POST user to db with redux createAsyncThunk and react hook form and zod
        for validation with ...register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        {/* register() har direkt tillgång till DOM-elementet det blir som en use ref   */}
        <input placeholder="name" {...register("name")} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <label htmlFor="email">email</label>
        <input placeholder="email" {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <label htmlFor="address">Adress</label>
        <input placeholder="address" {...register("address")} />
        {errors.address && (
          <p style={{ color: "red" }}>{errors.address.message}</p>
        )}

        <input type="submit" value="Submit med register " />
      </form>
    </div>
  );
};

export default UserForm;

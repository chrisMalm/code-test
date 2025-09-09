// import { useForm, SubmitHandler } from "react-hook-form";
// import { useAppDispatch } from "../store/hooks";
// import { postUser } from "../store/users/usersSlice";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Box } from "@mui/material";

// //Post user to db pg with createasyncThunk with REGISTER form

// const UserForm = () => {
//   type Inputs = {
//     name: string;
//     email: string;
//     address: string;
//   };

//   const UserSchema = z.object({
//     name: z.string().min(1, { message: "Name is required" }),
//     email: z.string().email({ message: "Invalid email address" }),
//     address: z.string().min(1, { message: "Address is required" }),
//   });

//   type UserFormData = z.infer<typeof UserSchema>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<UserFormData>({
//     resolver: zodResolver(UserSchema),
//   });

//   const dispatch = useAppDispatch();

//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     if (data) {
//       dispatch(postUser(data));
//       // här skulle ja kunna använda unwrap för att kolla på
//       // värdet ja får tillbaka ifrån Backend
//       // skulle kunna användas till en snackbar/toast
//       // för att visa om posten går igenom ex
//     }
//   };
//   return (
//     <div className="min-h-screen flex  justify-center border-t-2 border-white">
//       <div className="w-full">
//         <h2 className="text-lg font-bold my-4 text-center">
//           POST user to db with redux createAsyncThunk and react hook form and
//           zod
//         </h2>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col  gap-4 pt-8 w-full max-w-md mx-auto"
//         >
//           <label htmlFor="name" className="font-semibold">
//             Name
//           </label>
//           <input
//             placeholder="name"
//             {...register("name")}
//             className="border border-gray-300 rounded p-2"
//           />
//           {errors.name && <p className="text-red-600">{errors.name.message}</p>}

//           <label htmlFor="email" className="font-semibold">
//             Email
//           </label>
//           <input
//             placeholder="email"
//             {...register("email")}
//             className="border border-gray-300 rounded p-2"
//           />
//           {errors.email && (
//             <p className="text-red-600">{errors.email.message}</p>
//           )}

//           <label htmlFor="address" className="font-semibold">
//             Address
//           </label>
//           <input
//             placeholder="address"
//             {...register("address")}
//             className="border border-gray-300 rounded p-2"
//           />
//           {errors.address && (
//             <p className="text-red-600">{errors.address.message}</p>
//           )}

//           <input
//             type="submit"
//             value="Submit med register"
//             className="p-2 rounded cursor-pointer  bg-blue-400"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;
export {};

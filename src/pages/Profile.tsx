import { useAppDispatch, useAppSelector } from "../store/hooks";
import NotFound from "../pages/NotFound";
import { logoutUser } from "../store/logout/logoutSlice";
import ProfileField from "../components/ProfileField";
const Profile = () => {
  const { me, error, loading } = useAppSelector((state) => state.me);
  console.log(me);
  const firstName = me?.name.split(" ")[0].toString()[0].toUpperCase();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        window.location.href = "/";
      });
  };

  if (error) {
    return <NotFound />;
  }
  return (
    <div className="mt-12 relative mx-auto max-w-sm  min-h-[700px] overflow-hidden rounded-3xl bg-gradient-to-t from-white/70 to-transparent">
      {/* inner card */}
      <div className="absolute bottom-0 left-0 right-0  w-full h-[570px] bg-white rounded-t-3xl shadow-[0_-4px_100px_0_rgba(255,255,255,1.8)] ">
        <div className=" relative">
          <div className="font-extrabold text-3xl  bg-profileCard w-32 h-32 border-4 border-white shadow-lg absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center">
            {firstName}
          </div>
        </div>
        <div className=" relative p-8 mt-20  text-gray-800 ">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="space-y-6">
            <ProfileField label="Name" value={me?.name} />
            <ProfileField label="Address" value={me?.address} />
            <ProfileField label="Email" value={me?.email} />
          </div>
        </div>
        <button
          className="font-bold absolute bottom-6 left-8 text-white rounded-sm shadow hover:bg-red-600 transition"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

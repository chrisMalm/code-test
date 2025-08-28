const ProfileField = ({ label, value }: { label: string; value?: string }) => {
  return (
    <div className="text-sm flex flex-col text-center items-center md:flex-row  bg-gray-100 rounded-lg border border-gray-300 w-full px-4 py-1 min-h-[3rem]">
      <span className="font-medium w-24">{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default ProfileField;

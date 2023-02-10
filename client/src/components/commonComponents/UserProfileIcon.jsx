import React from "react";
import { useSelector } from "react-redux";
import profileImg from "../../assets/images/profileImg.jpg";

function UserProfileIcon() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center gap-2 p-[4px] bg-base-300 rounded-xl">
      <div className="avatar">
        <div className="w-12 rounded-xl ">
          <img src={user.avatar ? user.avatar : profileImg} />
        </div>
      </div>
      <div>
        <p className="font-bold text-sm text-slate-500 p-[2px]">{user?.name}</p>
      </div>
    </div>
  );
}

export default UserProfileIcon;

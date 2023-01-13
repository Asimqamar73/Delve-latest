import React from "react";
import { useSelector, useDispatch } from "react-redux";
import profileImg from "../../assets/images/profileImg.jpg";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import InputComponent from "../../components/commonComponents/InputComponent";
import { MdModeEditOutline } from "react-icons/md";
import LoadingIcons from "react-loading-icons";
import { changeAvatar } from "../../services/store/user/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.loading);
  const handleAvatarChange = (event) => {
    const avatarInfo = new FormData();
    avatarInfo.append("avatar", event.target.files[0]);
    dispatch(changeAvatar(avatarInfo));
  };
  return (
    // <div className="grid grid-cols-6 h-full">
    //   <div className="col-span-1 bg-zinc-100 p-4 ">
    //     <p className="text-lg font-bold text-slate-700">Profile</p>
    //     <div>
    //       <ul className="font-semibold text-sm flex flex-col gap-2">
    //         <li>Edit profile</li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div className="grid-cols-5">right</div>
    // </div>
    <div className="m-4">
      <div className="my-4">
        <p className="font-bold text-2xl">Profile</p>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4 shadow-sm shadow-slate-300">
        <div className="col-span-1">
          <div className="relative">
            <div className="avatar">
              <div className="w-full rounded-md">
                <img
                  src={user.avatar ? user.avatar : profileImg}
                  alt="profileImg"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <label htmlFor="avatar" className="hover:cursor-pointer">
                <div className="bg-green-500/50 p-2 rounded-md">
                  {isLoading ? (
                    <LoadingIcons.Puff width={24} height={24} />
                  ) : (
                    <MdModeEditOutline size={24} className="text-white" />
                  )}
                </div>
              </label>
              <InputComponent
                type="file"
                id="avatar"
                name="avatar"
                className="hidden"
                handleChange={handleAvatarChange}
              />
            </div>
          </div>

          <div className="text-center text-slate-700">
            <p className="capitalize font-bold">{user.name}</p>
            <p className="text-sm font-semibold">{user.email}</p>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-sm font-bold">Name</p>
              <InputComponent
                type="text"
                value={user.name}
                className="w-full"
              />
            </div>
            <div>
              <p className="text-sm font-bold">
                Email
                <span className="text-xs text-red-400">
                  {" "}
                  (Can't be modified)
                </span>
              </p>
              <InputComponent
                type="email"
                value={user.email}
                className="w-full"
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

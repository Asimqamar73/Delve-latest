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
  const isLoading = useSelector((state) => state.user.isLoading);
  const handleAvatarChange = (event) => {
    const avatarInfo = new FormData();
    avatarInfo.append("avatar", event.target.files[0]);
    dispatch(changeAvatar(avatarInfo));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="m-4">
      <div className="my-4">
        <p className="font-bold text-2xl">Profile</p>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4 shadow-md shadow-slate-200">
        <div className="col-span-1">
          <div className="relative avatar">
            <div className="w-full rounded-md">
              <img
                src={user.avatar ? user.avatar : profileImg}
                alt="profileImg"
              />
            </div>
            {isLoading ? (
              <div className="absolute bottom-0 left-0 w-full">
                <progress className="progress "></progress>
              </div>
            ) : (
              <div className="absolute top-0 right-0">
                <label htmlFor="avatar" className="hover:cursor-pointer">
                  <div className="bg-green-500/50 p-2 rounded-md">
                    <MdModeEditOutline size={24} className="text-white" />
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
            )}
          </div>

          <div className="text-center text-slate-700">
            <p className="capitalize font-bold">{user.name}</p>
            <p className="text-sm font-semibold">{user.email}</p>
          </div>
        </div>

        <div className="col-span-2">
          <form onSubmit={handleSubmit}>
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
              
              <div>
                <p className="text-sm font-bold">Biography</p>
                <textarea className="w-full bg-base-200 focus:outline-green-400 focus:outline-1 rounded h-36 p-[4px]" />
              </div>
              <div>
                <ButtonComponent
                  name="Change"
                  className="w-full bg-green-400 border-none text-slate-700"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

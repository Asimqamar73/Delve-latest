import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import noCourse from "../../assets/images/no-course.svg";
import { getOwnCourses } from "../../services/store/instructor/instructorDashboardSlice";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { ImFilm, GiFilmStrip } from "react-icons/im";

function Courses() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const courses = useSelector((state) => state.instructor.courses);
  const isLoading = useSelector((state) => state.instructor.isLoading);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getOwnCourses(user._id));
  }, []);

  const handleClick = (courseId)=>{
    navigate(`/instructor/dashboard/manage-course/${courseId}/audience`)
  }
  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <p className="text-2xl font-bold">Courses</p>
      </div>
      <div className="flex justify-between items-center border-[1px] border-green-400 p-4 my-2 rounded ">
        <p className="font-bold">Turn your skills into a course</p>
        <Link to="/instructor/create-course">
          <ButtonComponent
            name="Start course creation"
            className=" bg-green-500 border-none text-white hover:bg-green-600"
          />
        </Link>
      </div>
      <div>
        <div>
          <p className="font-bold text-lg">Courses list</p>
          {courses.length != 0 && (
            <p className="font-semibold text-sm">Manage all of your courses </p>
          )}
        </div>
        <div>
          {courses != 0 ? (
            <div>
              {courses.map((course) => (
                <div className="flex justify-between items-center border-[2px] border-green-400 p-4 my-2 rounded ">
                  <div className="flex items-center gap-2">
                    <ImFilm size={32} className="text-green-500"  />
                    <p className="text-lg font-bold">{course.courseTitle}</p>
                  </div>
                  <ButtonComponent
                    name="Edit/Manage course"
                    className="bg-teal-700 text-white font-bold border-none rounded-md"
                    click={()=>handleClick(course._id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <img src={noCourse} alt="" className="w-1/3" />
              <p className="font-bold text-red-500 text-lg">
                No course created yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;

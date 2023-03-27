import { useNavigate } from "react-router-dom";
import instructorImg from "../../../assets/images/instructorImg11 (2).jpg";
// import instructorImg from "../../../assets/images/professor.jpg";
import ButtonComponent from "../../../components/commonComponents/ButtonComponent";

function StartTeachingComponent() {
    const navigate = useNavigate()
  return (
    <div className="grid grid-cols-2 m-8">
      <div className="flex justify-center items-center">
        <div className="w-3/4 gap-8">
          <p className=" font-bold text-4xl my-2">Become an instructor</p>
          <p className="my-2">
            Instructors from around the world teach millions of students. We
            provide the tools and skills to teach what you love.
          </p>
          <ButtonComponent
            name="Start teaching"
            className="bg-green-400 text-slate-700 border-none my-2 hover:bg-green-500"
            click={()=> navigate("/signup")}
          />
        </div>
      </div>
      <div>
        <img src={instructorImg} alt="" className="w-1/2" />
      </div>
    </div>
  );
}

export default StartTeachingComponent;

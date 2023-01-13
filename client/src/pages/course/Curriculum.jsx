import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Divider from "../../components/commonComponents/Divider";
import PageHeading from "../../components/commonComponents/PageHeading";

function Curriculum() {
  const course = useSelector((state) => state.instructor.course);
  return (
    <div>
     <PageHeading title="Curriculum"/>
     <Divider/>
     {course.courseTitle}
    </div>
  );
}

export default Curriculum;

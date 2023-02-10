import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";
import { STATUSES } from "../../requestStatues";

const initialState = {
    course: null,
    status: STATUSES.IDLE
}
const courseLearningSlice = createSlice({
    name: "courseLearning",
    initialState,
    reducers: {
        setCourse: (state, action) => {
            state.course = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

export const { setCourse, setStatus } = courseLearningSlice.actions
export default courseLearningSlice.reducer


//Thunks
export function learnCourse(courseId) {
    return async function learnCourseThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { data } = await authFetch.get(`course/learnCourse/${courseId}`);
            dispatch(setCourse(data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(error);
        }
    };
}
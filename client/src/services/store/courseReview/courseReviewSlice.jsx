import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";
import { STATUSES } from "../../requestStatues";

const initialState = {
    reviews: null,
    status: STATUSES.IDLE
}
const courseLearningSlice = createSlice({
    name: "courseReview",
    initialState,
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

export const { setReviews, setStatus } = courseLearningSlice.actions
export default courseLearningSlice.reducer


//Thunks
export function fetchCourseReviews(courseId) {
    return async function learnCourseThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { data } = await authFetch.get(`courseReview/reviews/${courseId}`);
            dispatch(setReviews(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(error);
        }
    };
}

export function reviewCourse(feedback) {
    return async function reviewCourseThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { data } = await authFetch.post(
                "/courseReview/postFeedback",
                feedback
            );
            dispatch(setStatus(STATUSES.SUCCESS));
            // dispatch(setReviews(data));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
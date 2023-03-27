import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";
import { STATUSES } from "../../requestStatues";

const initialState = {
    activeUsers: null,
    publishedCoursesCount:null,
    status: STATUSES.IDLE,
    message: ""
}

const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.activeUsers = action.payload
        },
        setCourses: (state, action) => {
            state.publishedCoursesCount = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        }
    }
})


export const { setUsers, setStatus,setMessage,setCourses } = statsSlice.actions
export default statsSlice.reducer


//Thunks
export function totalActiveUsers() {
    return async function totalActiveUsersThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await authFetch.get("/student")
            dispatch(setUsers(data))
            dispatch(setStatus(STATUSES.SUCCESS))
            console.log(data)
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))

        }
    }
}

export function totalCourses() {
    return async function totalActiveUsersThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const { data } = await authFetch.get("/course")
            dispatch(setCourses(data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))

        }
    }
}

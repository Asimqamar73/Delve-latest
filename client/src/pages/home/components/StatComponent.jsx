import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { totalActiveUsers, totalCourses } from "../../../services/store/stats/statsSlice"

function StatsComponent() {

    const dispatch = useDispatch()
    const { activeUsers } = useSelector((state) => state.stats)
    const { publishedCoursesCount } = useSelector((state) => state.stats)

    useEffect(() => {
        Promise.all([dispatch(totalCourses()), dispatch(totalActiveUsers())])

    }, [])

    return <div className="stats  shadow w-full rounded-none bg-slate-600">
        <div className="stat place-items-center">
            <div className="stat-title text-white">Active users</div>
            <div className="stat-value text-secondary">{activeUsers}</div>
        </div>

        <div className="stat place-items-center">
            <div className="stat-title text-white">Total Courses</div>
            <div className="stat-value text-primary">{publishedCoursesCount}</div>
        </div>

    </div>


}

export default StatsComponent
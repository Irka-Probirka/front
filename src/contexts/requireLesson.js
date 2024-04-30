import {useAuth} from "../hooks/useAuth";
import {Navigate, Outlet, useParams} from "react-router-dom";
import {getCourseInProfile} from "../api/coursesAPI";


const RequireLesson = async () => {
    const { user } = useAuth();
    const params = useParams();

    if (!user) return <Navigate to={'/login'} />

    const courses = await getCourseInProfile(user.profile);
    const isHave = courses.find(course => course.id === params.courseId);

    return (!isHave) ? <Outlet /> : <Navigate to={'/'} />
};

export default RequireLesson;
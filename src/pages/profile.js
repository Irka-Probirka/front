import {useAuth} from "../hooks/useAuth";
import {useEffect, useState} from "react";
import {getCourseInProfile} from "../api/coursesAPI";
import {Link} from "react-router-dom";
import CourseGrid from "../components/pages/profile/coursesGrid";


const Lessons = ({selectedCourse}) => {

    return (
        <div className={'space-y-4 mt-5'}>
            <h3 className={'text-xl'}>Информация о курсе "{selectedCourse.title}"</h3>
            <div>
                <div>О курсе</div>
                <div className={'ml-3'}>{selectedCourse.about}</div>
            </div>
            <div>
                <div>Информация</div>
                <div className={'ml-3'}>{selectedCourse.information}</div>
            </div>
            <div>
                <p>Уроки:</p>
                <ul>
                    {selectedCourse.lessons.map((lesson, index) => {
                        const date = new Date(lesson.date_time);
                        const lessonDate = `${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth()}`;
                        const lessonTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
                        const lessonFullTime = lessonDate + ' ' + lessonTime;

                        const isLessonPass = date < new Date();

                        return (
                            <li
                                key={index}
                                className={`ml-5`}
                            >
                                <Link to={`lesson/${lesson.id}`} className={`relative flex gap-2 w-max`}>
                                    <div className={`absolute top-1/2 w-full border-b-2 border-solid ${isLessonPass ? 'visible' : 'hidden'}`}/>
                                    <div className={'truncate min-w-[200px]'}>{lesson.title}</div>
                                    <div>{lessonFullTime}</div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}


const Profile = () => {
    const {user} = useAuth();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);


    useEffect(() => {
        getCourseInProfile(user?.profile)
            .then(data => setCourses(data.curses))
            .catch(console.log);
    }, [user])


    return (
        <div className={'flex flex-col'}>
            <h2 className={'text-center text-2xl font-semibold mt-10'}>
                Профиль
            </h2>
            {courses.length !== 0
                ?
                <div className={'container max-w-7xl px-6 mx-auto mt-5'}>
                    <p className={'text-center text-lg'}>
                        <span className={'pb-px border-b-2 border-solid'}>Выберите курс</span>
                        &nbsp;для получения информации об уроках
                    </p>
                    <div className={'text-lg mt-5 mb-3'}>
                        Ваши курсы:
                    </div>
                    <CourseGrid
                        courses={courses}
                        setSelectedCourse={setSelectedCourse}
                    />
                    {selectedCourse.length !== 0 &&
                        <Lessons selectedCourse={selectedCourse}/>
                    }
                </div>
                :
                <div className={'flex w-full items-center'}>
                    <Link to={'/'}>Перейти к покупке курсов</Link>
                </div>
            }
        </div>
    );
};

export default Profile;
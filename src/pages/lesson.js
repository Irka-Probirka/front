import {Link, useParams} from "react-router-dom";
import {getLessonById} from "../api/lessonAPI";
import {useEffect, useState} from "react";
import LinkBack from "../components/linkBack";
import VideoPlayer from "../components/pages/lesson/videoPlayer";
import Container from "../components/container";
import {useAuth} from "../hooks/useAuth";
import {getUserData} from "../api/userAPI";


const Message = ({children}) => {
    return (
        <div className={'text-center text-lg'}>
            {children}
        </div>
    )
}


const Lesson = () => {
    const params = useParams();
    const {user} = useAuth();
    const [isStaff, setIsStaff] = useState(false)
    const [lesson, setLesson] = useState([]);
    let lessonDate = null;
    let isLessonOver = true;

    useEffect(() => {
        getLessonById(params.id)
            .then(setLesson)
            .catch(console.log);
    }, [])

    useEffect(() => {
        if (user) {
            getUserData(user.profile)
                .then(data => {
                    setIsStaff(data.is_staff);
                })
                .catch(console.log);
        }
    }, [user])

    if (lesson.date_time) {
        const date = new Date(lesson.date_time);
        const lessonDay = date.getDate();
        const lessonMonth = date.getMonth() + 1;
        const time = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        lessonDate = `${lessonDay}.${lessonMonth < 10 ? '0' + lessonMonth : lessonMonth} в ${time}`;

        const curDate = new Date();
        isLessonOver = date < new Date().setHours(curDate.getHours() + 2);
    }


    return (
        <div className={'space-y-5 mt-5'}>
            <Container>
                <div className={'relative flex flex-col items-center gap-1'}>
                    <div className={'absolute left-0 top-0'}>
                        <LinkBack/>
                    </div>
                    <h2 className={'text-2xl'}>{lesson.title}</h2>
                    <span>Дата проведения: {lessonDate}</span>
                </div>
            </Container>
            <Container>
                {isLessonOver && lesson.stream_status === 'offline'
                    ? <>
                        <Message>Урок закончился</Message>
                        <Link to={`/homework/lesson/${params.id}`} className={'text-lg'}>Посмотреть домашнее задание</Link>
                    </>
                    : <>
                        <Message>Урок еще не начался, можете подождать начала здесь</Message>
                        <div className={'grid grid-cols-[1fr,_340px] min-h-[420px] h-max mt-5'}>
                            <VideoPlayer/>
                            <div className={'bg-royal-blue-200 dark:bg-royal-blue-950'}>
                                {/*  Чат  */}
                            </div>
                        </div>
                    </>
                }
            </Container>
            {isStaff &&
                <Container>
                    <Link
                        to={`/create-home-task/${params.id}`}
                        className={'relative text-lg w-max flex items-center gap-1 before:content-[""] before:absolute before:left-[50%] hover:before:left-0 before:-bottom-0.5 before:w-0 hover:before:w-full before:h-[2px] before:bg-royal-blue-700 before:transition-all'}
                    >
                        Добавить задания к уроку
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-[1.15em]">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"/>
                        </svg>
                    </Link>
                </Container>
            }
        </div>
    );
};

export default Lesson;
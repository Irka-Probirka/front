import {useParams} from "react-router-dom";
import {getLessonById} from "../api/lessonAPI";
import {useEffect, useState} from "react";
import LinkBack from "../components/linkBack";
import VideoPlayer from "../components/pages/lesson/videoPlayer";
import Container from "../components/container";


const Message = ({children}) => {
    return (
        <div className={'text-center'}>
            {children}
        </div>
    )
}


const Lesson = () => {
    const params = useParams();
    const [lesson, setLesson] = useState([]);
    let lessonDate = null;
    let isLessonOver = true;

    useEffect(() => {
        getLessonById(params.id)
            .then(setLesson)
            .catch(console.log);
    }, [])

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
        <>
            <Container>
                <div className={'relative flex flex-col items-center gap-1 mt-5'}>
                    <div className={'absolute left-0 top-0'}>
                        <LinkBack/>
                    </div>
                    <h2 className={'text-2xl'}>{lesson.title}</h2>
                    <span>Дата проведения: {lessonDate}</span>
                </div>
            </Container>
            <Container>
                <div className={'mt-5'}>
                    {isLessonOver && lesson.stream_status === 'offline'
                        ? <Message>Урок закончился</Message>
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
                </div>
            </Container>
        </>
    );
};

export default Lesson;
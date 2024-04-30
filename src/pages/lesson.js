import {Link, useParams} from "react-router-dom";
import {getLessonById} from "../api/lessonAPI";
import {useEffect, useState} from "react";


const Message = ({children}) => {
    return (
        <div className={'text-center'}>
            {children}
        </div>
    )
}


const LinkBack = () => {
    return (
        <Link
            to={'/courses'}
            className={`
                group flex items-center gap-1 
                rounded-lg overflow-hidden py-0.5 px-3 w-max
                text-royal-blue-400 border border-solid border-royal-blue-400
                dark:text-royal-blue-500 dark:border-royal-blue-500
                hover:bg-royal-blue-600 dark:hover:bg-royal-blue-700 hover:text-white
                transition-colors duration-300
            `}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor"
                 className="size-5 group-hover:-translate-x-1.5 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
            </svg>
            <span className={'pb-px'}>Назад</span>
        </Link>
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
        <div className={'container max-w-7xl px-6 mx-auto mt-5'}>
            <LinkBack/>
            <div className={'flex flex-col items-center gap-1'}>
                <span className={'text-lg'}>{lesson.curse?.subject.title}</span>
                <h2 className={'text-2xl'}>{lesson.title}</h2>
                <span>Дата проведения: {lessonDate}</span>
            </div>
            <div className={'mt-5'}>
                {isLessonOver && lesson.stream_status === 'offline'
                    ? <Message>Урок закончился</Message>
                    : <>
                        <Message>Урок еще не начался, можете подождать начала здесь</Message>
                        <div className={'grid grid-cols-[1fr,_340px] min-h-[420px] h-max mt-5'}>
                            <div className={'bg-zinc-400 dark:bg-zinc-950'}>
                                {/*<iframe src="https://www.twitch.tv/dinol_bot" className={'aspect-video'}>*/}

                                {/*</iframe>*/}
                            </div>
                            <div className={'bg-royal-blue-200 dark:bg-royal-blue-950'}>

                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Lesson;
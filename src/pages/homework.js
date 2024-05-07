import {useEffect, useState} from "react";
import {getCourseInProfile} from "../api/coursesAPI";
import {useAuth} from "../hooks/useAuth";
import Container from "../components/container";
import {Link} from "react-router-dom";
import home from "./home";
import {getAllSolveTaskByUserId, getIsSolvedTask} from "../api/tasksAPI";


const HomeWorkItem = ({lesson, ...props}) => {
    const {user} = useAuth();
    const [allSolvedTasks, setAllSolvedTasks] = useState([]);
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        if (user) {
            getAllSolveTaskByUserId(user.profile)
                .then(setAllSolvedTasks)
                .catch(console.log);
        }
    }, [user])

    useEffect(() => {
        const homeTask = lesson.home_task;
        let countSolved = 0;

        homeTask.forEach(item => {
            if (allSolvedTasks.find(task => task.task.id === Number(item))) {
                countSolved++;
            }
        })


        if (countSolved === homeTask.length)
            setIsSolved(true);

    }, [allSolvedTasks])

    return (
        <Link
            to={`lesson/${lesson.id}`}
            className={`
                p-2 rounded-md
                bg-gradient-to-br to-80%
                from-royal-blue-500 to-royal-blue-700
                dark:from-royal-blue-700 dark:to-royal-blue-950
                outline outline-offset-4 outline-[3]
                ${isSolved ? 'outline-green-500' : 'outline-red-500'}
                dark:outline-dashed dark:outline-1 dark:outline-green-300
            `}
            {...props}
        >
            <div className={'text-white'}>
                <p>
                     <span className={'text-sm px-1 py-0.5 mr-1 rounded bg-zinc-500 dark:bg-zinc-700'}>
                         {lesson.curse.subject.title.slice(0, 3)}.
                     </span>
                    {lesson.title}
                </p>
                <span className={'text-sm'}>
                    Дата урока:&nbsp;
                    {new Date(lesson.date_time).toLocaleDateString('ru-RU', {
                        weekday: 'long', month: 'numeric', day: 'numeric',
                    })}
                </span>
            </div>
        </Link>
    )
}


const Homework = () => {
    const {user} = useAuth();
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        getCourseInProfile(user?.profile)
            .then(data => {
                const lessons = [];
                data.curses.forEach(course => lessons.push(course.lessons));

                const filteredCourses = lessons.flat().filter(lesson => lesson.home_task.length !== 0)
                setLessons(filteredCourses);
            })
            .catch(console.log);
    }, [user])

    return (
        <>
            <h2 className={'text-center font-semibold text-2xl my-6'}>
                Домашняя работа
            </h2>
            <Container>
                <div className={'grid grid-cols-4 gap-6'}>
                    {lessons.map((lesson, index) =>
                        <HomeWorkItem key={index} lesson={lesson}/>
                    )}
                </div>
            </Container>
        </>
    );
};

export default Homework;
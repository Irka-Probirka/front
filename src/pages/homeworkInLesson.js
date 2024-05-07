import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getLessonById} from "../api/lessonAPI";
import Container from "../components/container";
import {getAllTask} from "../api/tasksAPI";
import CheckAnswerInput from "../components/checkAnswerInput";
import LinkBack from "../components/linkBack";


const HomeworkInLesson = () => {
    const params = useParams();
    const [lesson, setLesson] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getLessonById(params.id)
            .then(setLesson)
            .catch(console.log)

        getAllTask()
            .then(setTasks)
            .catch(console.log);
    }, [])

    return (
        <>
            <Container>
                <div className={'relative flex flex-col items-center gap-1 my-6'}>
                    <div className={'absolute left-0 top-0'}>
                        <LinkBack/>
                    </div>
                    <h2 className={'text-center font-semibold text-2xl'}>Домашняя работа на тему {lesson.title}</h2>
                </div>
            </Container>
            <Container>
                <ul className={'space-y-3'}>
                    {lesson.home_task?.map((item, index) => {
                        const task = tasks.find(task => task.id === Number(item));

                        return (
                            <li
                                key={index}
                                className={'relative p-3 bg-zinc-200 dark:bg-zinc-950 dark:shadow-2xl dark:shadow-[rgba(255,255,255,.35)] rounded-lg space-y-2'}
                            >
                                <div>Задание {index + 1}</div>
                                <p className={'text-base 800:text-lg text-justify'}>{task?.title}</p>
                                {task?.img_task &&
                                    <div className={'flex justify-center'}>
                                        <img src={`${task?.img_task}`} alt={'картинка'}
                                             className={'max-h-[220px]'}/>
                                    </div>
                                }
                                <CheckAnswerInput taskId={task?.id}/>
                            </li>
                        )
                    })}
                </ul>
            </Container>
        </>
    );
};

export default HomeworkInLesson;
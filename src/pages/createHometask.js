import {redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllTask, setNewHomeWork} from "../api/tasksAPI";
import Container from "../components/container";
import {getLessonById} from "../api/lessonAPI";
import Button from "../components/button";
import Modal from "../components/modal";
import ButtonClose from "../components/buttonClose";


const GridTitle = ({children}) => {
    return (
        <h3 className={'text-center text-lg mb-4'}>{children}</h3>
    )
}


const CreateHomeTask = () => {
    const params = useParams()
    const [lesson, setLesson] = useState({});
    const [allTasks, setAllTasks] = useState([]);
    const [homeworkTasks, setHomeworkTasks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        getAllTask()
            .then(setAllTasks)
            .catch(console.log)

        getLessonById(params.lessonId)
            .then(setLesson)
            .catch(console.log);
    }, [])

    return (
        <>
            <h2 className={'text-center text-2xl font-semibold my-5'}>
                Создание домашнего задания для урока {lesson.title}
            </h2>
            <Container>
                <div className={'grid grid-cols-1 sm:grid-cols-[200px,_1fr] 800:grid-cols-[300px,_1fr] gap-10'}>
                    <section>
                        <div className={'fixed left-0 right-0 bottom-0 sm:sticky sm:top-20 z-[90] bg-zinc-50'}>
                            <GridTitle>Задания, вошедшие в Д/З</GridTitle>
                            {homeworkTasks.length !== 0 &&
                                <>
                                    <ul className={'space-y-0.5'}>
                                        {homeworkTasks.map((id, index) => {
                                            const task = allTasks.find(item => item.id === id);

                                            return (
                                                <li key={index} className={'flex items-center justify-between'}>
                                                    <div className={'flex'}>
                                                        <span>{task.id}.</span>
                                                        <p className={'max-w-[200px] truncate ml-1'}>{task.title}</p>
                                                    </div>
                                                    <button
                                                        className={'text-sm underline'}
                                                        onClick={() => {
                                                            setHomeworkTasks(prev => [...prev.filter(id => id !== task.id)])
                                                        }}
                                                    >
                                                        Удалить
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <div className={'mt-4'}>
                                        <Button onClick={() => setIsModalVisible(true)}>
                                            Создать
                                        </Button>
                                    </div>
                                </>
                            }
                            {homeworkTasks.length === 0 &&
                                <p className={'text-center'}>Вы не добавили заданий</p>
                            }
                        </div>
                    </section>
                    <section>
                        <GridTitle>Все задания, представленные на сайте</GridTitle>
                        <ul className={'space-y-3'}>
                            {allTasks
                                ? allTasks.map((task, index) => {
                                    return (
                                        <li key={index}
                                            className={'relative p-3 bg-zinc-200 dark:bg-zinc-950 dark:shadow-2xl dark:shadow-[rgba(255,255,255,.35)] rounded-lg space-y-2'}>
                                            <div>Задание {task.id}</div>
                                            <p className={'text-base 800:text-lg text-justify'}>{task.title}</p>
                                            {task?.img_task &&
                                                <div className={'flex justify-center'}>
                                                    <img src={`${task?.img_task}`} alt={'картинка'}
                                                         className={'max-h-[220px]'}/>
                                                </div>
                                            }
                                            <Button w={'w-max'}
                                                    onClick={() => setHomeworkTasks(prev => [...prev, task.id])}>Добавить</Button>
                                        </li>
                                    )
                                })
                                : <p>Заданий на сайте нет :(</p>
                            }
                        </ul>
                    </section>
                </div>
            </Container>
            <Modal visible={isModalVisible} setVisible={setIsModalVisible}>
                <div className={'flex flex-col h-full'}>
                    <p>Подтвердите действие на странице</p>
                    <div className={'grow flex items-end'}>
                        <Button onClick={() => {
                            setNewHomeWork(lesson, homeworkTasks)
                                .then(res => {
                                    console.log('Успешное создание дз');
                                    setIsModalVisible(false);
                                })
                                .catch(console.log)
                        }}
                        >
                            Создать домашнее задание
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
        ;
};

export default CreateHomeTask;
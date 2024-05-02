import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {checkCorrectAnswer, getAllTasksFiltered} from "../api/tasksAPI";
import {useAuth} from "../hooks/useAuth";


const CheckAnswer = ({taskId}) => {
    const [inputValue, setInputValue] = useState('');
    const [countTry, setCountTry] = useState(0);
    const [answer, setAnswer] = useState('');
    const {user} = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            checkCorrectAnswer(inputValue, taskId, user?.profile)
                .then(data => {
                    setAnswer(data);
                    setCountTry(prev => prev + 1);
                })
                .catch(console.log);
        }, 700)

        return () => clearTimeout(timer)
    }, [inputValue])

    const handleCheckInput = (e) => {
        if (e.target.localName === 'input') {
            setCountTry(0);
            setInputValue(e.target.value)
        }
    }

    return (
        <div className={'flex items-center space-x-1.5'}>
            <label htmlFor={`inputTask${taskId}`}>Ответ:</label>
            <input
                id={`inputTask${taskId}`}
                type="text"
                value={inputValue}
                className={'pl-1 leading-7 rounded border border-royal-blue-600 bg-zinc-200'}
                onChange={handleCheckInput}
            />
            {answer.id === taskId && countTry !== 0 && inputValue.length !== 0 &&
                <span>{answer.res}</span>
            }
        </div>
    )
}


const Tasks = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasksFiltered()
            .then(data => {
                const filteredTasks = data.find(item => item.id === parseInt(params.sectionId));
                if (!filteredTasks) navigate('/sections');
                setTasks(filteredTasks);
            })
            .catch(console.log)
    }, []);

    const handleToggleOpenList = (list_id) => {
        const list = document.getElementById(list_id);
        if (!list) return

        list.classList.toggle('h-max');
        list.classList.toggle('h-0');
    }

    return (
        <>
            {tasks.section?.map((section, index) => {
                return (
                    <div key={index}>
                        {section.theme.length !== 0 &&
                            <section
                                key={index}
                                className={'mb-2'}
                            >
                                <div
                                    className={'flex items-center justify-between rounded-lg p-2 hover:bg-royal-blue-200 hover:cursor-pointer'}
                                    onClick={() => handleToggleOpenList(section.id)}
                                >
                                    <h3 className={'text-xl font-semibold'}>{section.title}</h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         className="size-5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                    </svg>
                                </div>
                                <ul className={'space-y-2 h-0 overflow-hidden'} id={section.id}>
                                    {section.theme.map((task, index) =>
                                        <li key={index} className={'p-6 first:mt-4 bg-zinc-200 rounded-lg space-y-2'}>
                                            <div>Задача {index + 1}</div>
                                            <p className={'text-lg text-justify'}>{task.title}</p>
                                            {task?.img_task &&
                                                <div className={'flex justify-center'}>
                                                    <img src={`${task?.img_task}`} alt={'картинка'}
                                                         className={'max-h-[220px]'}/>
                                                </div>
                                            }
                                            <CheckAnswer taskId={task.id}/>
                                        </li>
                                    )}
                                </ul>
                            </section>
                        }
                    </div>
                )
            })}
        </>
    )
}

export default Tasks;
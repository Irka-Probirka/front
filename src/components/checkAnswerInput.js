import {useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth";
import {checkCorrectAnswer, getAllSolveTaskByUserId, getIsSolvedTask} from "../api/tasksAPI";


const CheckAnswerInput = ({taskId}) => {
    const [inputValue, setInputValue] = useState('');
    const [answer, setAnswer] = useState('');
    const [isSolved, setIsSolved] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            getIsSolvedTask(user.profile, taskId)
                .then(setIsSolved)
                .catch(console.log);
        }
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue.length !== 0) {
                checkCorrectAnswer(inputValue, taskId, user?.profile)
                    .then(setAnswer)
                    .catch(console.log);
            }
        }, 700)

        return () => clearTimeout(timer)
    }, [inputValue])

    // useEffect(() => {
    //     console.log('id: ', taskId, isSolved)
    // }, [isSolved])

    const handleCheckInput = (e) => {
        if (e.target.localName === 'input') {
            setInputValue(e.target.value);
        }
    }

    return (
        <div className={'flex items-center space-x-1.5'}>
            <label htmlFor={`inputTask${taskId}`}>Ответ:</label>
            <input
                id={`inputTask${taskId}`}
                type="text"
                value={inputValue}
                className={`
                    pl-1 leading-7 rounded 
                    outline outline-1 ${isSolved ? 'outline-green-400' : 'outline-royal-blue-600 '}
                    ${isSolved ? 'bg-green-100 dark:bg-green-900' : 'bg-zinc-200 dark:bg-zinc-900'}
                `}
                onChange={handleCheckInput}
            />
            {answer.id === taskId && inputValue.length !== 0 &&
                <span>{answer.res}</span>
            }
        </div>
    )
}

export default CheckAnswerInput;
import {useEffect, useState} from "react";
import {getAllTasksFiltered} from "../api/tasksAPI";
import {Link} from "react-router-dom";


const Sections = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasksFiltered()
            .then(setTasks)
            .catch(console.log)
    }, [])

    return (
        <div className={'grid grid-cols-2 gap-5 mx-32 mt-10'}>
            {tasks.map((section, index) =>
                <Link
                    to={`${section.id}`}
                    key={index}
                    className={'py-4 border-2 border-solid border-royal-blue-600 dark:hover:border-royal-blue-900 rounded-lg hover:bg-royal-blue-600 dark:hover:bg-royal-blue-900 hover:text-white duration-300'}
                >
                    <p className={'text-center'}>{section.title}</p>
                </Link>
            )}
        </div>
    );
};

export default Sections;
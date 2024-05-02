import Container from "./container";
import {Outlet, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllTasksFiltered} from "../api/tasksAPI";
import LinkBack from "./linkBack";


const TasksLayout = () => {
    const [title, setTitle] = useState('Направления подготовки по тестам на сайте');
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.match(/sections\/\d+$/)) {
            getAllTasksFiltered()
                .then(data => {
                    const subject = data.find(item => item.id === parseInt(params.sectionId));
                    setTitle(`Задачи по теме ${subject.title}`);
                })
                .catch(console.log)
        } else {
            setTitle('Направления подготовки по тестам на сайте')
        }
    }, [location])

    return (
        <Container>
            <div className={'relative mt-6 mb-4'}>
                {location.pathname.match(/sections\/\d+$/) &&
                    <div className={'absolute top-0 left-0 bottom-0'}>
                        <LinkBack/>
                    </div>
                }
                <h2 className={'text-center text-2xl font-semibold'}>{title}</h2>
            </div>
            <Outlet/>
        </Container>
    );
};

export default TasksLayout;
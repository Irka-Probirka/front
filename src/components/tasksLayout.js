import Container from "./container";
import {Outlet} from "react-router-dom";


const TasksLayout = () => {
    return (
        <Container>
            <h2 className={'text-center text-2xl font-semibold mt-6 mb-4'}>Задачи</h2>
            <Outlet />
        </Container>
    );
};

export default TasksLayout;
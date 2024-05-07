import {BrowserRouter, redirect, Route, Routes} from "react-router-dom";
import './input.css';
import Home from "./pages/home";
import {useState} from "react";
import Layout from "./components/Layout";
import Calendar from "./pages/calendar";
import Login from "./pages/login";
import {AuthContext} from "./contexts/authContext";
import Profile from "./pages/profile";
import {getUserData} from "./api/userAPI";
import PrivateWrapper from "./contexts/privateWrapper";
import Lesson from "./pages/lesson";
import Courses from "./pages/courses";
import RequireLesson from "./contexts/requireLesson";
import Sections from "./pages/sections";
import Tasks from "./pages/tasks";
import TasksLayout from "./components/tasksLayout";
import CreateHomeTask from "./pages/createHometask";
import Homework from "./pages/homework";
import HomeworkInLesson from "./pages/homeworkInLesson";


function App() {
    const [user, setUser] = useState(null);

    if (!user && localStorage.getItem('auth') === 'true') {
        getUserData()
            .then(setUser)
            .catch(reason => {
                localStorage.setItem('auth', 'false');
                localStorage.removeItem('token');
                redirect('/');
                console.log('App.js: ', reason);
            });
    }


    return (
        <AuthContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="calendar" element={<Calendar/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="courses" element={<Courses/>}/>
                        <Route path="sections" element={<TasksLayout />}>
                            <Route index element={<Sections/>}/>
                            <Route path=":sectionId" element={<Tasks/>}/>
                        </Route>

                        <Route element={<PrivateWrapper/>}>
                            <Route path="profile" element={<Profile/>}/>
                            <Route path="homework" element={<Homework/>}/>
                            <Route path="homework/lesson/:id" element={<HomeworkInLesson/>}/>
                            <Route path="courses/:courseId/lesson/:id" element={
                                // <RequireLesson>
                                    <Lesson/>
                                // </RequireLesson>
                            }/>
                            <Route path="create-home-task/:lessonId" element={<CreateHomeTask/>}/>
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;

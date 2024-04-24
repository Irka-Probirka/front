import Courses from "../components/pages/home/courses";
import React, {createContext, useEffect, useState} from "react";
import {getSubjects} from "../api/subjectAPI";
import CustomRadioInput from "../components/pages/home/customRadioInput";
import {useAuth} from "../hooks/useAuth";
import {getCourseInProfile, getCourses} from "../api/coursesAPI";


const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getSubjects()
            .then(setSubjects)
            .catch(reason => console.log(reason))
    }, []);

    const handleChangeObject = () => {
        console.log('change subject');
    }

    return (
        <fieldset
            className={`
                max-w-max mx-auto rounded-xl
                border-2 border-solid 
                border-royal-blue-200 
                dark:border-royal-blue-700
            `}
        >
            <legend className={'w-min px-2 sm:w-max text-center md:text-lg'}>
                Выберите направление подготовки
            </legend>
            <div className={'flex flex-wrap justify-center gap-2 mt-4 mb-6 mx-6'}>
                <CustomRadioInput id={'reset'}>
                    Все предметы
                </CustomRadioInput>
                {subjects.map((item, index) => {
                    return (
                        <CustomRadioInput id={item.title} key={index} onInputChange={handleChangeObject}>
                            {item.title}
                        </CustomRadioInput>
                    )
                })}
            </div>
        </fieldset>
    );
};


const HomeContext = createContext(null);

const Home = () => {

    const [courses, setCourses] = useState([]);
    const [coursesInProfile, setCoursesInProfile] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        document.title = 'Главная | Диплом';

        (async function () {
            await getCourses()
                .then(setCourses)
                .catch(reason => console.log(reason));

            if (user) {
                await getCourseInProfile(user.profile)
                    .then(setCoursesInProfile)
                    .catch(reason => console.log(reason));
            }
        })()
    }, [user])


    return (
        <HomeContext.Provider value={{ courses, coursesInProfile }}>
            <div className={'flex flex-col'}>
                <div className={'max-w-2xl px-6 mx-auto mt-8 md:mt-16 mb-6 md:mb-12 text-center'}>
                    <div className={'text-3xl md:text-5xl tracking-tight font-bold'}>
                        Сайт для подготовки
                        <br/>
                        к ЕГЭ и ОГЭ
                    </div>
                    <div className={'text-zinc-600 dark:text-zinc-300 md:text-lg mt-6 hidden md:block leading-normal'}>
                        Здесь можно выбрать предмет и курс,
                        <br/>
                        и научиться решать задачи
                    </div>
                </div>
                <div className={'container max-w-7xl px-6 pb-12 mx-auto'}>
                    <>
                        <Subjects/>
                    </>
                    <form className={'mt-10'}>
                        <Courses courses={courses} coursesInProfile={coursesInProfile}/>
                    </form>
                </div>
            </div>
        </HomeContext.Provider>
    );
};

export default Home;
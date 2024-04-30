import {useAuth} from "../hooks/useAuth";
import {useEffect, useState} from "react";
import {getCourseInProfile} from "../api/coursesAPI";
import {Link} from "react-router-dom";
import Container from "../components/container";


const Section = ({children, isColored}) => {
    return (
        <section className={`min-h-24 py-5 flex items-center ${isColored && 'bg-royal-blue-200 dark:bg-royal-blue-950'}`}>
            <Container>
                {children}
            </Container>
        </section>
    )
}


const Profile = () => {
    const {user} = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourseInProfile(user?.profile)
            .then(data => setCourses(data.curses))
            .catch(console.log);
    }, [user])


    return (
        <div className={'flex flex-col'}>
            <h2 className={'text-center text-2xl font-semibold my-10'}>
                Личный кабинет
            </h2>
            <Section isColored={true}>
                <div className={'flex items-center'}>
                    <h3 className={'text-2xl'}>Приобретенные курсы:</h3>
                    <span className={'ml-3 px-2 py-1 rounded-md text-white bg-royal-blue-950'}>{courses.length}</span>
                    <Link to={courses.length === 0 ? '/' : '/courses'} className={'ml-24 h-full group flex items-center gap-1'}>
                        <span className={'text-lg'}>
                            {courses.length === 0
                                ? <>Перейти к просмотру доступных курсов</>
                                : <>Смотреть все</>
                            }
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6 group-hover:translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                    </Link>
                </div>
            </Section>
            <Section>
                <h3 className={'text-2xl'}>Статистика по решенным задачам:</h3>
                <p></p>
            </Section>
        </div>
    );
};

export default Profile;
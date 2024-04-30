import {useAuth} from "../hooks/useAuth";
import {useEffect, useState} from "react";
import {getCourseInProfile} from "../api/coursesAPI";
import Container from "../components/container";
import {getSubjects} from "../api/subjectAPI";
import Span from "../components/span";
import {Link} from "react-router-dom";


const Block = ({children, onClick, ...props}) => {
    return (
        <div
            {...props}
            onClick={onClick}
            className={`
                flex items-center hover:cursor-pointer
                py-3 px-2.5 text-white rounded-lg
                bg-gradient-to-br from-royal-blue-400 to-royal-blue-600 
                dark:from-royal-blue-600 dark:to-zinc-800 
                border border-solid border-royal-blue-600 dark:border-zinc-800
            `}
        >
            {children}
        </div>
    );
};


const Select = ({subjects, setFilter}) => {
    const handlerSelect = (e) => setFilter(e.target.value)

    return (
        <>
            <select
                defaultValue={'all'}
                className={'p-2 text-sm border border-royal-blue-700 rounded-lg dark:bg-zinc-800 hover:cursor-pointer'}
                id={'select'}
                onChange={handlerSelect}
            >
                <option value="all">Все предметы</option>
                {subjects.map((subject, index) =>
                    <option key={index} value={subject.title}>{subject.title}</option>
                )}
            </select>
        </>
    )
}


const Courses = () => {
    const {user} = useAuth();
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [filter, setFilter] = useState('default');
    const [selectedCourse, setSelectedCourse] = useState();
    const [isLessonInfoVisible, setIsLessonInfoVisible] = useState(false);

    useEffect(() => {
        getCourseInProfile(user?.profile)
            .then(data => {
                const courses = data.curses;
                setCourses(courses);
                setFilteredCourses(courses);
            })
            .catch(console.log);
    }, [user])

    useEffect(() => {
        getSubjects()
            .then(setSubjects)
            .catch(console.log);
    }, [])

    useEffect(() => {
        if (filter === 'all') {
            setFilteredCourses(courses);
        } else {
            const filteredCourses = courses.filter(course => course.subject.title === filter);
            setFilteredCourses(filteredCourses);
        }
    }, [filter])

    const handlerLessonInfo = (course) => {
        return () => {
            setSelectedCourse(course);
            setIsLessonInfoVisible(true);
        }
    }

    return (
        <div className={'flex flex-col'}>
            <Container>
                <h2 className={'text-2xl mt-10'}>Ваши курсы</h2>
            </Container>
            <section className={'py-5'}>
                <Container>
                    <div
                        className={`relative grid gap-4 ${isLessonInfoVisible && 'grid-cols-1 400:grid-cols-[1fr,_minmax(160px,_40vw)] sm:grid-cols-[1fr,_300px]'}`}>
                        <div>
                            <div className={'py-3'}>
                                <Select subjects={subjects} setFilter={setFilter}/>
                                {/* Тут будет Input с функцией поиска по части названия */}
                            </div>
                            <div className={`
                                grid gap-2
                                ${isLessonInfoVisible
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1 400:grid-cols-2 800:grid-cols-4'
                            }
                            `}
                            >
                                {filteredCourses.map((course, index) => {
                                    const subject = course.subject.title.slice(0, 3) + '.';

                                    return (
                                        <Block key={index} onClick={handlerLessonInfo(course)}>
                                        <span className={'text-sm px-1 py-0.5 rounded bg-zinc-500 dark:bg-zinc-700'}>
                                            {subject}
                                        </span>
                                            <span className={'ml-1 truncate'}>{course.title}</span>
                                        </Block>
                                    )
                                })}
                            </div>
                        </div>
                        <div
                            className={`${isLessonInfoVisible ? 'block' : 'hidden'} absolute top-[56px] -right-1 -left-1 -bottom-1 400:relative 400:top-0 bg-zinc-50 dark:bg-zinc-900`}>
                            <div className={'flex items-start justify-between gap-2 min-h-[30px] 400:min-h-[56px]'}>
                                <h3 className={'sm:text-lg md:text-xl sm:text-center'}>
                                    {selectedCourse?.title}
                                </h3>
                                <button
                                    onClick={() => setIsLessonInfoVisible(false)}
                                    className={'bg-royal-blue-400 dark:bg-royal-blue-600 rounded-md text-white p-0.5 sm:p-1'}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                            <p>Уроки:</p>
                            <ul className={'mt-1 space-y-0.5 list-disc'}>
                                {selectedCourse?.lessons.map((lesson, index) => {
                                    const date = new Date(lesson.date_time);
                                    const day = date.getDate();
                                    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;

                                    return (
                                        <li key={index} className={'ml-4'}>
                                            <Link to={`/courses/${lesson.curse.id}/lesson/${lesson.id}`} className={'flex justify-between'}>
                                                <div>{lesson.title}</div>
                                                <div className={'hidden sm:block'}>{day}.{month}</div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
        ;
};

export default Courses;
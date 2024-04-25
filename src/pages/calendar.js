import {useEffect, useState} from "react";
import {getAllLessons} from "../api/lessonAPI";
import {getCourseInProfile} from "../api/coursesAPI";
import {useAuth} from "../hooks/useAuth";


const ArrowBack = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"/>
        </svg>
    )
}


const ArrowNext = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
        </svg>
    )
}


const DayList = ({daysInMonth, firstDayOfMonth, lessons, date}) => {
    const currentDate = new Date();

    return (
        <div className={'grid grid-cols-7 mt-2 animate-motionIn'} id={'calendarList'}>
            {Array(daysInMonth).fill('').map((item, index) => {
                const colStart = (firstDayOfMonth + index) % 7;
                const todayLessons = lessons?.filter(lessons =>
                    new Date(lessons.date_time).getDate() === index + 1 && new Date(lessons.date_time).getMonth() === date.getMonth()
                );
                const isThisToday = currentDate.getDate() === index + 1 && currentDate.getMonth() === date.getMonth();

                return (
                    <div
                        key={index}
                        className={`
                            col-start-${colStart === 0 ? '7' : colStart}
                            flex flex-col
                            mx-px my-px h-16
                            ${isThisToday ? 'bg-royal-blue-300 text-white' : 'text-zinc-600'}
                            dark:text-zinc-300
                            border border-solid border-black
                        `}
                    >
                        <div className={'text-center'}>{index + 1}</div>
                        <div className={'flex flex-col text-xs'}>
                            {todayLessons?.map((item, index) => {
                                const dateLesson = new Date(item.date_time);
                                const hours = dateLesson.getHours();
                                const minutes = dateLesson.getMinutes() < 10 ? `${dateLesson.getMinutes()}0` : dateLesson.getMinutes();

                                return (
                                    <div key={index} className={'flex justify-between px-1 animate-motionIn'} >
                                        <div>{item.curse.subject.title}</div>
                                        <div>{hours}:{minutes}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [lessons, setLessons] = useState([]);
    const [courseInProfile, setCourseInProfile] = useState([]);
    const {user} = useAuth();

    const getMonthName = (month) => {
        const monthNames = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
        ];
        return monthNames[month];
    };

    const getDayName = (day) => {
        const dayNames = [
            "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
        ];
        return dayNames[day];
    };

    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const [lessonsInProfile, setLessonsInProfile] = useState([]);

    useEffect(() => {
        document.title = 'Календарь | Диплом';

        getAllLessons()
            .then(setLessons)
            .catch(reason => console.log(reason));
    }, []);

    useEffect(() => {
        getCourseInProfile(user?.profile)
            .then(setCourseInProfile)
            .catch(reason => console.log(reason));
    }, [user])

    useEffect(() => {
        setLessonsInProfile(lessons.filter(lesson => {
            return courseInProfile.curses?.find(course => course.id === lesson.curse.id)
        }));

        setLessonsInProfile(prev => prev.sort((a, b) => new Date(a.date_time) - new Date(b.date_time)));

        // Групировка уроков по дням
        if (lessonsInProfile.length !== 0) groupBy();

    }, [lessons, courseInProfile])


    // const setAnimation = () => {
    //     document.querySelector('#calendarList').classList.remove('animate-motionIn');
    //     document.querySelector('#calendarList').classList.add('animate-motionOut');
    //
    //     setTimeout(() => {
    //         document.querySelector('#calendarList').classList.add('animate-motionIn');
    //         document.querySelector('#calendarList').classList.remove('animate-motionOut');
    //     }, 500);
    // }

    const handlePrevMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    // Методы для группировки уроков по дням
    function groupBy() {
        const groups = lessonsInProfile.reduce((groups, lessons) => {
            const date = lessons.date_time.split('T')[0];
            if (!groups[date]) groups[date] = [];
            groups[date].push(lessons);
            return groups;
        }, {});

        return Object.keys(groups).map((date) => {
            return {
                date,
                lessons: groups[date]
            };
        });
    }


    return (
        <div className="container max-w-7xl px-6 mx-auto">
            <h2 className={'text-center text-2xl font-semibold mt-6 mb-4'}>Календарь ваших занятий</h2>
            <div className={'grid grid-cols-[3fr,_1fr] *:mt-4'}>
                <section className={'space-y-4'}>
                    <div className="flex justify-center gap-2">
                        <button onClick={handlePrevMonth}>
                            <ArrowBack/>
                        </button>
                        <h2 className={'min-w-40 text-center'}>{getMonthName(date.getMonth())} {date.getFullYear()}</h2>
                        <button onClick={handleNextMonth}>
                            <ArrowNext/>
                        </button>
                    </div>
                    <div
                        className={'grid grid-cols-7 text-center pb-2 text-zinc-600 dark:text-zinc-300 border-solid border-b'}
                    >
                        <div>пн</div>
                        <div>вт</div>
                        <div>ср</div>
                        <div>чт</div>
                        <div>пт</div>
                        <div>сб</div>
                        <div>вс</div>
                    </div>
                    <DayList
                        lessons={lessonsInProfile}
                        daysInMonth={daysInMonth}
                        firstDayOfMonth={firstDayOfMonth}
                        date={date}
                    />
                </section>
                <section className={'text-center'}>
                    <h3>Уроки в этом месяце</h3>
                    <ul className={'mt-4'}>
                        {lessonsInProfile &&
                            lessonsInProfile.map((lesson, index) => {
                                const lessonDate = new Date(lesson.date_time);
                                const lessonDay = getDayName(lessonDate.getDay());

                                return (
                                    <li key={index} className={'animate-motionIn'}>
                                        <div>{lessonDay}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Calendar;
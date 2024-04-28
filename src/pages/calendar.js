import {useEffect, useState} from "react";
import {getCourseInProfile} from "../api/coursesAPI";
import {useAuth} from "../hooks/useAuth";
import ToDoRightMenu from "../components/pages/calendar/toDoRightMenu";
import DayList from "../components/pages/calendar/dayList";


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


const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const {user, isAuth} = useAuth();

    const getMonthName = (month) => {
        const monthNames = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
        ];
        return monthNames[month];
    };

    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const [lessonsInProfile, setLessonsInProfile] = useState([]);
    const [lessonsInProfileGroupBy, setLessonsInProfileGroupBy] = useState([]);

    useEffect(() => {
        document.title = 'Календарь | Диплом';

        if (user) {
            getCourseInProfile(user?.profile)
                .then(data => {
                    const lessons = [...data.curses.map(item => item.lessons)];
                    const result = [].concat(...lessons);
                    setLessonsInProfile(result);
                })
                .catch(reason => console.log(reason));
        }

        // Сортировка уроков по дате для дальнейшей их группировки
        setLessonsInProfile(prev => prev.sort((a, b) => new Date(a.date_time) - new Date(b.date_time)));

        if (!isAuth) setLessonsInProfile(prev => []);

    }, [user, isAuth]);

    useEffect(() => {
        // Групировка уроков по дням
        setLessonsInProfileGroupBy(groupBy);
    }, [lessonsInProfile])

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
            <div className={`grid ${isAuth ? 'grid-cols-1 800:grid-cols-[3fr,_1fr]' : 'grid-cols-1'} gap-8 *:mt-4`}>
                <section className={'space-y-4'}>
                    <div className="flex justify-center gap-2">
                        <button onClick={handlePrevMonth}>
                            <ArrowBack/>
                        </button>
                        <h2 className={'w-max sm:min-w-40 text-center'}>{getMonthName(date.getMonth())} {date.getFullYear()}</h2>
                        <button onClick={handleNextMonth}>
                            <ArrowNext/>
                        </button>
                    </div>
                    <div
                        className={'grid grid-cols-7 text-center pb-2 text-zinc-600 dark:text-zinc-300 border-solid border-b'}
                    >
                        {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day, index) =>
                            <div key={index}>{day}</div>
                        )}
                    </div>
                    <DayList
                        lessons={lessonsInProfile}
                        daysInMonth={daysInMonth}
                        firstDayOfMonth={firstDayOfMonth}
                        date={date}
                    />
                </section>
                {isAuth &&
                    <ToDoRightMenu date={date} lessonInProfileGroupBy={lessonsInProfileGroupBy}/>
                }
            </div>
        </div>
    );
};

export default Calendar;
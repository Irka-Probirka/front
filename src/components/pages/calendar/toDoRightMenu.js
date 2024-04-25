import {useEffect, useState} from "react";


const ToDoRightMenu = ({date, lessonInProfileGroupBy}) => {
    const currentDate = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const [filteredLessons, setFilteredLessons] = useState([]);

    const getDayName = (day) => {
        const dayNames = [
            "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
        ];
        return dayNames[day];
    };


    useEffect(() => {
        const dayStartWeek = currentDate.getDate() - currentDate.getDay() + 1;

        const dateStartWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayStartWeek);
        const dateEndWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayStartWeek + 7);

        const filteredLessons = lessonInProfileGroupBy.filter(item =>
            new Date(item.date).getTime() >= dateStartWeek && new Date(item.date).getTime() <= dateEndWeek
        );

        const sortedLessons = filteredLessons.sort((a, b) => new Date(a.date) - new Date(b.date));
        setFilteredLessons(sortedLessons);

    }, [lessonInProfileGroupBy])


    return (
        <section className={'text-center'}>
            <h3>Уроки на этой неделе</h3>
            <ul className={'mt-4 space-y-2'}>
                {filteredLessons.length !== 0 &&
                    filteredLessons?.map((item, index) => {
                        // Сгрупированные уроки по дате (дата ниже)
                        const date = new Date(item.date);
                        const fullMonth = date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));

                        // Map() по нескольким урокам в один день
                        return (
                            <li
                                key={index}
                                className={'rounded-lg p-3 pb-4 pl-5 relative text-left overflow-hidden animate-motionIn bg-royal-blue-200 dark:bg-royal-blue-950'}
                            >
                                <div
                                    className={'absolute w-1.5 top-0 bottom-0 left-0 bg-royal-blue-600 dark:bg-royal-blue-400'}/>
                                <span className={'font-medium text-royal-blue-950 dark:text-royal-blue-50'}>
                                {getDayName(date.getDay()) + ' ' + fullMonth}
                            </span>
                                {item?.lessons.map((lesson, index) => {
                                    const dateLesson = new Date(lesson.date_time);
                                    const hours = dateLesson.getHours();
                                    const minutes = dateLesson.getMinutes() < 10 ? `${dateLesson.getMinutes()}0` : dateLesson.getMinutes();

                                    return (
                                        <div
                                            key={index}
                                            className={'flex justify-between text-sm mt-1 text-royal-blue-900 dark:text-royal-blue-200'}
                                        >
                                            <div className={'space-x-1'}>
                                                <span>{lesson.title}</span>
                                                <span className={'underline'}>{hours}:{minutes}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </li>
                        )
                    })}
                {filteredLessons.length === 0 &&
                    <div className={'flex justify-center gap-3'}>
                        <div>На неделе уроков нет</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
                        </svg>
                    </div>
                }
            </ul>
        </section>
    );
};

export default ToDoRightMenu;
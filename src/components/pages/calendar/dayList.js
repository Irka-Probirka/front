import {Link} from "react-router-dom";


const DayList = ({daysInMonth, firstDayOfMonth, lessons, date}) => {
    const currentDate = new Date();

    return (
        <div className={'grid grid-cols-7 mt-2'} id={'calendarList'}>
            {Array(daysInMonth).fill('').map((item, index) => {
                const colStart = (firstDayOfMonth + index) % 7;
                const filteredTodayLessons = lessons?.filter(lessons =>
                    new Date(lessons.date_time).getDate() === index + 1 && new Date(lessons.date_time).getMonth() === date.getMonth()
                );
                const sortedTodayLessons = filteredTodayLessons.sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime());
                const isThisToday = currentDate.getDate() === index + 1 && currentDate.getMonth() === date.getMonth();

                return (
                    <div
                        key={index}
                        className={`
                            col-start-${colStart === 0 ? '7' : colStart}
                            flex flex-col mx-auto sm:m-[2px]
                            h-10 400:h-12 sm:h-16
                            rounded-full aspect-square sm:rounded-none sm:aspect-auto
                            ${isThisToday && 'bg-royal-blue-200 dark:bg-royal-blue-700 dark:text-white'}
                            text-zinc-600 dark:text-zinc-300
                            sm:border border-solid border-black dark:border-[rgba(255,255,255,.4)]
                        `}
                    >
                        <div className={'text-center text-sm sm:text-base pt-1 sm:pt-0'}>{index + 1}</div>
                        <div className={'flex sm:hidden justify-center pt-2 h-full gap-1'}>
                            {sortedTodayLessons.map((item, index) =>
                                <div key={index} className={'size-[5px] bg-royal-blue-600 dark:bg-royal-blue-400 rounded-full'}/>
                            )}
                        </div>
                        <div className={'hidden sm:flex flex-col text-xs'}>
                            {sortedTodayLessons?.map((item, index) => {
                                const dateLesson = new Date(item.date_time);
                                const hours = dateLesson.getHours();
                                const minutes = dateLesson.getMinutes() < 10 ? `${dateLesson.getMinutes()}0` : dateLesson.getMinutes();

                                return (
                                    <Link
                                        to={`/courses/${item.curse.id}/lesson/${item.id}`}
                                        key={index}
                                        className={'flex justify-between px-1 hover:underline'}
                                    >
                                        <div className={'truncate'}>{item.curse.subject.title}</div>
                                        <div>{hours}:{minutes}</div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DayList;
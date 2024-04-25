


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
                            flex flex-col
                            m-[2px] h-16
                            ${isThisToday ? 'text-white bg-royal-blue-600 dark:bg-royal-blue-700' : 'text-zinc-600'}
                            dark:text-zinc-300
                            border border-solid border-black dark:border-[rgba(255,255,255,.4)]
                        `}
                    >
                        <div className={'text-center'}>{index + 1}</div>
                        <div className={'flex flex-col text-xs'}>
                            {sortedTodayLessons?.map((item, index) => {
                                const dateLesson = new Date(item.date_time);
                                const hours = dateLesson.getHours();
                                const minutes = dateLesson.getMinutes() < 10 ? `${dateLesson.getMinutes()}0` : dateLesson.getMinutes();

                                return (
                                    <div key={index} className={'flex justify-between px-1 animate-motionIn'}>
                                        <div className={'truncate'}>{item.curse.subject.title}</div>
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

export default DayList;
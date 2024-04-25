

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
                                    <div key={index} className={'flex justify-between px-1 animate-motionIn'}>
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

export default DayList;
import {useState} from "react";


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


const DayList = ({ daysInMonth, firstDayOfMonth, date }) => {
    const currentDate = new Date();

    return (
        <div className={'grid grid-cols-7 mt-2 *:h-10 *:text-center'}>
            {Array(daysInMonth).fill('').map((item, index) => {
                const colStart = (firstDayOfMonth + index) % 7;
                return (
                    <div
                        key={index}
                        data-day={index + 1}
                        data-month={date.getMonth()}
                        className={`
                            col-start-${colStart}
                            mx-px my-px
                            text-zinc-600
                            dark:text-zinc-300
                            border border-solid
                        `}
                    >
                        {index + 1}
                    </div>
                )
            })}
        </div>
    )
}


const Calendar = () => {
    const [date, setDate] = useState(new Date());

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

    const title = getMonthName(date.getMonth()) + ' ' + date.getFullYear();

    const handlePrevMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };


    return (
        <div className="container max-w-7xl px-6 mx-auto">
            <h2 className={'text-center text-2xl font-semibold mt-6 mb-4'}>Календарь ваших занятий</h2>
            <div className={'grid grid-cols-[3fr,_1fr] *:mt-4'}>
                <section className={'space-y-4'}>
                    <div className="flex justify-center gap-2">
                        <button onClick={handlePrevMonth}>
                            <ArrowBack/>
                        </button>
                        <h2 className={'min-w-40 text-center'}>
                            {title}
                        </h2>
                        <button onClick={handleNextMonth}>
                            <ArrowNext/>
                        </button>
                    </div>
                    <div
                        className={'grid grid-cols-7 text-center pb-2 text-zinc-600 dark:text-zinc-300 border-solid border-b'}>
                        <div>пн</div>
                        <div>вт</div>
                        <div>ср</div>
                        <div>чт</div>
                        <div>пт</div>
                        <div>сб</div>
                        <div>вс</div>
                    </div>
                    <DayList daysInMonth={daysInMonth} firstDayOfMonth={firstDayOfMonth} date={date}/>
                </section>
                <section className={'text-center'}>
                    Какой-то текст
                </section>
            </div>
        </div>
    );
};

export default Calendar;
import {useState} from "react";
import '../style.css';


const Schedule = () => {
    const [date, setDate] = useState(new Date());

    const getMonthName = (month) => {
        const monthNames = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ];
        return monthNames[month];
    };

    const renderCalendarGrid = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        let day = 1;
        const rows = [];

        for (let i = 0; i < 6; i++) {
            const row = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth - 1) {
                    row.push(<td key={`${i}-${j}`}></td>);
                } else if (day > daysInMonth) {
                    break;
                } else {
                    row.push(
                        <td key={`${i}-${j}`}>
                            {day}
                        </td>
                    );
                    day++;
                }
            }
            rows.push(<tr key={i}>{row}</tr>);
        }
        return rows;
    };

    const handlePrevMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    return (
        <div className="calendar">
            <div className="month-header">
                <button onClick={handlePrevMonth}>&lt;</button>
                <h2>{getMonthName(date.getMonth())} {date.getFullYear()}</h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <table className="calendar-grid">
                <thead>
                <tr>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th>Сб</th>
                    <th>Вс</th>
                </tr>
                </thead>
                <tbody>{renderCalendarGrid()}</tbody>
            </table>
        </div>
    );
};

export default Schedule;
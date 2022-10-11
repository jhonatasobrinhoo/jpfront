import CalendarHeatmap from "react-calendar-heatmap";
import {Tooltip} from "antd";
import {DateTime, Interval} from "luxon";
import {useContext} from "react";
import * as workoutService from "../../apis/workoutService";

function* datesInInterval(interval) {
    let cursor = interval.start;
    while (cursor < interval.end) {
        yield cursor;
        cursor = cursor.plus({days: 1})
    }
}

const DashboardCalendar = ({context, addData, removeData}) => {
    const now = DateTime.now();
    const endOfWeek = now.minus({days: 1}).endOf('week');
    const fiveMonthsAgo = endOfWeek.minus({months: 5, days: 1});

    const newValues = [];
    const interval = Interval.fromDateTimes(fiveMonthsAgo, endOfWeek);

    const contextValue = useContext(context);
    console.log(contextValue);
    const {dates, addDate, removeDate, modifyDate} = contextValue;
    const mappedDates = dates.map(d => d.date);
    for (const date of datesInInterval(interval)) {
        newValues.push({
            date,
            count: mappedDates.includes(date.toFormat("yyyy-MM-dd")) ? 1 : 0
        });
    }

    const pushWorkout = async (date) => {
        addDate(date);

        const data = await addData(date);
        // const data = await workoutService.addWorkout(date);

        modifyDate(date, {id: data.id});
    }

    const removeWorkout = async (date) => {
        const dateInstance = dates.find(d => d.date === date);

        removeDate(date);

        await removeData(dateInstance.id);
        await workoutService.removeWorkout(dateInstance.id);
    }

    const onClick = (value) => {
        const valueAsDate = value.date.toFormat('yyyy-MM-dd')
        value.count > 0 ? removeWorkout(valueAsDate) : pushWorkout(valueAsDate);
    }

    const calendarClassForValue = (value) => {
        if (!value || value.count === 0) {
            return 'rect-days color-empty';
        }
        return `rect-days color-scale-${value.count}`;
    }

    const transformDayElement = (element, value) => {
        if (!value || !value.date) {
            return <div className="rect-days">
                {element}
            </div>
        }
        return <Tooltip mouseEnterDelay={0.4} placement="rightTop" title={value.date.toFormat('EEE, dd MMMM', {locale: 'pt-BR'})}
                        arrowPointAtCenter className="rect-days">
            {element}
        </Tooltip>
    }

    return <div style={{padding: '10px'}}>
        <CalendarHeatmap
            style={{height: '400px'}}
            startDate={fiveMonthsAgo.toJSDate()}
            endDate={endOfWeek.toJSDate()}
            values={newValues}
            onClick={onClick}
            monthLabels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
            classForValue={calendarClassForValue}
            transformDayElement={transformDayElement}
        />
    </div>
}

export default DashboardCalendar;
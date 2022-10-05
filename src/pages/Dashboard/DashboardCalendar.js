import CalendarHeatmap from "react-calendar-heatmap";
import {Tooltip} from "antd";
import {DateTime, Interval} from "luxon";
import {useEffect, useState} from "react";

function* dates(interval) {
    let cursor = interval.start;
    while (cursor < interval.end) {
        yield cursor;
        cursor = cursor.plus({days: 1})
    }
}

const DashboardCalendar = ({currentDayActive}) => {
    const now = DateTime.now();
    const endOfWeek = now.minus({days: 1}).endOf('week');
    const nineMonthsAgo = endOfWeek.minus({months: 5, days: 1});

    const newValues = [];
    const interval = Interval.fromDateTimes(nineMonthsAgo, endOfWeek);
    for (const date of dates(interval)) {
        newValues.push({
            date,
            count: currentDayActive && date.toISODate() === now.toISODate() ? 1 : 0
        })
    }

    const [values, setValues] = useState(newValues);

    useEffect(() => {
        const filteredValues = values.filter(value => {
            return !value.date.equals(now)
        });
        const newValues = [
            ...filteredValues,
            {
                date: now,
                count: +currentDayActive,
            }
        ]
        setValues(newValues);

    }, [currentDayActive]);

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
        return <Tooltip placement="rightTop" title={value.date.toFormat('EEE, dd MMMM', {locale: 'pt-BR'})} arrowPointAtCenter className="rect-days">
            {element}
        </Tooltip>
    }

    const onClick = (value) => {
        // 2022-01-30T23:59:59.999-03:00
        // let dateTime = DateTime.fromFormat(value);
        const dateTime = value.date;

        const found = values.find(v => v.date === dateTime);

        const updatedNode = {
            ...found,
            count: found.count === 1 ? 0 : 1
        }

        setValues([
            ...values.filter(v => !v.date.equals(dateTime)),
            updatedNode
        ])
    }

    return <div style={{padding: '10px'}}>
        <CalendarHeatmap
            style={{ height: '400px'}}
            startDate={nineMonthsAgo.toJSDate()}
            endDate={endOfWeek.toJSDate()}
            values={values}
            onClick={onClick}
            classForValue={calendarClassForValue}
            transformDayElement={transformDayElement}
        />
    </div>
}

export default DashboardCalendar;
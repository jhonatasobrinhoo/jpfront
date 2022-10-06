import CalendarHeatmap from "react-calendar-heatmap";
import {Tooltip} from "antd";
import {DateTime, Interval} from "luxon";
import {useContext} from "react";
import {TrainingContext} from "../../contexts/training/TrainingContext";
import * as trainingService from "../../apis/trainingService";

function* datesInInterval(interval) {
    let cursor = interval.start;
    while (cursor < interval.end) {
        yield cursor;
        cursor = cursor.plus({days: 1})
    }
}

const DashboardCalendar = () => {
    const now = DateTime.now();
    const endOfWeek = now.minus({days: 1}).endOf('week');
    const nineMonthsAgo = endOfWeek.minus({months: 5, days: 1});

    const newValues = [];
    const interval = Interval.fromDateTimes(nineMonthsAgo, endOfWeek);

    const {dates, addDate, removeDate, modifyDate} = useContext(TrainingContext);
    const mappedDates = dates.map(d => d.date);
    for (const date of datesInInterval(interval)) {
        newValues.push({
            date,
            count: mappedDates.includes(date.toFormat("yyyy-MM-dd")) ? 1 : 0
        });
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

    const pushTraining = async (date) => {
        addDate({
            id: null,
            date,
        });

        const data = await trainingService.addTraining(date);

        modifyDate(date, {id: data.id});
    }

    const removeTraining = async (date) => {
        const dateInstance = dates.find(d => d.date === date);

        removeDate(date);

        await trainingService.removeTraining(dateInstance.id);
    }

    const onClick = (value) => {
        const valueAsDate = value.date.toFormat('yyyy-MM-dd')
        value.count > 0 ? removeTraining(valueAsDate) : pushTraining(valueAsDate);
    }

    return <div style={{padding: '10px'}}>
        <CalendarHeatmap
            style={{height: '400px'}}
            startDate={nineMonthsAgo.toJSDate()}
            endDate={endOfWeek.toJSDate()}
            values={newValues}
            onClick={onClick}
            classForValue={calendarClassForValue}
            transformDayElement={transformDayElement}
        />
    </div>
}

export default DashboardCalendar;
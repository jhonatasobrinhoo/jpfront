import {createContext, useEffect, useReducer} from "react";
import {getAllTrainings} from "../../apis/trainingService";
import {getStatistics} from "../../apis/statisticsService"
import * as actions from './actions';
import reducer from './reducer';

const initialState = {
    dates: [],
    statistics: {
        lastWeek: 0,
        lastMonth: 0
    }
};

export const TrainingContext = createContext({});

export const TrainingContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);

    const value = {
        dates: state.dates,
        statistics: state.statistics,
        addDate: (date) => {
            dispatch({type: actions.ADD_DATE, payload: {id: null, date}});
        },
        removeDate: (date => {
            dispatch({type: actions.REMOVE_DATE, payload: date});
        }),
        modifyDate: ((date, obj) => {
            dispatch({
                type: actions.MODIFY_DATE, payload: {
                    date, obj
                }
            });
        }),
    }

    useEffect(() => {
        (async function fetchDates() {
            const trainingsResponse = await getAllTrainings();
            dispatch({type: actions.FETCH_DATES, payload: trainingsResponse});

            const statisticsResponse = await getStatistics();
            dispatch({type: actions.FETCH_STATISTICS, payload: statisticsResponse.workouts});
        })();
    }, []);

    return <TrainingContext.Provider value={value}>{children}</TrainingContext.Provider>
}
import {createContext, useEffect, useReducer} from "react";
import {getStatistics} from "../../apis/statisticsService"
import * as actions from './actions';
import reducer from './reducer';
import {getAllFood} from "../../apis/foodService";

const initialState = {
    dates: [],
    statistics: {
        lastWeek: 0,
        lastMonth: 0
    }
};

export const FoodContext = createContext({});

export const FoodContextProvider = ({children}) => {
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
            const foodResponse = await getAllFood();
            dispatch({type: actions.FETCH_DATES, payload: foodResponse});

            const statisticsResponse = await getStatistics();
            dispatch({type: actions.FETCH_STATISTICS, payload: statisticsResponse.food});
        })();
    }, []);

    return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>
}
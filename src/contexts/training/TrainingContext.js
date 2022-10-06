import {createContext, useEffect, useReducer} from "react";
import {getAllTrainings} from "../../apis/trainingService";
import * as actions from './actions';
import reducer from './reducer';

const initialState = {
    dates: []
};

export const TrainingContext = createContext({});

export const TrainingContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);

    const value = {
        dates: state.dates,
        addDate: (date) => {
            dispatch({type: actions.ADD_DATE, payload: date});
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
            const response = await getAllTrainings();
            dispatch({type: actions.FETCH_DATES, payload: response});
        })();
    }, []);

    return <TrainingContext.Provider value={value}>{children}</TrainingContext.Provider>
}
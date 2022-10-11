import * as actions from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_DATE:
            return {
                ...state,
                dates: [
                    ...state.dates,
                    action.payload
                ]
            };
        case actions.REMOVE_DATE:
            return {
                ...state,
                dates: [
                    ...state.dates.filter(d => d.date !== action.payload)
                ]
            };
        case actions.FETCH_DATES:
            return {
                ...state,
                dates: action.payload
            };
        case actions.MODIFY_DATE:
            const {date, obj} = action.payload;

            const modifyingDate = state.dates.find(d => d.date === date);

            const finalDate = {
                ...modifyingDate,
                ...obj
            };

            return {
                ...state,
                dates: [
                    ...state.dates.filter(d => d.date !== date),
                    finalDate
                ]
            }
        case actions.FETCH_STATISTICS:
            const content = action.payload;

            return {
                ...state,
                statistics: content,
            }

        default:
            return state;
    }
}

export default reducer;
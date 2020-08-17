import * as actionTypes from '../actions/tasksActions';

const initialState = {
    tasks: []
};

const taskReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_TASKS:
            return {
                ...state,
                tasks: action.tasks
            }
        case actionTypes.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        case actionTypes.UPDATE_TASK:
            state.tasks[state.tasks.findIndex(t => t.Id === action.task.Id)] = action.task;
            return {
                ...state,
                tasks: [...state.tasks]
            }
        // implement case for deleting task
        // check for javascript funkcions for removing element from array by id.
        case actionTypes.DELETE_TASK:
            return {
                ...state,
                tasks: [...state.tasks.filter(t => t.Id !== action.taskId)]
            }
        default:
            return state;
    }
};

export default taskReducer;
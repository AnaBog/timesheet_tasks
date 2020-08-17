import ApiService from "../../service/api.service";
export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK ='DELETE_TASK';

export const setTasks = (tasks) => {
    return {
        type: GET_TASKS,
        tasks: tasks
    };
}

export const addTask = (task) => {
    return {
        type: ADD_TASK,
        task: task
    };
}

export const updateTask = (task) => {
    return {
        type: UPDATE_TASK,
        task: task
    };
}

export const deleteTask = (id) => {
    return {
        type: DELETE_TASK,
        taskId: id
    };
}

// todo: implement delete action - taskId

export const onGetTasks = (payload) => {
    return dispatch => {
        ApiService.getTasks(payload).then(
            tasks => {
                dispatch(setTasks(tasks))
            }
        )
    }
};

export const onCreateTask = (payload) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            ApiService.createTask(payload).then(
                task => {
                    dispatch(addTask(task));
                    resolve();
                }
            )
        })
    }
}

export const onUpdateTask = (payload) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            ApiService.updateTask(payload).then(
                (task) => {
                    dispatch(updateTask(task));
                    resolve();
                }
            )
        })
    }
}

export const onDeleteTask = (payload) => {
    console.log(payload)
    return dispatch => {
        return new Promise((resolve,reject) =>{
            ApiService.deleteTask(payload).then(
                () => {
                    dispatch(deleteTask(payload));
                    resolve();
                }
            )
        })
    }
}

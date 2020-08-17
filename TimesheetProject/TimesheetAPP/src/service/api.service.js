import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:44396/api/'

class ApiService {
    static getTasks(date) {
        return new Promise((resolve, reject) => {
            axios.get('Tasks', {params: {date: date}})
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    static createTask(task) {
        return new Promise((resolve, reject) => {
            axios.post('Tasks', task)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    static updateTask(task) {
        return new Promise((resolve, reject) => {
            axios.put('Tasks', task)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    static deleteTask(id){
        return new Promise((resolve,reject) => {
            axios.delete(`Tasks/${id}`)
            .then(() =>{
                resolve();
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    static getQuote(quote) {
        return new Promise((resolve, reject) => {
            axios.get('Quotes')
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
        })
    }
};


export default ApiService;
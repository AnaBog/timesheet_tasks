import React, { Component } from 'react'
import classes from './TimesheetTaskDialog.module.scss'
import { connect } from 'react-redux';
import * as tasksActions from '../../store/actions/tasksActions';


class TimesheetTaskDialog extends Component {
    handleSubmit = this.handleSubmit.bind(this); 
    handleChange = this.handleChange.bind(this); 

    state = {
        task: {
            Title: '',
            Hours: 0,
        }
    }

    componentDidMount() {
        this.setState({
            task: {
                ...this.state.task,
                Title: this.props.task ? this.props.task.Title : '',
                Hours: this.props.task ? this.props.task.Hours : 0
            }
        })
    }

    handleSubmit(event){
        event.preventDefault();

        const task = {
            Title: this.state.task.Title,
            Hours: this.state.task.Hours,
            DateCreated: this.props.selectedDate
        }

        if (!this.props.task) { // create mode
            this.props.onCreateTask(task).then(
                () => {
                    this.props.afterDialogClose();
                }
            )
        } else { // edit mode
            this.props.onUpdateTask({...task, Id: this.props.task.Id}).then(
                () => {
                    this.props.afterDialogClose();
                }
            )
        }
    }

    handleChange(event) {
        this.setState({
            task: {
                ...this.state.task,
                [event.target.name]: event.target.value
            }
        })
    }

    handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this task?")){
            this.props.onDeleteTask(this.props.task.Id).then(
                () => {
                    this.props.afterDialogClose();
                }
            )
        }
    }

    formatDate(date) {
        return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    }

    render() {
        return (
            <div className={classes.TimesheetTaskDialog} onClick={this.props.afterDialogClose}>
                <form className={classes.TimesheetTaskDialogForm} onSubmit={this.handleSubmit} onClick={e => e.stopPropagation()}>
                    <h1 className={classes.FormTitle}>{ this.props.task ? 'Edit' : 'Create'} a task:</h1>

                    <div>
                        <label className={classes.LabelTitle}>TITLE:</label>
                        <input className={classes.InputTitleField} type="text" value={this.state.task.Title} onChange={this.handleChange} name="Title" placeholder="Enter title here..."/>
                    </div>

                    <br/>

                    <div>
                        <label className={classes.LabelHours}>HOURS:</label>
                        <input className={classes.InputHoursField} type="number" step="1" min="0" value={this.state.task.Hours} onChange={this.handleChange} name="Hours" placeholder="Enter hours here..."/>
                    </div>
                    
                    <br/>
                    
                    <input className={classes.SubmitButton} type="submit" value={ this.props.task ? 'Update' : 'Create'} />

                    {
                        this.props.task && <button className={classes.DeleteButton} type="button" onClick={this.handleDelete}>Delete</button>
                    }
                    
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateTask: (task) => dispatch(tasksActions.onCreateTask(task)),
        onUpdateTask: (task) => dispatch(tasksActions.onUpdateTask(task)),
        onDeleteTask: (id) => dispatch(tasksActions.onDeleteTask(id))
    }
}

export default connect(null, mapDispatchToProps)(TimesheetTaskDialog);
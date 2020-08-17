import React, { Component } from 'react'
import classes from './TimesheetTask.module.scss'

export default class TimesheetTask extends Component {
    render() {
        return (
            <div className={['o-flex', 'o-flex-middle', classes.Task].join(' ')} onClick={this.props.editTask}>
                
                <span className={classes.TaskTitle}>
                <span className={classes.SmallTitle}>TITLE</span>
                    { this.props.task.Title }
                </span>
                <span className={classes.TaskHours}>
                    <span className={classes.SmallHours}>HOURS</span>
                    { this.props.task.Hours } hours
                </span>
            </div>
        )
    }
}
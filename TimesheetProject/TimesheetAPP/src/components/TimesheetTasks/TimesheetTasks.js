import React, { Component } from 'react'
import TimesheetTask from '../TimesheetTask/TimesheetTask';
import classes from './TimesheetTasks.module.scss'
import { connect } from 'react-redux';
import * as tasksActions from '../../store/actions/tasksActions';
import * as quotesActions from '../../store/actions/quotesActions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimesheetTaskDialog from '../TimesheetTaskDialog/TimesheetTaskDialog';
import iconPlus from '../../assets/icon-plus.svg';
import iconCalendar from '../../assets/icon-calendar.svg';
import vegaLogo from '../../assets/vegait-logo.svg';
class TimesheetTasks extends Component {
    state = {
        selectedDate: null,
        isTaskDialogOpen: false,
        selectedTask: null,
    }

    componentDidMount() {
        const date = this.isRootUrl() ? this.formatDate(new Date()) :  this.props.match.url.replace('/', '');

        if (date.match(/^\d{4}-\d{2}-\d{2}$/g)) {
            this.setState({
                selectedDate: new Date(date)
            })
    
            this.props.onGetTasks(this.isRootUrl() ? this.formatDate(new Date()) : this.props.match.url.replace('/', ''));
        }

        this.props.onGetQuote();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedDate !== this.state.selectedDate) {
            this.props.onGetTasks(this.isRootUrl() ? this.formatDate(new Date()) : this.props.match.url.replace('/', ''));
        }
    }

    isRootUrl() {
        return this.props.match.url === '' || this.props.match.url === '/';
    }

    getSumOfHoursForSelectedDay() {
        let hours = 0;

        this.props.tasks.forEach(t => {
            hours += t.Hours;
        });
 
        return hours;
    }

    formatDate(date) {
        return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    }

    onDateChange(date) {
        this.props.history.push(`/${this.formatDate(date)}`);

        this.setState({
            selectedDate: date
        });
    }

    openTaskDialog = () => this.setState({ isTaskDialogOpen: true })
    closeTaskDialog = () => this.setState({ isTaskDialogOpen: false, selectedTask: null })

    editTask = (task) => {
        this.setState({
            selectedTask: task,
            isTaskDialogOpen: true
        })
    }

    render() {
        return ( 
            <div className={classes.Tasks}>
                <div className={classes.TasksHeader}>

                    <div className="container">

                    <button type="button" onClick={this.openTaskDialog} className={classes.PlusButton}><img src={iconPlus} width="45" height="45" alt=""/></button>
                    
                    {
                        this.props.quote && 
                            <div className={classes.Quote}>
                                <div className={classes.QuoteContent}>{this.props.quote.QuoteContent}</div>
                                <div className={classes.Author}>- {this.props.quote.Author}</div>
                            </div>
                    }
                    </div> 
                
                    <div className={classes.HeaderBottom}>
                        <div className="container">

                            <div className={classes.HeaderBottomInner}>
                                <div className={classes.HeaderDatePicker}>
                                    <img src={iconCalendar} width="25" height="25" className={classes.CalendarIcon} alt=""/>
                                    
                                    <DatePicker
                                        selected={this.state.selectedDate}
                                        ref={(c) => this._calendar = c}
                                        onChange={date => this.onDateChange(date)}
                                        dateFormat="yyyy-MM-dd"/>
                                </div>

                                {
                                    !this.state.selectedDate ? <div className={classes.TasksInvalidDate}>Date you selected is not right. Please select correct date.</div> : null
                                }

                                <img src={vegaLogo} width="112" height="98" className={classes.vegaLogo} alt=""/>

                                {
                                    this.state.isTaskDialogOpen && 
                                        <TimesheetTaskDialog
                                            task={this.state.selectedTask}
                                            afterDialogClose={this.closeTaskDialog} 
                                            selectedDate={this.isRootUrl() ? this.formatDate(new Date()) : this.formatDate(this.state.selectedDate)} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.TasksBody}>
                    <div className="container">
                        {
                            this.props.tasks.length ? 
                            <div className={classes.TasksItems}>
                                { 
                                    this.props.tasks.map(task => {
                                        return <TimesheetTask key={task.Id} task={task} editTask={() => this.editTask(task)} />
                                    }) 
                                }
                            </div> : null
                        }
                        
                        {
                            this.props.tasks.length ? <div className={classes.TasksHoursSum}> <span>Total:</span> { `${this.getSumOfHoursForSelectedDay()} hours` } </div> : null
                        }
                        
                        {
                            !this.props.tasks.length ? <div className={classes.TasksEmptyState}>Sorry, there are no tasks for selected date.</div> : null
                        }
                    </div>
                </div>

                <div className={classes.TasksFooter}>© { new Date().getFullYear() } Vega IT Sourcing</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasksReducer.tasks,
        quote: state.quotesReducer.quote
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTasks: (date) => dispatch(tasksActions.onGetTasks(date)),
        onCreateTask: (task) => dispatch(tasksActions.onCreateTask(task)),
        onGetQuote: () => dispatch(quotesActions.onGetQuote())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetTasks);
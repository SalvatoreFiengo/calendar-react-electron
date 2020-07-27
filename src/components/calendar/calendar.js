import React from 'react';
import CalendarCockpit from './calendarCockpit/calendarCockpit';
import EventList from '../eventList/eventList';
// import EventForm from './eventForm/eventForm'; to be implemented
import {helper} from './js/helper'
import './calendar.css';

export default class Calendar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            year: this.props.year || new Date().getFullYear(),
            n: this.props.n || new Date().getMonth(),
            currentYear:this.props.year || new Date().getFullYear(),
            currentMonth:false,
            dates: [],
            yearList:[],
            eventListShow:false,
            eventListSelectedDate:undefined,
            data: localStorage.getItem('data') || this.props.data,
            mydata:{}
        };
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleYearOnChange = this.handleYearOnChange.bind(this);
        this.handleMonthOnChange = this.handleMonthOnChange.bind(this);
        this.toggleEventList=this.toggleEventList.bind(this);
    };

    handlePrevClick(e) {
        e.preventDefault();
        let year = this.state.currentYear
        if(this.state.n === 0){
            let month = 11
            year=year-1
            let dates = helper.getDates(month, year, this.state.data);
            this.setState({
                n: month,
                dates:dates,
                currentYear:year
            });    
        }else{
            let month = this.state.n-1
            let dates = helper.getDates(month, year, this.state.data);
            this.setState({
                n: month,
                dates:dates
            }); 
        }         
    };
    handleNextClick(e) {
        e.preventDefault();
        let year = this.state.currentYear
        if(this.state.n === 11){
            let month = 0
            year=year+1
            let dates = helper.getDates(month, year, this.state.data);
            this.setState({
                n: month,
                dates:dates,
                currentYear:year
            });    
        }else{
            let month = this.state.n+1
            let dates = helper.getDates(month, year, this.state.data);
            this.setState({
                n: month,
                dates:dates
            }); 
        }  
    };

    handleYearOnChange(e){
        let year = e.target.value
        this.setState({
            currentYear: year,
            dates:helper.getDates(this.state.n, year, this.state.data)
        })

    };
    handleMonthOnChange(e){
        let month = e.target.value
        this.setState({
            n:parseInt(month),
            dates:helper.getDates(month, this.state.currentYear,this.state.data)
        })
    }
    toggleEventList(day=undefined){
        if(day !== undefined){
            this.setState((ps)=>({
                eventListShow: !ps.eventListShow,
                eventListSelectedDate: day
            }))
        }else{
            this.setState((ps)=>({
                eventListShow: !ps.eventListShow,
                eventListSelectedDate: undefined
            })) 
        }
    }
    //add event and form onchange
    handleFormOnSubmit = ()=>{
        console.log(this.state.eventForm)
    }
    addEvent = (e,form)=>{
        e.preventDefault();
        const dataInStorage = JSON.parse(localStorage.getItem('data'));
        const keys=Object.keys(dataInStorage)
        dataInStorage[keys.length]=form
        console.log(dataInStorage)
        let data=Object.values(dataInStorage);
        localStorage.setItem('data',JSON.stringify(dataInStorage))
        this.setState({
            data:data
        })
    }
    componentDidMount(){
        let dataObj ={}
        this.props.data.forEach((el,i)=>{
            dataObj[i]=el
        })
        localStorage.setItem('data', JSON.stringify(dataObj));
        const items =JSON.parse(localStorage.getItem('data'));
        let data = Object.values(items)
        let dates = helper.getDates(this.state.n, this.state.year, data);
        this.setState({
            data:data,
            dates:dates,
            yearList:helper.getYearsList(this.state.year)
        });
        
    };

    render(){
        return(
        <div className='calendar-main-css'>
            <div>
                <CalendarCockpit 
                    handlePrevClick={this.handlePrevClick}
                    handleNextClick={this.handleNextClick}
                    n={this.state.n}
                    currentYear={this.state.currentYear}
                    yearList = {this.state.yearList}
                    handleMonthOnChange={this.handleMonthOnChange}
                    handleYearOnChange={this.handleYearOnChange}/>
                <div className='calendar'>
                    <EventList 
                        close={this.toggleEventList} 
                        eventsShow={this.state.eventListShow} 
                        day={this.state.eventListSelectedDate}/>
                    <div className='month'>
                        {this.state.dates.map(
                            (week,i)=>{
                            let day = week.map(day=>{
                                return(
                                    <div 
                                        className={helper.checkCurrentMonth(day.dateMonth, this.state.n)?'day active':'day inactive'} 
                                        key={day.id}>
                                        <p>{day.weekday} {day.dateNum} {day.monthShortName}</p>
                                        {day.data[0]!==undefined?
                                            <div 
                                                onClick={()=>this.toggleEventList(day)} 
                                                className='event pointer'>
                                                {day.data.length > 1? <p>'Events' <span className='event-badge'>{day.data.length}</span></p>
                                                :<p>{day.data[0].eventName.substring(0,20).replace(day.data[0].eventName.substring(17,20),' ...')}</p>}</div>
                                            :null
                                        }
                                    </div>
                                    )
                                })
                            return (
                                <div key={i} className='week'>{day}</div>
                                )
                            } )
                        }  
                    </div>
                </div>
            </div>
            {/* working on events from to be shown in modal when clicking on day '+' */}
            {/* <EventForm addEvent={this.addEvent} year={this.state.currentYear} month={this.state.n} dates={this.state.dates}/> */}
        </div>
        )
    }
};

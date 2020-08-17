import React from 'react';
import ReactDom from 'react-dom';
import Button from '../button/button'
import {helper} from '../calendar/js/helper';
import './eventList.css'

export default class EventList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            elementInmView:null,
            showAllDay:false,
            showListByHour:true
        }
        this.setRef=this.setRef.bind(this);
        this.handleSwitchAllDay=this.handleSwitchAllDay.bind(this);
        this.handleSwitchbyHour=this.handleSwitchbyHour.bind(this);
    }
    setRef=element=>{
        this.setState({
            elementInmView:element
        },()=>this.handleScrollIntoElement())
    }
    handleScrollIntoElement=()=>{
        let nodeEl;
        if(this.state.elementInmView !==null){
            nodeEl = ReactDom.findDOMNode(this.state.elementInmView);
        }
        if(nodeEl!==undefined){
            nodeEl.scrollIntoView()
        }
    }
    handleSwitchAllDay = ()=>{
        this.setState((ps)=>({
            showAllDay:!ps.showAllDay,
            showListByHour:ps.showAllDay
        }))
    }
    handleSwitchbyHour = ()=>{
        this.setState((ps)=>({
            showListByHour:!ps.showListByHour,
            showAllDay:ps.showListByHour
        }))
    }
    componentWillMount(){
        this.setState({
            showAllDay:false,
            showListByHour:true
        })
    }
    render(){
        const day = this.props.day;
        let eventsShow=this.props.eventsShow? 'show':'hide';
        const greyout=this.props.eventsShow?'greyout':'';
        const hours = helper.getHours();
        const current = helper.getCurrentTime();
        
        return(
            
            <div>
                <div onClick={this.props.close} className={greyout}></div>
                {day !== undefined && day.data !==undefined?
                <div className={'eventlist '+eventsShow}>
                    <span className="pointer close" onClick={this.props.close}>&times;</span>
                    <div  className='title'>
                        <p>
                            <strong>{day.weekday} {day.dateNum} {day.monthName} - Event List:</strong>
                        </p>
                    </div>
                    <hr  style={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: .5,
                        borderColor : '#000000'
                    }}/>
                    {!this.state.showAllDay && day.data.filter(data=>(data.from===""&&data.to==="")).length>0?
                        <div>
                        <div className='d-inline-block'>
                            <Button onClick={this.handleSwitchAllDay} buttonText="All Day Events">
                                <span className="event-badge">{day.data.filter(data=>(data.from===""&&data.to==="")).length}</span>
                            </Button>
                        </div>
                            <ul>
                                {hours.map((hour,i)=>{
                                    return (
                                        <li key={i}>
                                            <span>
                                                {hour}
                                            </span>
                                            {day.data
                                                .map(data=>{
                                                    return(
                                                    <span key={data.eventId}>
                                                        <div>
                                                            {data.from===hour||data.to===hour?
                                                                <div ref={current===hour||hour==="08:00"?this.setRef:null}>
                                                                    <p>From h:{data.from} to h:{data.to}</p>
                                                                <hr  style={{
                                                                    color: '#1C77C3',
                                                                    backgroundColor: '#1C77C3',
                                                                    height: .3,
                                                                    borderColor : '#1C77C3'
                                                                }}/> 
                                                                <p>"{data.eventName}"</p></div>
                                                            :null}
                                                        </div>
                                                    </span>
                                                    )
                                                })
                                            }
                                        </li> 
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        :
                        <div>
                            <div className='d-inline-block'>
                                <Button onClick={this.handleSwitchbyHour} buttonText="Events Today">
                                    <span className="event-badge">{day.data.filter(data=>(data.from!==""&&data.to!=="")).length}</span>
                                </Button>
                            </div>
                            <ul>
                                {day.data.filter(data=>(data.from===""&&data.to===""))
                                    .map(data=>{
                                        return(
                                        <li key={data.eventId}>
                                            <p>"All day event"</p>
                                            <hr  style={{
                                                color: '#1C77C3',
                                                backgroundColor: '#1C77C3',
                                                height: .3,
                                                borderColor : '#1C77C3'
                                            }}/> 
                                            <p>"{data.eventName}"</p>
                                        </li>)
                                    })
                                }
                            </ul>
                        </div>
                    }
                <Button onClick={this.props.close} buttonText='Close'/>     
                </div>:null}
            </div>  
        )
    }
}
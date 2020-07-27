import React from 'react';
import Button from '../button/button'
import './eventList.css'

export default class EventList extends React.Component{
    render(){
        const day = this.props.day
        let eventsShow=this.props.eventsShow? 'show':'hide';
        const greyout=this.props.eventsShow?'greyout':'';
        return(
            <div>
                <div onClick={this.props.close} className={greyout}></div>
                {day !== undefined && day.data !==undefined?
                <div className={'eventlist '+eventsShow}>
                    <div  className='title'>
                        <p><strong>{day.weekday} {day.dateNum} {day.monthName} - Event List:</strong></p>
                    </div>
                    
                    <hr  style={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: .5,
                        borderColor : '#000000'
                    }}/>
                    <ul>
                        {day.data.map(data=>{
                            return (
                                <li key={data.eventId}>
                                    {data.from === ''&&data.to=== ''?
                                        <p>"All day event"</p>
                                        :<p>From h:{data.from} to h:{data.to}</p>
                                    }
                                    <hr  style={{
                                        color: '#1C77C3',
                                        backgroundColor: '#1C77C3',
                                        height: .3,
                                        borderColor : '#1C77C3'
                                    }}/> 
                                    <p>"{data.eventName}"</p>
                                </li> 
                                )
                        })}
                    </ul>
                <Button onClick={this.props.close} buttonText='Close'/>     
                </div>:null}
            </div>  
        )
    }
}
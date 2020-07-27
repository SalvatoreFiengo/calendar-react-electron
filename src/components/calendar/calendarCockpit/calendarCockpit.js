import React from 'react';
import Button from '../../button/button';
import './calendarCockpit.css';
import {monthNames, monthNumbers}  from '../../../variables/commons';

export default class CalendarCockpit extends React.Component{
    render(){
        return(
            <div className='calendar-cockpit-main'>
                <Button 
                    buttonClass='button prev' 
                    type="button" 
                    onClick={this.props.handlePrevClick} 
                    buttonText="Prev"/> 
                <div className='text-center select-wrapper'>
                    <select 
                        className='button' 
                        value={this.props.n} 
                        name='months' 
                        onChange={this.props.handleMonthOnChange}>
                        {monthNumbers.map((month,i)=>{
                            return(
                                <option 
                                    value={month} 
                                    key={i}> 
                                    {monthNames[month]}
                                </option>
                                )
                            })}
                    </select> 
                </div>
                <div className='text-center select-wrapper'>
                    <select 
                        className='button' 
                        value={this.props.currentYear} 
                        name='years'
                        onChange={this.props.handleYearOnChange}>
                    {this.props.yearList.map((year,i)=>{
                        return(
                            <option 
                                value={year} 
                                key={i}> {year}
                            </option>
                            )
                        })}
                    </select> 
                </div>
                <Button 
                    buttonClass='button next' 
                    type="button" 
                    onClick={this.props.handleNextClick} 
                    buttonText="Next"/>
            </div>

        )
    }
}
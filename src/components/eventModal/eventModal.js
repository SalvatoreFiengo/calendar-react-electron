import React from 'react';
import Button from '../button/button'
import {monthNames} from '../../variables/commons';
import './eventModal.css'

export default class EventModal extends React.Component{
    render(){
        const day = this.props.day
        const data = this.props.data || [];
        const modalshow=this.props.modalShow? 'modal show':'modal hide';
        const greyout=this.props.modalShow?'greyout':'';
        const details = this.props.showDetails?'details show':'details hide'
        return(
            <div>
                <div onClick={this.props.closeModal} className={greyout}></div>
                <div key={data.eventId} className={modalshow}>
                    <div className={details}>
                        <div className='modal-title'>
                            {day!==null && day!==undefined?<p>{day.weekday} {day.dateNum} {monthNames[day.month]} {day.year}</p>:null} <span className="pointer close" onClick={this.props.closeModal}>&times;</span>
                        </div>
                        <div className='modal-main-content'>
                            <p className='modal-content-title'> {data.eventName || ""} </p>
                            <div className='modal-body'>
                                <p className='modal-content-body'> {data.description || ""}</p>
                            </div> 
                        </div>
                        <div className='modal-footer'>
                            <Button onClick={this.props.closeModal} buttonClass="button modal-button" type="button" buttonText="Close"/>
                        </div>
                    </div>
                </div> 
            </div>   
        )
    }
}
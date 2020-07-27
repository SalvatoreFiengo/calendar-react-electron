import React from 'react';
import Button from '../../button/button'

export default class EventForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            eventForm: {},
            dates: this.props.dates,
            deltaDays:0
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
        let input = e.target;
        let value = input.value;
        let form = this.state.eventForm
        form[input.name]=value;
        form['date']=this.props.date
        form['month']=this.props.month;
        form['year']=this.props.year;
        this.setState({
            eventForm:form
        })
    }
    componentDidMount(){
    }
    render(){
        return(
        <div>
            <form onSubmit={(e)=>this.props.addEvent(e,this.state.eventForm)}>
                <h2 className='text-center'>Add Event:</h2>
                <div>
                    <div>
                        <label>Event Name:
                            <input value={this.state.eventForm.eventName || ''} name='eventName' type='text' onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div>
                        <label>Event Description:
                            <input name='description' value={this.state.eventForm.description || ''} type='text' onChange={this.handleChange}/> 
                        </label> 
                    </div>
                    <div>
                        <label>Time:
                            <input type='text' value='08:00' onChange={this.handleChange}/>
                        </label>
                    </div>
                </div>
                <Button type='submit' buttonText='Add Event'/>
            </form>
        </div>)
    }
}
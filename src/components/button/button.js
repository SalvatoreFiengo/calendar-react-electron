import React from 'react';
import './button.css'

export default class Button extends React.Component{

    render(){
        return (
            <button 
                className={this.props.buttonClass!==undefined?this.props.buttonClass:"button"}
                onClick={this.props.onClick} 
                type={this.props.type!==undefined?this.props.type:""}
                >
                    {this.props.buttonText} {this.props.children}
            </button>
            )
    }
}

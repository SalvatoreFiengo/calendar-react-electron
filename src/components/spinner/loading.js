import React from 'react';
import './loading.css'

export default class Loading extends React.Component{

    render(){
        return <div><div className="grayout"></div><div className="square-animation"></div></div>
    }
}
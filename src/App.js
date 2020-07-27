import React from 'react';
import Loading from './components/spinner/loading';
import './App.css';
import Calendar from './components/calendar/calendar';
import {dataMock} from './variables/commons'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:false,
    }
  }

  render(){
    return (
      <div className="text-center">
        <header className="App-header">
        {this.state.loading?
          <Loading/>:null
        }
  
        <Calendar 
          handleNextClick={this.handleNextClick} 
          handlePrevClick={this.handlePrevClick} 
          data={dataMock}/>
        </header>
      </div>
    );
  }
}
export default App;

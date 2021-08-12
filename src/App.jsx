import './App.css';
import React, { Component } from 'react';
import AppForm from './components/AppForm';
import CallStatus from './components/CallStatus';
import io from 'socket.io-client';


class App extends Component {


  state = {
    socket:null,
    callStatus:""
  }

  componentDidMount() {
    this.onSocketIOEvents();
  } 
  onSocketIOEvents = async () => {
      const newSocket = io('http://localhost:5000/');
    
      newSocket.on('disconnect', () => {
        alert('The server crashed or restarted');
      });

      newSocket.on('callStatus', (obj) => {
        const {data} = obj
        this.handleCallStatus(data);
      })
 
      newSocket.on('invalidNumber', (obj) => {
        const {data} = obj
        alert("invalid phone number: " + data);
      })
       

      this.setState({socket: newSocket});
  };

  handleCallStatus = (data) => {
    if(data != 'initiated' && data != 'ringing' && data != 'in-progress'){
      if(data == 'completed'){
        this.setState({callStatus:'call end'})
      }else{
        this.setState({callStatus:'no answer'})
      }
        const time = setTimeout(() => {
          this.setState({callStatus:''})       
        }, 3000)
        if(this.state.callStatus == ''){
          clearTimeout(time)
        }
    }
    else{
      this.setState({callStatus:data})
    }
  }

  handleSubmit = async (e, phone_number) => {
    e.preventDefault();
    try {
      this.state.socket.emit('CallPhoneNumber', {data : phone_number})
    } catch (error) {
      console.log(error);
    }
  };

render(){
  const {callStatus} = this.state
  return (
    <div className="App" >
     <AppForm handleSubmit={this.handleSubmit}></AppForm>
     <CallStatus callStatus={callStatus}></CallStatus>
    </div>
  );
}
}

export default App;

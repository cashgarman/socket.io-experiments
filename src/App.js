import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  subscribeToTimer,
  subscribeToCounter,
  subscribeToUsers,
  incrementCounter,
  changeUsername
} from './api';
import Clock from './components/Clock'
import {
  Header,
  Container,
  Button,
  Divider,
  Input,
} from 'semantic-ui-react'

class App extends Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      timestamp: 'no timestamp yet',
      counter: 0,
      users: []
    }

    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp
    }))

    subscribeToCounter((err, counter) => this.setState({ 
      counter
    }))

    subscribeToUsers((err, users) => this.setState({ 
      users
    }))
  }

  incrementCounter()
  {
    console.log('Incrementing')
    incrementCounter()
  }

  handleMessage(e)
  {
    if(e.keyCode === 13)
    {
      changeUsername(e.target.value)
      e.target.value = ''
    }
  }

  render()
  {
    return (
      <Container text>
        <Header>Socket.io Experiments</Header>
        <Divider/>
        <Clock time={this.state.timestamp}/>
        Counter: {this.state.counter}<br/>
        <ul>
          {this.state.users.map(u => <li key={u}>{u}</li>)}
        </ul>
        <Button onClick={this.incrementCounter.bind(this)}>Increment Counter</Button>
        <Input onKeyDown={this.handleMessage} placeholder='Change Username...'/>
      </Container>
    )
  }
}

export default App;

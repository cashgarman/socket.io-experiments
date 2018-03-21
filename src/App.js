import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  subscribeToTimer,
  subscribeToCounter,
  subscribeToUsers,
  subscribeToChat,
  incrementCounter,
  changeUsername,
  sendChat,
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
      timestamp: 'N/A',
      counter: 0,
      chat: [],
      users: [],
      messages: [],
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

    subscribeToChat((err, chat) => this.setState({ 
      chat
    }))
  }

  incrementCounter()
  {
    console.log('Incrementing')
    incrementCounter()
  }

  handleUsernameChange(e)
  {
    if(e.keyCode === 13)
    {
      changeUsername(e.target.value)
      e.target.value = ''
    }
  }

  handleChatMessage(e)
  {
    if(e.keyCode === 13)
    {
      sendChat(e.target.value)
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
        <Button onClick={this.incrementCounter.bind(this)}>Increment</Button><br/>
        <Input onKeyDown={this.handleUsernameChange} placeholder='Change Username...'/><br/>
        <Input onKeyDown={this.handleChatMessage} placeholder='Chat...'/><br/>
        <ul>
          {this.state.chat.map(m => <li key={m}>{m}</li>)}
        </ul>
      </Container>
    )
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  subscribeTo,
  incrementCounter,
  changeUsername,
  sendChat,
  getRandom,
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
      time: 'N/A',
      random: 'N/A',
      counter: 0,
      chat: [],
      users: [],
      messages: [],
    }

    subscribeTo({
      'time': time => this.setState({time}),
      'random': random => this.setState({random}),
      'counter': counter => this.setState({counter}),
      'users': users => this.setState({users}),
      'chat': chat => this.setState({chat}),
    })
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
        <Clock time={this.state.time}/>
        Counter: {this.state.counter}<br/>
        Random: <a href='#' onClick={getRandom}>{this.state.random}</a><br/>
        <ul>
          {this.state.users.map(u => <li key={u}>{u}</li>)}
        </ul>
        <Button onClick={incrementCounter}>Increment</Button><br/>
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

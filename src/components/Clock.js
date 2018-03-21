import React, { Component } from 'react';

export default class Clock extends Component
{
  render()
  {
    return (
    <p>
        {this.props.time}
    </p>
    )
  }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bracket from './bracket'
import { single, double } from './data'
import './ui/themes/ng.css'
export default class Example extends Component {

  render() {
    return (
      <Bracket matches={double} />
    )
  }
};

import React from 'react';
import ReactDOM from 'react-dom';
import Example from './brackets';
import registerServiceWorker from './registerServiceWorker';

import Bracket from './bracket'
import { single, double } from './data'
console.log(double)
ReactDOM.render(<Bracket matches={double} />, document.getElementById('root'));
registerServiceWorker();

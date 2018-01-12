import _ from 'lodash';
import { printMe } from './print';
import '../styles/main.scss';
// import Icon from '../img/webpack-small.svg';
// import Big from '../img/big.jpg';

const component = () => {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  // const myIcon = new Image();
  // myIcon.src = Icon;

  // element.appendChild(myIcon);

  return element;
};

if (process.env.NODE_ENV === 'production') {
  console.log('in prod env!');
} else if (process.env.NODE_ENV === 'development') {
  console.log('in dev env!');
}

document.body.appendChild(component());

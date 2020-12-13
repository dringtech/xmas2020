import './style.css';
import p5 from './utils/p5';
import * as sketch from './sketch';

const { mount } = p5;

mount(document.querySelector('main'), sketch);

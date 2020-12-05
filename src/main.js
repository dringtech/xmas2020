import './style.css';
import p5 from './utils/p5';
import { setup, draw, windowResized } from './sketch';

const { mount } = p5;

mount(document.querySelector('main'), { setup, draw, windowResized });

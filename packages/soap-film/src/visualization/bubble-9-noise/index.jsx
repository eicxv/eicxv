import bubbleComponentFactory from '../bubble-component-factory';
import createBubble from './bubble';
import frag from './soap.frag';
import vert from './soap.vert';

export default bubbleComponentFactory(vert, frag, createBubble);

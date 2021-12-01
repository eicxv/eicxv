import React, { useState, useRef } from 'react';
import {
  Typography,
  Slider,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import Controls from './controls';

import { clamp } from 'utility/src/generic';

const saveBlob = function (blob, fileName) {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
};

const initialSettings = {
  u_feed: 0.082,
  u_kill: 0.06,
  u_diffusion: [0.2, 0.1],
  u_brushRadius: 10,
  u_brushConcentration: true,
  u_visualizeV: true,
  stepsPerFrame: 8,
};

export default function RDControls({ RDRef }) {
  const [settings, setSettings] = useState(initialSettings);

  const captureCanvas = () => {
    RDRef.current._runVisualize();
    RDRef.current.gl.canvas.toBlob((blob) => {
      saveBlob(blob, `reaction-diffusion-screencapture.png`);
    });
  };

  const createUpdate = (unif) => {
    return (event, value) => {
      RDRef.current.setUniform(unif, value);
      setSettings({ ...settings, [unif]: value });
    };
  };
  const controlsConfig = [
    {
      type: 'folder',
      name: 'general controls',
      content: [
        {
          type: 'button',
          name: 'start',
          update: () => RDRef.current.start(),
          props: {},
        },
        {
          type: 'button',
          name: 'stop',
          update: () => RDRef.current.stop(),
          props: {},
        },
        {
          type: 'button',
          name: 'save as image',
          update: captureCanvas,
          props: {},
        },
        {
          id: 'stepsPerFrame',
          name: 'steps per frame',
          update: (e, value) => {
            RDRef.current.stepsPerFrame = value;
            setSettings({ ...settings, stepsPerFrame: value });
          },
          props: {
            min: 1,
            max: 50,
            step: 1,
          },
          type: 'slider',
        },
      ],
    },
    {
      type: 'folder',
      name: 'visulization controls',
      content: [
        {
          type: 'toggle',
          id: 'u_visualizeV',
          name: 'Compound to visualize',
          update: (event, value) => {
            RDRef.current.setUniform('u_visualizeV', value);
            setSettings({ ...settings, u_visualizeV: value });
            RDRef.current._runVisualize();
          },
          props: {
            alternatives: [
              { name: 'U', value: false },
              { name: 'V', value: true },
            ],
          },
        },
      ],
    },
    {
      type: 'folder',
      name: 'reaction-diffusion controls',
      content: [
        {
          id: 'u_feed',
          name: 'feed',
          update: createUpdate('u_feed'),
          props: {
            min: 0,
            max: 0.15,
            step: 0.0001,
          },
          type: 'slider',
        },
        {
          id: 'u_kill',
          name: 'kill',
          update: createUpdate('u_kill'),
          props: {
            min: 0,
            max: 0.15,
            step: 0.0001,
          },
          type: 'slider',
        },
      ],
    },
    {
      type: 'folder',
      name: 'brush controls',
      content: [
        {
          id: 'u_brushRadius',
          name: 'brush size',
          update: createUpdate('u_brushRadius'),
          props: {
            min: 1,
            max: 100,
            step: 0.5,
          },
          type: 'slider',
        },
        {
          type: 'toggle',
          id: 'u_brushConcentration',
          name: 'Compound to Brush',
          update: (event, value) => {
            let concentration = value ? [1, 0] : [0, 1];
            RDRef.current.setUniform('u_brushConcentration', concentration);
            setSettings({ ...settings, u_brushConcentration: value });
          },
          props: {
            alternatives: [
              { name: 'U', value: false },
              { name: 'V', value: true },
            ],
          },
        },
        {
          type: 'toggle',
          id: 'u_brushConcentration',
          name: 'Compound to Brush',
          update: (event, value) => {
            RDRef.current.setUniform('u_noise', value.noise);
            RDRef.current.setUniform('u_fillConcentration', value.fill);
            RDRef.current.initialize();
          },
          props: {
            alternatives: [
              { name: 'Noise', value: { noise: true, fill: [0, 0] } },
              { name: 'Fill U', value: { noise: false, fill: [1, 0] } },
              { name: 'Fill V', value: { noise: false, fill: [0, 1] } },
            ],
          },
        },
      ],
    },
  ];

  return <Controls controls={controlsConfig} values={settings} />;
}

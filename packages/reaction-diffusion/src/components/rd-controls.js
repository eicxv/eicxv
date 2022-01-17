import React, { useState, useRef } from 'react';
import Controls from './controls';

import ParameterMapControl from './parameter-map-control';
import Presets from './presets';

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
  u_brushConcentration: 'U',
  u_visualizeV: 'V',
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
    return (value) => {
      RDRef.current.setUniform(unif, value);
      setSettings({ ...settings, [unif]: value });
    };
  };
  const setParams = (value) => {
    RDRef.current.setUniform('u_feed', value.u_feed);
    RDRef.current.setUniform('u_kill', value.u_kill);
    setSettings(() => ({ ...settings, ...value }));
  };
  const controlsConfig = [
    {
      type: 'folder',
      name: 'General',
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
          name: 'Steps per Frame',
          update: (value) => {
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
    // {
    //   type: 'folder',
    //   name: 'visulization controls',
    //   content: [
    //     {
    //       type: 'toggleGroup',
    //       id: 'u_visualizeV',
    //       name: 'Compound to Visualize',
    //       update: (value) => {
    //         const valueBool = value == 'V';
    //         RDRef.current.setUniform('u_visualizeV', valueBool);
    //         setSettings({ ...settings, u_visualizeV: value });
    //         RDRef.current._runVisualize();
    //       },
    //       props: {
    //         type: 'single',
    //       },
    //       items: [
    //         { name: 'U', props: { value: 'U' } },
    //         { name: 'V', props: { value: 'V' } },
    //       ],
    //     },
    //   ],
    // },
    {
      type: 'folder',
      name: 'Reaction-Diffusion',
      content: [
        {
          id: 'u_feed',
          name: 'Feed',
          update: createUpdate('u_feed'),
          props: {
            min: 0,
            max: 0.3,
            step: 0.0001,
          },
          type: 'slider',
        },
        {
          id: 'u_kill',
          name: 'Kill',
          update: createUpdate('u_kill'),
          props: {
            min: 0,
            max: 0.08,
            step: 0.0001,
          },
          type: 'slider',
        },
        {
          name: 'parameter-map',
          type: 'custom',
          component: ParameterMapControl,
          props: {
            parameters: settings,
            setParameters: setParams,
          },
        },
      ],
    },
    {
      type: 'folder',
      name: 'Brush',
      content: [
        {
          id: 'u_brushRadius',
          name: 'Brush Size',
          update: createUpdate('u_brushRadius'),
          props: {
            min: 1,
            max: 100,
            step: 0.5,
          },
          type: 'slider',
        },
        {
          type: 'toggleGroup',
          id: 'u_brushConcentration',
          name: 'Brush Colour',
          update: (value) => {
            const valueBool = value == 'V';
            const concentration = valueBool ? [0, 1] : [1, 0];
            RDRef.current.setUniform('u_brushConcentration', concentration);
            setSettings({ ...settings, u_brushConcentration: value });
          },
          props: {
            type: 'single',
          },
          items: [
            { name: 'U', props: { value: 'U' } },
            { name: 'V', props: { value: 'V' } },
          ],
        },
        {
          type: 'toggleGroup',
          id: 'u_brushConcentration',
          name: 'Clear Canvas',
          update: (value) => {
            const rd = RDRef.current;
            rd.setUniform('u_noise', value === 'noise');
            let fill = [1, 0];
            switch (value) {
              case 'fillU':
                fill = [1, 0];
                break;
              case 'fillV':
                fill = [0, 1];
                break;
              case 'stable':
                fill = rd.stableConcentration();
                break;
            }
            rd.setUniform('u_fillConcentration', fill);
            rd.initialize();
          },
          props: {
            defaultValue: null,
            type: 'single',
          },
          items: [
            {
              name: 'Noise',
              props: { value: 'noise' },
            },
            {
              name: 'Fill U',
              props: { value: 'fillU' },
            },
            {
              name: 'Fill V',
              props: { value: 'fillV' },
            },
            {
              name: 'Stable',
              props: { value: 'stable' },
            },
          ],
        },
      ],
    },
    {
      type: 'folder',
      name: 'Presets',
      content: [
        {
          name: 'presets',
          type: 'custom',
          component: Presets,
          props: {
            RDRef,
            settings,
            setSettings,
          },
        },
      ],
    },
  ];

  return <Controls controls={controlsConfig} values={settings} />;
}

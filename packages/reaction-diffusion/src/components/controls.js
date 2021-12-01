import React, { useState, useRef } from 'react';
import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
} from '@mui/material';

import Toggle from './toggle-button-group';
import SliderWithText from './slider-with-text-input';

import { clamp } from '@eicxv/utility/src/generic';

export default function Controls({ controls, values }) {
  const renderControl = (control) => {
    switch (control.type) {
      case 'toggle':
        return (
          <>
            {values[control.id]}
            <Toggle
              {...control.props}
              key={control.name}
              name={control.name}
              value={values[control.id]}
              onChange={control.update}
            />
          </>
        );
      case 'slider':
        return (
          <SliderWithText
            {...control.props}
            key={control.name}
            name={control.name}
            value={values[control.id]}
            onValid={control.update}
          />
        );
      case 'button':
        return (
          <Button
            {...control.props}
            key={control.name}
            onClick={control.update}
          >
            {control.name}
          </Button>
        );
      case 'folder':
        return (
          <Accordion key={control.name}>
            <AccordionSummary>
              <Typography>{control.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {control.content.map(renderControl)}
            </AccordionDetails>
          </Accordion>
        );
      default:
        return null;
    }
  };
  return <>{controls.map(renderControl)}</>;
}

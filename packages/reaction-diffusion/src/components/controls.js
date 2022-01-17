import React from 'react';

import {
  Button,
  Box,
  Flex,
  Switch,
  Slider,
  ToggleGroup,
  ToggleGroupItem,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@eicxv/ui';

import SliderWithText from './slider-with-text-input';
import Folder from './folder';

export default function Controls({ controls, values }) {
  return (
    <>
      {controls.map((item) => (
        <RenderControl key={item.name} control={item} values={values} />
      ))}
    </>
  );
}

function RenderControl({ control, values }) {
  switch (control.type) {
    case 'toggleGroup':
      return (
        <div>
          {control.name}
          <ToggleGroup
            {...control.props}
            key={control.name}
            name={control.name}
            value={values[control.id]}
            onValueChange={control.update}
          >
            {control.items.map((item) => (
              <ToggleGroupItem {...item.props} key={item.name}>
                {item.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      );
    case 'slider':
      return (
        <SliderWithText
          {...control.props}
          key={control.name}
          name={control.name}
          value={values[control.id]}
          onValidValue={control.update}
        />
      );
    case 'button':
      return (
        <Button {...control.props} key={control.name} onClick={control.update}>
          {control.name}
        </Button>
      );
    case 'folder':
      return (
        <Folder name={control.name}>
          {control.content.map((item) => (
            <RenderControl key={item.name} control={item} values={values} />
          ))}
        </Folder>
      );
    // case 'accordion':
    //   return (
    //     <Accordion key={control.name} type="multiple">
    //       {control.items.map((item) => (
    //         <AccordionItem key={item.name} value={item.name}>
    //           <AccordionTrigger>{item.name}</AccordionTrigger>
    //           <AccordionContent>
    //             {item.content.map(RenderControl)}
    //           </AccordionContent>
    //         </AccordionItem>
    //       ))}
    //     </Accordion>
    //   );
    case 'custom':
      const Component = control.component;
      return <Component {...control.props} />;
    default:
      return null;
  }
}

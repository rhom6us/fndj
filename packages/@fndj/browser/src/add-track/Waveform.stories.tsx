import * as React from 'react';

import { ComponentStory, ComponentMeta } from '@rhom6us/heft-storybook-storykit';

import { Waveform, WaveformProps } from './Waveform';

export default {
    title: 'Octogonz/ToggleSwitch',
    component: Waveform,
    argTypes: {
      leftColor: { control: 'color' },
      rightColor: { control: 'color' }
    }
  } as ComponentMeta<typeof Waveform>;
  
  const Template: ComponentStory<typeof Waveform> = (args) => <Waveform {...args} />;
  
  // eslint-disable-next-line
  export const Primary: any = Template.bind({});
  Primary.args = {};
  
  // eslint-disable-next-line
  export const Secondary: any = Template.bind({});
  Secondary.args = {};
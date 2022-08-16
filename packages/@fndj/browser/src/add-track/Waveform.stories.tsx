import React from 'react';

import { ComponentStory, StoryObj, ComponentMeta } from '@rhom6us/heft-storybook-storykit';

import { Waveform, WaveformProps } from './Waveform';

// export default {
//     title: 'Octogonz/ToggleSwitch',
//     component: Waveform,
//     argTypes: {
//       leftColor: { control: 'color' },
//       rightColor: { control: 'color' }
//     },
//     decorators: [
//       (Story) => (
//         <div style={{ margin: '3em', background:'yellow' }}>
//           <Story />
//         </div>
//       ),
//     ],
//   } as ComponentMeta<typeof Waveform>;
  
//   const Template: ComponentStory<typeof Waveform> = (args) => <Waveform {...args} />;
  
//   // eslint-disable-next-line
//   export const Primary: any = Template.bind({});
//   Primary.args = {};
  
//   // eslint-disable-next-line
//   export const Secondary: any = Template.bind({});
//   Secondary.args = {};

  // CSF 3.0 - explicit render function
export default {component: Waveform}

export const Primary = { args: { primary: true } };
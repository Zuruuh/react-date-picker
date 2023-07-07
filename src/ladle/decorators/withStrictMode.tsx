import { StoryDecorator } from '@ladle/react';
import { StrictMode } from 'react';

export const withStrictMode: StoryDecorator = (Component) => (
  <StrictMode>
    <Component />
  </StrictMode>
);

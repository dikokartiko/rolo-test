'use client';

import { chakra, HTMLChakraProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const Separator = forwardRef<HTMLHRElement, HTMLChakraProps<'hr'>>(
  function Separator(props, ref) {
    return <chakra.hr ref={ref} {...props} />;
  }
);
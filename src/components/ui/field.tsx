'use client';

import { Field as ChakraField, type FieldLabelProps, type FieldErrorTextProps } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';

interface FieldProps extends PropsWithChildren {
  id: string;
  label: ReactNode;
  errorText?: ReactNode;
}

export const Field = ({ id, label, errorText, children }: FieldProps) => {
  return (
    <ChakraField.Root id={id} invalid={!!errorText}>
      <ChakraField.Label {...({ children: label } as FieldLabelProps)} />
      {children}
      {errorText && (
        <ChakraField.ErrorText {...({ children: errorText } as FieldErrorTextProps)} />
      )}
    </ChakraField.Root>
  );
};

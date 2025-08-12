'use client';

import {
  Box,
  Button,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Street address is required'),
  unit: z.string().optional(),
  postal: z.string().min(6, 'Invalid postal code'),
});

type FormValues = z.infer<typeof schema>;

export const CustomerDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    const response = await fetch('/api/details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Form submitted successfully');
    } else {
      console.error('Form submission failed');
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      w={{ base: '100%', md: '50%' }}
      mx="auto"
    >
      <Stack gap={6}>
        <Field
          id="name"
          label="Your Name"
          errorText={errors.name && errors.name.message}
        >
          <Input placeholder="James Hoffman" {...register('name')} />
        </Field>

        <Field
          id="email"
          label="Email Address"
          errorText={errors.email && errors.email.message}
        >
          <Input placeholder="james@gmail.com" {...register('email')} />
        </Field>

        <Field
          id="address"
          label="Street Address"
          errorText={errors.address && errors.address.message}
        >
          <Input
            placeholder="1 Sesame Street, Big Bird Building"
            {...register('address')}
          />
        </Field>

        <Field id="unit" label="Unit / House Number (Optional)">
          <Input placeholder="#12-34" {...register('unit')} />
        </Field>

        <Field
          id="postal"
          label="Postal Code"
          errorText={errors.postal && errors.postal.message}
        >
          <Input placeholder="123456" {...register('postal')} />
        </Field>
      </Stack>
      <Button
        type="submit"
        disabled={!isValid}
        opacity={isValid ? 1 : 0.5}
        mt={6}
        w="100%"
      >
        Make Payment
      </Button>
    </Box>
  );
};
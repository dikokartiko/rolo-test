'use client';

import {
  Box,
  Input,
  Stack,
  Flex,
  Separator
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Street address is required'),
  unit: z.string().optional(),
  postal: z.string().min(6, 'Invalid postal code'),
});

type FormValues = z.infer<typeof schema>;

interface CustomerDetailsFormProps {
  onValidChange: (isValid: boolean) => void;
  onSubmit: (data: FormValues) => void;
}

export const CustomerDetailsForm = ({
  onValidChange,
  onSubmit: parentOnSubmit,
}: CustomerDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  const handleFormSubmit = async (data: FormValues) => {
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
    parentOnSubmit(data);
  };


  return (
    <Box
      as="form"
      id="customer-details-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      maxW="680px"
      mx="auto"
    >
      <Stack direction="column" gap="40px">
        <Flex gap="20px">
          <Box flex="1">
            <Field
              id="name"
              label="Your Name"
              errorText={errors.name && errors.name.message}
            >
              <Input placeholder="Joshua" {...register('name')} p="15px 10px" />
            </Field>
          </Box>
          <Box flex="1">
            <Field
              id="email"
              label="Email Address"
              errorText={errors.email && errors.email.message}
            >
              <Input
                placeholder="james@gmail.com"
                {...register('email')}
                p="15px 10px"
              />
            </Field>
          </Box>
        </Flex>
        <Separator />
        <Field
          id="address"
          label="Street Address"
          errorText={errors.address && errors.address.message}
        >
          <Input
            placeholder="67 Ayer Rajah Crescent"
            {...register('address')}
            p="15px 10px"
          />
        </Field>
        <Flex gap="20px">
          <Box flex="1">
            <Field id="unit" label="Unit / House Number (Optional)">
              <Input placeholder="#03-05" {...register('unit')} p="15px 10px" />
            </Field>
          </Box>
          <Box flex="1">
            <Field
              id="postal"
              label="Postal Code"
              errorText={errors.postal && errors.postal.message}
            >
              <Input
                placeholder="139950"
                {...register('postal')}
                p="15px 10px"
              />
            </Field>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};
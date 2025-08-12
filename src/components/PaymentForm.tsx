'use client';

import {
  VStack,
  Heading,
  Input,
  Text,
  Button,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  clientSecret: string;
}

export default function PaymentForm({ clientSecret }: PaymentFormProps) {
  return (
    <VStack w="full" gap={6} align="stretch">
      <Heading as="h2" size="md">
        Pay with PayNow
      </Heading>
      <Field label="Email" id="email">
        <Input placeholder="email@example.com" />
      </Field>
      <Field label="Name" id="name">
        <Input placeholder="Name" />
      </Field>
      <Text fontWeight="bold">Payment method</Text>
      {clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <Button
        bg="#1A75FF"
        color="white"
        fontSize="14px"
        fontWeight="400"
        h={{ base: '44px', md: '46px' }}
        px="20px"
        borderRadius="4px"
        _hover={{
          bg: '#005CE6',
        }}
        type="submit"
        form="checkout-form"
      >
        Pay
      </Button>
      <Text fontSize="sm" color="gray.500" mt={4} textAlign="center">
        Powered by stripe | Terms Privacy
      </Text>
    </VStack>
  );
}
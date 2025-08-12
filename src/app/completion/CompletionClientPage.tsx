'use client';

import { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CompletionComponent() {
  const stripe = useStripe();
  const router = useRouter();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          setStatus('succeeded');
          setTimeout(() => {
            router.push('/');
          }, 10000);
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          setStatus('processing');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          setStatus('error');
          break;
        default:
          setMessage('Something went wrong.');
          setStatus('error');
          break;
      }
    });
  }, [stripe, router]);

  return (
    <Container maxW="container.md" py={10}>
      <VStack gap={6} textAlign="center">
        <Heading as="h1" size="xl">
          {status === 'succeeded' && 'Thank you for your order!'}
          {status === 'processing' && 'Payment Processing'}
          {status === 'error' && 'Payment Failed'}
        </Heading>
        <Text fontSize="lg">{message}</Text>
        {status === 'succeeded' && (
          <Text fontSize="md" color="gray.500">
            You will be redirected to the home page in 10 seconds.
          </Text>
        )}
        <Button onClick={() => router.push('/')}>Back to Home</Button>
      </VStack>
    </Container>
  );
}

export default function CompletionClientPage() {
  return (
    <Elements stripe={stripePromise}>
      <CompletionComponent />
    </Elements>
  );
}
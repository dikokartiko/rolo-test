'use client';

import { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import {
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CompletionComponentProps {
  paymentIntentStatus: string;
}

function CompletionComponent({ paymentIntentStatus }: CompletionComponentProps) {
  const router = useRouter();
  const [status, setStatus] = useState(paymentIntentStatus);
  const [message, setMessage] = useState('');

  useEffect(() => {
    switch (paymentIntentStatus) {
      case 'succeeded':
        setMessage('Payment succeeded!');
        toaster.success({
          title: 'Payment Successful!',
          description: 'Your order has been placed.',
          duration: 5000,
          closable: true,
        });
        setTimeout(() => {
          router.push('/');
        }, 10000);
        break;
      case 'processing':
        setMessage('Your payment is processing.');
        break;
      case 'requires_payment_method':
        setMessage('Your payment was not successful, please try again.');
        break;
      default:
        setMessage('Something went wrong.');
        break;
    }
  }, [paymentIntentStatus, router]);

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

export default function CompletionClientPage({ paymentIntentStatus }: CompletionComponentProps) {
  return (
    <Elements stripe={stripePromise}>
      <CompletionComponent paymentIntentStatus={paymentIntentStatus} />
    </Elements>
  );
}
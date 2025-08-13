import { redirect } from 'next/navigation';
import CompletionClientPage from './CompletionClientPage';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export default async function CompletionPage({
  searchParams,
}: {
  searchParams: { payment_intent_client_secret: string };
}) {
  const { payment_intent_client_secret } = searchParams;

  if (!payment_intent_client_secret) {
    redirect('/');
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_client_secret
    );

    if (!paymentIntent || paymentIntent.status !== 'succeeded') {
      redirect('/');
    }

    return <CompletionClientPage paymentIntentStatus={paymentIntent.status as string} />;
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    redirect('/');
  }
}
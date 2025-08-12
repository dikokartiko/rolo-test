import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: Request) {
  const { items, total } = await request.json();

  if (total <= 0) {
    return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 });
  }

  const cartSummary = items.map((item: any) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // amount in cents
      currency: 'sgd',
      payment_method_types: ['paynow'],
      metadata: {
        items: JSON.stringify(cartSummary),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
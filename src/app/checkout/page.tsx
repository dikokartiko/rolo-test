'use client';

import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Input,
  Grid,
  GridItem,
  Icon,
} from '@chakra-ui/react';
import { Separator } from '../../components/ui/separator';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCoffee } from 'react-icons/fa';
import PaymentForm from '@/components/PaymentForm';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const discountedTotal = total - discount;
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items, router]);

  useEffect(() => {
    const createPaymentIntent = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items, total: discountedTotal }),
        });
        const { clientSecret } = await res.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      } finally {
        setLoading(false);
      }
    };

    if (items.length > 0) {
      createPaymentIntent();
    }
  }, [items, discountedTotal]);

  const handleApplyPromoCode = () => {
    if (promoCode === process.env.NEXT_PUBLIC_PROMO_CODE) {
      setDiscount(total * 0.1);
    }
  };

  return (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} minH="100vh">
      <GridItem
        bg="#FAFAFA"
        py={10}
        px={{ base: 4, md: 10 }}
        display="flex"
        flexDirection="column"
      >
        <HStack gap={4} align="center" mb={10}>
          <Image src="/images/logos/ROLO.png" alt="Rolo Logo" width={32} height={32} />
          <Heading as="h1" size="lg" fontWeight="bold">
            Rolo
          </Heading>
        </HStack>
        <VStack w="full" gap={4} align="stretch" flex="1">
          <Text fontSize="4xl" fontWeight="bold">
            SGD {discountedTotal.toFixed(2)}
          </Text>
          <Separator />
          {items.map((item) => (
            <HStack key={item.id} justify="space-between">
              <Text>{item.name}</Text>
              <Text>SGD {(item.price * item.quantity).toFixed(2)}</Text>
            </HStack>
          ))}
          <Separator />
          <HStack justify="space-between">
            <Text>Subtotal</Text>
            <Text>SGD {total.toFixed(2)}</Text>
          </HStack>
          {discount > 0 && (
            <HStack justify="space-between">
              <Text>Discount</Text>
              <Text>-SGD {discount.toFixed(2)}</Text>
            </HStack>
          )}
          <HStack>
            <Input
              placeholder="Promotion code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button onClick={handleApplyPromoCode}>Apply</Button>
          </HStack>
          <Separator />
          <HStack justify="space-between" fontWeight="bold">
            <Text>Total due</Text>
            <Text>SGD {discountedTotal.toFixed(2)}</Text>
          </HStack>
        </VStack>
      </GridItem>
      <GridItem py={10} px={{ base: 4, md: 10 }}>
        {loading && <Text>Loading...</Text>}
        {clientSecret && !loading && (
          <PaymentForm clientSecret={clientSecret} />
        )}
      </GridItem>
    </Grid>
  );
}
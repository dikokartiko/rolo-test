'use client';
 
import { Box, Container, Heading, Button, Text } from '@chakra-ui/react';
import BottomActionBar from '@/components/ui/BottomActionBar';
import { toaster } from '@/components/ui/toaster';
import { CustomerDetailsForm } from '@/app/details/CustomerDetailsForm';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart';
import { z } from 'zod';
import { IoIosArrowForward } from "react-icons/io";

  const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Street address is required'),
  unit: z.string().optional(),
  postal: z.string().min(6, 'Invalid postal code'),
});
 
type FormValues = z.infer<typeof formSchema>;
 
export default function DetailsPage() {
  const router = useRouter();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items, router]);

  const handleFormSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toaster.success({
          title: 'Success',
          description: 'Your details have been submitted successfully.',
          duration: 3000,
          closable: true,
        });
        router.push('/checkout');
      } else {
        toaster.error({
          title: 'Error',
          description: 'There was an error submitting your details. Please try again.',
          duration: 3000,
          closable: true,
        });
      }
    } catch (error) {
      toaster.error({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        duration: 3000,
        closable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <Container maxW="680px" mt={20} p={8}>
      <Box >
        <Heading as="h1" size="xl" mb={8}>
          Your Details
        </Heading>
        <CustomerDetailsForm
          onValidChange={setIsFormValid}
          onSubmit={handleFormSubmit}
        />
      </Box>
      <BottomActionBar onBack={() => router.back()}>
        <Box fontSize={{ base: '20px', md: '24px' }} fontWeight="400" color="#375737">
          Total ${total.toFixed(2)}
        </Box>
        <Button
          type="submit"
          form="customer-details-form"
          loading={isSubmitting}
          loadingText="Processing..."
          disabled={!isFormValid || isSubmitting}
          bg="#748067"
          color="white"
          fontSize="14px"
          fontWeight="400"
          h={{ base: '44px', md: '46px' }}
          px="20px"
          borderRadius="4px"
          _hover={{ bg: isFormValid ? '#5F6B56' : '#748067' }}
          _active={{ bg: '#4A5444' }}
          opacity={isFormValid ? 1 : 0.5}
        >
          Make Payment <IoIosArrowForward />
        </Button>
      </BottomActionBar>
    </Container>
  );
}

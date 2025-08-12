'use client';

import React, { useEffect } from 'react';
import { Box, Flex, Text, Heading, Button, Image, Separator, VStack, HStack, Icon, Grid } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';
import BottomActionBar from '@/components/BottomActionBar';

const CartPage = () => {
  const { items: cartItems } = useCartStore();
  const router = useRouter();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.discountedPrice || item.price) * item.quantity, 0);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems, router]);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      py={{ base: '20px', md: '40px' }}
    >
      <Flex
        direction="column"
        gap={{ base: '20px', md: '40px' }}
        width={{ base: '90%', md: '680px', lg: '900px' }}
        maxWidth="1200px"
        px={{ base: '0', md: '0' }}
        mx="auto"
        pb="100px" // Add padding to prevent content being obscured by fixed footer
      >
        <Flex direction="column" gap="20px" width="100%">
          <HStack justifyContent="space-between" width="100%">
            <Heading
              as="h2"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="medium"
              lineHeight="1.5em"
              color="gray.900"
            >
              Your Cart
            </Heading>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="normal"
              lineHeight="1.5em"
              color="gray.400"
            >
              {totalItems} items
            </Text>
          </HStack>

          <VStack gap="20px" align="stretch" width="100%">
            {cartItems.map((item, index) => {
              const uniqueKey = `${item.id}-${item.selectedColor?.name || 'default'}-${index}`;
              return (
                <React.Fragment key={uniqueKey}>
                  <Grid
                    templateColumns={{ base: '80px 1fr auto auto', md: '80px 1fr auto auto' }}
                    gap={{ base: '10px', md: '40px' }}
                    alignItems="center"
                    width="100%"
                    height="80px"
                  >
                    <Box
                      width="80px"
                      height="80px"
                      borderRadius="4px"
                      overflow="hidden"
                    >
                      <Image
                        src={item.selectedColor?.image || item.images[0]}
                        alt={`${item.name} ${item.selectedColor?.name || ''}`}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    </Box>
                    <VStack align="flex-start" gap="2px">
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        lineHeight="1.5em"
                        color="gray.900"
                      >
                        {item.name}
                      </Text>
                      {item.selectedColor && (
                        <Text
                          fontSize="sm"
                          fontWeight="light"
                          lineHeight="1.5em"
                          color="gray.600"
                        >
                          {item.selectedColor.name}
                        </Text>
                      )}
                    </VStack>
                    <VStack align="flex-start" gap="2px">
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        lineHeight="1.5em"
                        color="gray.900"
                        justifySelf="end"
                      >
                        ${(item.discountedPrice || item.price) * item.quantity}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="light"
                        lineHeight="1.5em"
                        color="gray.600"
                        justifySelf="end"
                      >
                        {item.quantity} unit{item.quantity > 1 ? 's' : ''}
                      </Text>
                    </VStack>
                  </Grid>
                  {index < cartItems.length - 1 && (
                    <Separator width="100%" borderBottom="1px solid" borderColor="gray.400" />
                  )}
                </React.Fragment>
              );
            })}
          </VStack>
        </Flex>
      </Flex>
      <BottomActionBar onBack={() => window.history.back()}>
        <Box fontSize={{ base: '20px', md: '24px' }} fontWeight="400" color="#375737">
          Total ${totalPrice}
        </Box>
        <Button
          bg="#748067"
          color="white"
          fontSize="14px"
          fontWeight="400"
          h={{ base: '44px', md: '46px' }}
          px="20px"
          borderRadius="4px"
          _hover={{ bg: '#5F6B56' }}
          _active={{ bg: '#4A5444' }}
        >
          Check Out →
        </Button>
      </BottomActionBar>
    </Box>
  );
};

export default CartPage;
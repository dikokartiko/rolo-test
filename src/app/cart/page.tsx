'use client';

import React, { useEffect } from 'react';
import { Box, Flex, Text, Heading, Button, Image, Separator, VStack, HStack, Icon, Spacer, Grid } from '@chakra-ui/react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';

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
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        py="20px"
        px={{ base: '20px', md: '40px' }}
        boxShadow="0px -4px 10px rgba(0, 0, 0, 0.05)"
        zIndex="1000"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          maxWidth="1200px"
          mx="auto"
        >
          <Button
            px="20px"
            py="13px"
            borderRadius="4px"
            bg="gray.100"
            border="1px solid"
            borderColor="gray.200"
            color="gray.600"
            fontWeight="normal"
            fontSize="sm"
            lineHeight="1.5em"
            textAlign="right"
            display="flex"
            alignItems="center"
            gap="10px"
            onClick={() => window.history.back()}
          >
            <Icon as={LuArrowLeft} w="16px" h="16px" />
            <Text>Back</Text>
          </Button>
          <HStack gap="40px">
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="normal"
              lineHeight="1.5em"
              color="green.700"
            >
              Total ${totalPrice}
            </Text>
            <Button
              px="20px"
              py="13px"
              borderRadius="4px"
              bg="green.600"
              color="white"
              fontWeight="normal"
              fontSize="sm"
              lineHeight="1.5em"
              textAlign="right"
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Text>Check Out</Text>
              <Icon as={LuArrowRight} w="16px" h="16px" />
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default CartPage;
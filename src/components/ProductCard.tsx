'use client';

import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box>
      <VStack gap="20px" align="stretch">
        <Box borderWidth="1px" borderColor="#BABFCE" borderRadius="8px" overflow="hidden" h="270px">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={270}
            height={270}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </Box>
        <VStack gap="16px" align="stretch">
          <Flex justify="space-between" align="flex-start">
            <Text fontWeight="500" fontSize="16px" lineHeight="1.5em" color="#1C1C1E">
              {product.name}
            </Text>
            <Text as="s" fontWeight="400" fontSize="14px" lineHeight="1.5em" color="#999999">
              ${product.price}
            </Text>
          </Flex>
          <Box
            height="3em"
            css={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Text fontWeight="300" fontSize="14px" lineHeight="1.5em" color="#5F5F5F">
              {product.description}
            </Text>
          </Box>
          <Box textAlign="right" mt="8px">
            <Text fontWeight="500" fontSize="16px" lineHeight="1.5em" color="#1C1C1E">
              ${product.discountedPrice}
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ProductCard;
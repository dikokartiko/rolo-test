'use client';

import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function CataloguePage() {
  return (
    <Box p="40px">
      <Text
        fontWeight="500"
        fontSize="24px"
        lineHeight="1.5em"
        color="#1C1C1E"
        mb="40px"
      >
        Breville
      </Text>
      <SimpleGrid columns={4} gap="40px">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
'use client';

import { SimpleGrid, Text, Container, VStack } from '@chakra-ui/react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { useSearchStore } from '@/store/search';

export default function CataloguePage() {
  const { searchTerm } = useSearchStore();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container maxW="1200px" px={{ base: 4, md: 8, lg: 10 }} py={{ base: 6, md: 10 }}>
        <VStack gap={8} align="stretch">
          <Text
            fontWeight="500"
            fontSize={{ base: "20px", md: "24px" }}
            lineHeight="1.5"
            color="#1C1C1E"
          >
            Breville
          </Text>
          {/* Removed Input component */}
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            gap={{ base: 4, md: 6, lg: 10 }}
            w="full"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  );
}
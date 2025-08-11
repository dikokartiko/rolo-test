'use client';

import { SimpleGrid, Text, Container } from '@chakra-ui/react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';

export default function CataloguePage() {
  return (
    <>
    <Header />
    <Container maxW="1200px" px={{ base: 4, md: 8, lg: 10 }} py={{ base: 6, md: 10 }}>
      <Text
        fontWeight="500"
        fontSize={{ base: "20px", md: "24px" }}
        lineHeight="1.5"
        color="#1C1C1E"
        mb={{ base: 6, md: 10 }}
      >
        Breville
      </Text>
      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
        gap={{ base: 4, md: 6, lg: 10 }}
        w="full"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
    </>
  );
}
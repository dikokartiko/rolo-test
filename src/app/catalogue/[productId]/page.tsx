'use client';

import { Box, Container, Grid, Button, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { use, useEffect, useState } from 'react';
import { useCartStore } from '@/store/cart';
import { notFound, useRouter } from 'next/navigation';
import { products } from '@/lib/data';
import ImageGallery from '@/components/ImageGallery';
import ProductDetails from '@/components/ProductDetails';
import Header from '@/components/Header';
import BottomActionBar from '@/components/BottomActionBar';

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { productId } = use(params);
  const product = products.find((p) => p.id === productId);

  const [selectedColor, setSelectedColor] = useState<{ name: string; image: string } | undefined>();

  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) notFound();

  return (
    <>
      <Header />
      <Box bg="white" overflowY="hidden" display="flex" flexDirection="column">
        <Container
          maxW="1280px"
          px={{ base: '16px', md: '24px', lg: '40px' }}
          py={{ base: '16px', md: '24px', lg: '40px' }}
          flex="1" // Allow container to grow and shrink
          overflowY="hidden" // Prevent container from scrolling itself
          display="flex"
          flexDirection="column"
        >
          <Grid
            templateColumns={{
              base: '1fr',
              lg: '400px 1fr',
              xl: '480px 1fr',
            }}
            gap={{ base: '24px', md: '40px', xl: '60px' }}
            alignItems="start"
            flex="1" // Allow grid to grow and shrink
            overflowY="hidden" // Prevent grid from scrolling itself
          >
            {/* Left - Gallery */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Right - Details */}
            <Box
              maxH={{ lg: 'calc(100vh - 120px - 80px)' }}
              overflowY="auto"
              // Hide scrollbar but keep functionality
              css={{
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#BABFCE', // Match the color from the metadata
                  borderRadius: '100px',
                },
              }}
            >
              <ProductDetails
                product={product}
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
              />
            </Box>
          </Grid>
        </Container>

        {/* Bottom Action Bar */}
        <BottomActionBar onBack={() => router.back()}>
          <Box fontSize={{ base: '20px', md: '24px' }} fontWeight="400" color="#375737">
            ${product.discountedPrice || product.price}
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
            onClick={() => {
              addItem(product, selectedColor);
              toaster.success({
                title: 'Added to cart',
                description: `${product.name} added to your cart.`,
                duration: 3000,
                closable: true,
              });
            }}
          >
            Add to Cart →
          </Button>
        </BottomActionBar>
      </Box>
    </>
  );
}

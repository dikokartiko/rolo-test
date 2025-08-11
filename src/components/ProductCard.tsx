'use client';

import { Text, VStack, Flex, AspectRatio, Box } from '@chakra-ui/react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {

  return (
    <Link href={`/catalogue/${product.id}`} style={{ textDecoration: 'none' }}>
      <Box
        w="full"
        maxW="300px"
        mx="auto"
        cursor="pointer"
        transition="transform 0.2s"
        _hover={{ transform: 'translateY(-2px)' }}
      >
        <VStack gap={{ base: 4, md: 5 }} align="stretch">
          <AspectRatio ratio={1} w="full">
            <Box
              borderWidth="1px"
              borderColor="#BABFCE"
              borderRadius="8px"
              overflow="hidden"
              position="relative"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </AspectRatio>
          <VStack gap={4} align="stretch">
            <Flex justify="space-between" align="flex-start" gap={2}>
              <Box
                flex="1"
                overflow="hidden"
                css={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                }}
              >
                <Text
                  fontWeight="500"
                  fontSize={{ base: "14px", md: "16px" }}
                  lineHeight="1.5"
                  color="#1C1C1E"
                >
                  {product.name}
                </Text>
              </Box>
              <Text
                fontWeight="500"
                fontSize={{ base: "14px", md: "16px" }}
                lineHeight="1.5"
                color="#1C1C1E"
                flexShrink={0}
                ml={2}
              >
                ${product.discountedPrice}
              </Text>
            </Flex>
            <Box
              minH={{ base: "2.4em", md: "3em" }}
              overflow="hidden"
              css={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
              }}
            >
              <Text
                fontWeight="300"
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight="1.5"
                color="#5F5F5F"
              >
                {product.description}
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </Link>
  );
};

export default ProductCard;

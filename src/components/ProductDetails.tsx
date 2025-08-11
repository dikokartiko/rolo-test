'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, VStack, Text, HStack, Button, Flex, Separator } from '@chakra-ui/react';
import { Product } from '@/lib/types';

interface ProductDetailsProps {
  product: Product;
  selectedColor: { name: string; image: string } | undefined;
  onColorSelect: (color: { name: string; image: string }) => void;
}

export default function ProductDetails({ product, selectedColor, onColorSelect }: ProductDetailsProps) {
  const [descOpen, setDescOpen] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);


  const discount = product.price && product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <VStack gap={{ base: '24px', md: '40px' }} align="stretch" px={{ base: '16px', md: '0px' }}>
      {/* Breadcrumb */}
      <Text fontSize="16px" fontWeight="500" color="#BABFCE">
        Machines & Equipment  &gt;&gt;  Breville
      </Text>

      {/* Title + Description */}
      <VStack gap={{ base: '12px', md: '20px' }} align="stretch">
        <Text fontSize={{ base: '24px', md: '32px' }} fontWeight="500" color="#1C1C1E">
          {product.name}
        </Text>
        <Text fontSize={{ base: '14px', md: '16px' }} fontWeight="300" color="#5F5F5F">
          {product.description}
        </Text>
      </VStack>

      {/* Price */}
      <Flex justify="space-between" align="flex-end">
        <HStack gap={{ base: '12px', md: '20px' }}>
          {product.price && (
            <Text
              fontSize={{ base: '20px', md: '24px' }}
              fontWeight="400"
              color="#BABFCE"
              textDecoration="line-through"
            >
              ${product.price}
            </Text>
          )}
          <Text fontSize={{ base: '20px', md: '24px' }} fontWeight="400" color="#375737">
            ${product.discountedPrice || product.price}
          </Text>
        </HStack>
        {discount > 0 && (
          <Text fontSize={{ base: '14px', md: '16px' }} fontWeight="400" color="#375737">
            {discount}% off, limited time offer
          </Text>
        )}
      </Flex>

      <Separator borderColor="#BABFCE" />

      {/* Color Picker */}
      {product.colors && product.colors.length > 0 && (
        <>
          <Flex justify="space-between" align="center">
            <Text fontSize={{ base: '14px', md: '16px' }} fontWeight="500" color="#5F5F5F">
              Colour
            </Text>
            <Text fontSize={{ base: '14px', md: '16px' }} fontWeight="400" color="#BABFCE">
              {selectedColor?.name}
            </Text>
          </Flex>
          <HStack gap={{ base: '12px', md: '20px' }}>
            {product.colors.map((color) => (
              <Box
                key={color.name}
                w={{ base: '28px', md: '32px' }}
                h={{ base: '28px', md: '32px' }}
                borderWidth="1px"
                borderColor={selectedColor?.name === color.name ? "#375737" : "#F0F0F0"}
                borderRadius="4px"
                overflow="visible"
                cursor="pointer"
                bgImage={`url(${
                  color.name === 'Stainless Steel'
                    ? '/images/products/barista-express/color-swatch-stainless-steel.png'
                    : color.name === 'Black Truffle'
                    ? '/images/products/barista-express/color-swatch-black-truffle.png'
                    : color.image
                })`}
                bgSize="cover"
                backgroundPosition="center"
                onClick={() => onColorSelect(color)}
                _hover={{ borderColor: "#375737" }}
              />
            ))}
          </HStack>
          <Separator borderColor="#BABFCE" />
        </>
      )}

      {/* Long Description */}
      {product.longDescription && (
        <VStack align="stretch" gap={{ base: '8px', md: '10px' }}>
          <Box
            fontSize={{ base: '12px', md: '14px' }}
            fontWeight="300"
            color="#5F5F5F"
            css={{
              display: '-webkit-box',
              WebkitLineClamp: descOpen ? 'unset' : 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.longDescription}
          </Box>
          <Button
            variant="ghost"
            size="sm"
            p={0}
            h="auto"
            fontSize={{ base: '12px', md: '14px' }}
            fontWeight="400"
            color="#5F5F5F"
            _hover={{ color: "#1C1C1E" }}
            onClick={() => {
              setDescOpen((prev) => {
                const newDescOpen = !prev;
                if (newDescOpen) {
                }
                // If closing manually, no action needed, timeout will clear naturally
                return newDescOpen;
              });
            }}
          >
            {descOpen ? 'Show less' : 'Read more'}
          </Button>
        </VStack>
      )}

      <Separator borderColor="#BABFCE" />

      {/* What's in the Box */}
      {product.whatsInBox && product.whatsInBox.length > 0 && (
        <VStack align="stretch" gap={{ base: '8px', md: '10px' }}>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            fontWeight="500"
            color="#5F5F5F"
            cursor="pointer"
            onClick={() => {
              setBoxOpen((prev) => {
                const newBoxOpen = !prev;
                if (newBoxOpen) {
                }
                // If closing manually, no action needed, timeout will clear naturally
                return newBoxOpen;
              });
            }}
          >
            What's in the box
          </Text>
          
            <VStack align="stretch" gap={{ base: '4px', md: '6px' }}>
              <Text fontSize={{ base: '12px', md: '14px' }} fontWeight="300" color="#5F5F5F">
                On top of the machine itself, this comes with:
              </Text>
              {product.whatsInBox.map((item, idx) => (
                <Text key={idx} fontSize={{ base: '12px', md: '14px' }} fontWeight="300" color="#5F5F5F">
                  {item}
                </Text>
              ))}
            </VStack>
        
        </VStack>
      )}
    </VStack>
  );
}

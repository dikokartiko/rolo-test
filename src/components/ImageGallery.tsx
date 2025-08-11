'use client';

import { useState } from 'react';
import { Box, VStack, HStack } from '@chakra-ui/react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <VStack gap={{ base: '16px', md: '20px' }} align="stretch" w={{ base: '100%', lg: '400px' }} flexShrink={0}>
      {/* Main Image */}
      <Box
        w={{ base: '100%', lg: '400px' }}
        // Maintain a square ratio on all screens for visual consistency
        aspectRatio={1}
        h={{ base: 'auto', lg: '400px' }}
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        bg="white"
        flexShrink={0}
      >
        <Image
          src={images[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="(max-width: 992px) 100vw, 400px"
        />
      </Box>

      {/* Thumbnails */}
      {images.length > 1 && (
        <HStack gap="10px" overflowX="auto" pb="4px" px={{ base: '16px', md: '0px' }}>
          {images.map((img, idx) => (
            <Box
              key={idx}
              w="72px"
              h="72px"
              borderWidth="1px"
              borderColor={selectedImage === idx ? "#375737" : "#F0F0F0"}
              borderRadius="4px"
              overflow="hidden"
              cursor="pointer"
              onClick={() => setSelectedImage(idx)}
              transition="border-color 0.2s"
              _hover={{ borderColor: "#375737" }}
              flexShrink={0}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                width={72}
                height={72}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                sizes="72px"
              />
            </Box>
          ))}
        </HStack>
      )}
    </VStack>
  );
}

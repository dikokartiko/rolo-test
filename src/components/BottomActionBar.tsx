'use client';

import { Box, Container, Stack, Button, HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface BottomActionBarProps {
  onBack: () => void;
  children: ReactNode;
}

const BottomActionBar = ({ onBack, children }: BottomActionBarProps) => {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px solid #F0F0F0"
      py={{ base: '8px', md: '10px' }}
      pb="calc(env(safe-area-inset-bottom))"
      zIndex={10}
      flexShrink={0}
      boxShadow="0px -4px 10px rgba(0, 0, 0, 0.05)"
    >
      <Container maxW="1280px" px={{ base: '16px', md: '24px', lg: '40px' }}>
        <Stack
          direction="row"
          align="center"
          justify="space-between"
          gap={{ base: '12px', md: '40px' }}
          flexWrap="wrap"
        >
          <Button
            bg="#F4F4F4"
            color="#5F5F5F"
            fontSize={{ base: '14px', md: '14px' }}
            fontWeight="400"
            h={{ base: '44px', md: '46px' }}
            px="20px"
            borderRadius="4px"
            border="1px solid #F0F0F0"
            _hover={{ bg: '#E8E8E8' }}
            onClick={onBack}
          >
            ← Back
          </Button>

          <HStack gap={{ base: '16px', md: '40px' }} ml="auto">
            {children}
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default BottomActionBar;
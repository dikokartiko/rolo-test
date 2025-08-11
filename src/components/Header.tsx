'use client';

import {
  Box,
  Flex,
  InputGroup,
  Input,
  Button,
  Icon,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import { useCartStore } from '@/store/cart';

const Header = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box as="header" bg="#FFFFFF" px="40px" py="40px">
      <Flex
        align="center"
        justify="space-between"
        w="1200px"
        mx="auto"
      >
        <Image
          src="/images/logos/ROLO.png"
          alt="ROLO Logo"
          width={120}
          height={20}
          priority
        />
        <Flex align="center" gap="20px">
          <InputGroup
            w="400px"
            h="32px"
            startElement={
              <Icon
                as={FiSearch}
                color="#BABFCE"
                boxSize="14px"
                strokeWidth="2px"
              />
            }
          >
            <Input
              placeholder="Search"
              fontSize="14px"
              fontWeight="400"
              lineHeight="1.5em"
              h="32px"
              px="10px"
              borderRadius="4px"
              borderWidth="1px"
              borderColor="#BABFCE"
              bg="#FFFFFF"
              _placeholder={{
                color: '#BABFCE',
                fontWeight: '400',
                fontSize: '14px'
              }}
              _focus={{
                borderColor: '#BABFCE',
                boxShadow: 'none'
              }}
            />
          </InputGroup>
          <Button
            w="120px"
            h="32px"
            px="10px"
            borderRadius="4px"
            borderWidth="1px"
            borderColor="#BABFCE"
            bg="#FFFFFF"
            fontSize="14px"
            fontWeight="500"
            lineHeight="1.5em"
            color="#BABFCE"
            _hover={{
              bg: '#FFFFFF',
              borderColor: '#BABFCE'
            }}
          >
            Filters
          </Button>
          <Button
            w="120px"
            h="32px"
            px="10px"
            borderRadius="4px"
            bg="#F0F0F0"
            fontSize="14px"
            fontWeight="500"
            lineHeight="1.5em"
            color="#5F5F5F"
            border="none"
            _hover={{
              bg: '#F0F0F0'
            }}
          >
            Your Cart
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
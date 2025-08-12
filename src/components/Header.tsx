'use client';

import {
  Box,
  Flex,
  InputGroup,
  Input,
  Button,
  Icon,
  Container,
  HStack,
  IconButton,
  VStack,
  Badge,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { useCartStore } from '@/store/cart';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import { products } from '@/lib/data';
import { Product } from '@/lib/types';
import { useSearchStore } from '@/store/search'; // Import the new store

const Header = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  const { searchTerm, setSearchTerm } = useSearchStore(); // Use the Zustand store
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim() === '') {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowDropdown(filtered.length > 0);
    }, 300),
    []
  );


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        mobileSearchContainerRef.current &&
        !mobileSearchContainerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchContainerRef, mobileSearchContainerRef]);

  const handleSearchSubmit = (query: string) => {
    setSearchTerm(query);
    router.push('/catalogue');
    setShowDropdown(false);
    setSearchResults([]);
  };


  return (
    <Box as="header" bg="#FFFFFF" borderBottom="1px" borderColor="#F0F0F0">
      <Container maxW="1200px" px={{ base: 4, md: 8, lg: 10 }} py={{ base: 4, md: 10 }}>
        {/* Desktop Header */}
        <Flex
          align="center"
          justify="space-between"
          display={{ base: 'none', lg: 'flex' }}
        >
          <Box flexShrink={0}>
            <Image
              src="/images/logos/ROLO.png"
              alt="ROLO Logo"
              width={120}
              height={20}
              priority
            />
          </Box>
          <HStack gap={5} flex="1" justify="flex-end">
            <Box position="relative" maxW="400px" w="full" ref={searchContainerRef}>
              <InputGroup
                w="full"
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
                  lineHeight="1.5"
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
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    debouncedSearch(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit(searchTerm);
                    }
                  }}
                />
              </InputGroup>
              {showDropdown && (
                <VStack
                  position="absolute"
                  top="32px"
                  left="0"
                  width="100%"
                  maxH="200px"
                  overflowY="auto"
                  bg="white"
                  borderWidth="1px"
                  borderColor="#BABFCE"
                  borderRadius="4px"
                  zIndex="10"
                  align="stretch"
                >
                  {searchResults.map((product) => (
                    <Button
                      key={product.id}
                      variant="ghost"
                      justifyContent="flex-start"
                      onClick={() => {
                        router.push(`/catalogue/${product.id}`);
                        setShowDropdown(false);
                        setSearchTerm('');
                      }}
                    >
                      {product.name}
                    </Button>
                  ))}
                </VStack>
              )}
            </Box>
            <Button
              minW="120px"
              h="32px"
              px="10px"
              borderRadius="4px"
              borderWidth="1px"
              borderColor="#BABFCE"
              bg="#FFFFFF"
              fontSize="14px"
              fontWeight="500"
              lineHeight="1.5"
              color="#BABFCE"
              _hover={{
                bg: '#FFFFFF',
                borderColor: '#BABFCE'
              }}
              /* Removed pointerEvents="none" as it should always be enabled */
            >
              Filters
            </Button>
            <Link href={totalItems > 0 ? "/cart" : "#"} passHref>
              <Button
                aria-label="Cart"
                minW="100%"
                h="32px"
                px="10px"
                borderRadius="4px"
                borderWidth="1px"
                bg={'transparent'}
                borderColor={'transparent'}
                fontSize="14px"
                fontWeight="500"
                lineHeight="1.5"
                color={'#375737'}
                _hover={{
                  cursor: totalItems > 0 ? 'pointer' : 'not-allowed',
                }}
                disabled={totalItems === 0}
              >
                <Flex align="center" gap={2} position="relative">
                <Icon as={FiShoppingCart} boxSize="16px" />
                  {totalItems > 0 && (
                    <>
                      <Badge
                        position="absolute"
                        top="-8px"
                        right="-12px"
                        borderRadius="full"
                        colorScheme="green"
                        fontSize="0.6em"
                        px="0.3em"
                      >
                        {totalItems}
                      </Badge>
                    </>
                  )}
                </Flex>
              </Button>
            </Link>
          </HStack>
        </Flex>

        {/* Mobile Header */}
        <Flex
          align="center"
          justify="space-between"
          display={{ base: 'flex', lg: 'none' }}
        >
          <Box flexShrink={0}>
            <Image
              src="/images/logos/ROLO.png"
              alt="ROLO Logo"
              width={100}
              height={16}
              priority
            />
          </Box>
          <HStack gap={2}>
            <Link href={totalItems > 0 ? "/cart" : "#"} passHref>
              <Button
                aria-label="Cart"
                minW="120px"
                h="32px"
                px="10px"
                borderRadius="4px"
                borderWidth="1px"
                bg={totalItems > 0 ? '#375737' : '#F0F0F0'}
                borderColor={totalItems > 0 ? '#375737' : '#F0F0F0'}
                fontSize="14px"
                fontWeight="500"
                lineHeight="1.5"
                color={totalItems > 0 ? '#FFFFFF' : '#5F5F5F'}
                _hover={{
                  bg: totalItems > 0 ? '#375737' : '#F0F0F0',
                  borderColor: totalItems > 0 ? '#375737' : '#F0F0F0',
                  cursor: totalItems > 0 ? 'pointer' : 'not-allowed',
                }}
                disabled={totalItems === 0}
              >
                <Flex align="center" gap={2} position="relative">
                  Your cart
                  {totalItems > 0 && (
                    <>
                      <Icon as={FiShoppingCart} boxSize="16px" />
                      <Badge
                        position="absolute"
                        top="-8px"
                        right="-12px"
                        borderRadius="full"
                        colorScheme="green"
                        fontSize="0.6em"
                        px="0.3em"
                      >
                        {totalItems}
                      </Badge>
                    </>
                  )}
                </Flex>
              </Button>
            </Link>
            <IconButton
              aria-label="Toggle menu"
              variant="ghost"
              size="sm"
              onClick={onToggle}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </IconButton>
          </HStack>
        </Flex>

        {/* Mobile Menu */}
        {isOpen && (
          <Box>
            <VStack
              gap={4}
              pt={4}
              align="stretch"
              display={{ base: 'flex', lg: 'none' }}
            >
              <Box position="relative" w="full" ref={mobileSearchContainerRef}>
                <InputGroup
                  h="40px"
                  startElement={
                    <Icon
                      as={FiSearch}
                      color="#BABFCE"
                      boxSize="16px"
                      strokeWidth="2px"
                    />
                  }
                >
                  <Input
                    placeholder="Search"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="1.5"
                    h="40px"
                    px="12px"
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
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      debouncedSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(searchTerm);
                      }
                    }}
                  />
                </InputGroup>
                {showDropdown && (
                  <VStack
                    position="absolute"
                    top="40px"
                    left="0"
                    width="100%"
                    maxH="200px"
                    overflowY="auto"
                    bg="white"
                    borderWidth="1px"
                    borderColor="#BABFCE"
                    borderRadius="4px"
                    zIndex="10"
                    align="stretch"
                  >
                    {searchResults.map((product) => (
                      <Button
                        key={product.id}
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => {
                          router.push(`/catalogue/${product.id}`);
                          setShowDropdown(false);
                          setSearchTerm('');
                        }}
                      >
                        {product.name}
                      </Button>
                    ))}
                  </VStack>
                )}
              </Box>
              <Button
                w="full"
                h="40px"
                borderRadius="4px"
                borderWidth="1px"
                borderColor="#BABFCE"
                bg="#FFFFFF"
                fontSize="14px"
                fontWeight="500"
                lineHeight="1.5"
                color="#BABFCE"
                _hover={{
                  bg: '#FFFFFF',
                  borderColor: '#BABFCE'
                }}
                /* Removed pointerEvents="none" as it should always be enabled */
              >
                  Filters
                </Button>
              </VStack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Header;
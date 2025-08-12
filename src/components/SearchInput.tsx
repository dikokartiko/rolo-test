'use client';

import {
  Box,
  InputGroup,
  Input,
  Icon,
  VStack,
  Button,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useCallback, useEffect, useState, useRef } from 'react';
import { debounce } from 'lodash';
import { products } from '@/lib/data';
import { Product } from '@/lib/types';

type SearchInputProps = {
  onProductSelect: (productId: string) => void;
  containerRef?: React.RefObject<HTMLDivElement>;
  inputHeight?: string;
  iconSize?: string;
  inputFontSize?: string;
  inputPx?: string;
  inputBorderRadius?: string;
  inputBorderWidth?: string;
  inputBorderColor?: string;
  inputBg?: string;
  placeholderColor?: string;
  showDropdownInitially?: boolean;
};

const SearchInput = ({
  onProductSelect,
  containerRef,
  inputHeight = '32px',
  iconSize = '14px',
  inputFontSize = '14px',
  inputPx = '10px',
  inputBorderRadius = '4px',
  inputBorderWidth = '1px',
  inputBorderColor = '#BABFCE',
  inputBg = '#FFFFFF',
  placeholderColor = '#BABFCE',
  showDropdownInitially = false,
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(showDropdownInitially);

  const localSearchContainerRef = useRef<HTMLDivElement>(null);
  const currentContainerRef = containerRef || localSearchContainerRef;

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
        currentContainerRef.current &&
        !currentContainerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentContainerRef]);

  return (
    <Box position="relative" w="full" ref={currentContainerRef}>
      <InputGroup
        w="full"
        h={inputHeight}
        startElement={
          <Icon
            as={FiSearch}
            color={placeholderColor}
            boxSize={iconSize}
            strokeWidth="2px"
          />
        }
      >
        <Input
          placeholder="Search"
          fontSize={inputFontSize}
          fontWeight="400"
          lineHeight="1.5"
          h={inputHeight}
          px={inputPx}
          borderRadius={inputBorderRadius}
          borderWidth={inputBorderWidth}
          borderColor={inputBorderColor}
          bg={inputBg}
          _placeholder={{
            color: placeholderColor,
            fontWeight: '400',
            fontSize: inputFontSize
          }}
          _focus={{
            borderColor: inputBorderColor,
            boxShadow: 'none'
          }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
      </InputGroup>
      {showDropdown && (
        <VStack
          position="absolute"
          top={inputHeight}
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
                onProductSelect(product.id);
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
  );
};

export default SearchInput;
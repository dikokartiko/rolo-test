import { CustomerDetailsForm } from '@/components/CustomerDetailsForm';
import { Box, Container, Heading } from '@chakra-ui/react';

export default function DetailsPage() {
  return (
    <Container maxW="container.xl" p={8}>
      <Box>
        <Heading as="h1" size="xl" mb={8}>
          Customer Details
        </Heading>
        <CustomerDetailsForm />
      </Box>
    </Container>
  );
}
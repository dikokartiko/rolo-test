# Rolo - E-commerce Application Brief

## Project Overview
Rolo is a modern e-commerce web application built with Next.js 15, React 19, and Chakra UI v3. The application provides a seamless shopping experience with product catalog, cart functionality, and integrated payment processing.

## Tech Stack
- **Framework**: Next.js 15 with Turbopack
- **Frontend**: React 19 with React Compiler
- **UI Library**: Chakra UI v3
- **Language**: TypeScript
- **Icons**: React Icons
- **Theming**: Next Themes
- **Payment**: Stripe Integration
- **Data Storage**: Google Sheets Integration

## Feature Requirements

### A. Overall Catalogue
- **Search Functionality**: Implement search bar that filters products by item name
- **Filter Button**: Include in UI but ignore functionality for now
- **Cart Indicator**: Cart icon/button should change color when items are added to indicate non-empty state

### B. Item Details Page
- **Image Gallery**: Implement image carousel/gallery for product photos
- **Product Information**: Display item details on the right side of the page
- **Scrolling Behavior**: Only the right side (product details) should scroll, image gallery remains fixed
- **Special Note**: Barista Express product has a black version variant

### C. Shopping Cart
- **Cart Display**: Simple list view of added items
- **Calculations**: Show individual item totals and overall cart total
- **Item Management**: Allow quantity updates and item removal

### D. Customer Details Form
- **Data Collection**: Gather customer information through form fields
- **Google Sheets Integration**: Automatically feed collected data into a Google Sheet
- **Form Validation**: All fields required except unit/house number (optional)
- **Payment Button State**: "Make Payment" button should only be clickable/active with full opacity when all required fields are completed

### E. Payment Integration
- **Stripe Checkout**: Integrate Stripe for secure payment processing
- **Payment Flow**: Seamless transition from cart to payment completion

## Development Notes
- Use Chakra UI v3 components for consistent design system
- Implement responsive design for mobile and desktop
- Ensure accessibility compliance
- Follow TypeScript best practices for type safety
- Utilize Next.js 15 features for optimal performance
# Rolo - Architecture

## Project Structure
The project follows a standard Next.js application structure.

- **`src/app`**: This directory contains the core application logic, including pages and layouts. Next.js uses a file-system based router, so the structure of this directory defines the application's routes.
- **`src/components`**: This directory contains reusable UI components that are used throughout the application.
  - **`src/components/ui`**: This subdirectory is for general-purpose UI components that are not specific to any particular feature, such as buttons, inputs, and modals.

## Component Organization
Components are organized based on their function and scope. Shared, reusable components are kept in `src/components/ui`, while feature-specific components will be co-located with their respective features in the `src/app` directory as the application grows.
# Design Guidelines for Household Utility E-commerce Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from BigBasket and Blinkit's clean, category-focused design with emphasis on easy product discovery and streamlined checkout experience.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: #2E7D32 (fresh green) - for headers, CTAs, and brand elements
- Secondary: #FF6F00 (warm orange) - for promotional badges and accent buttons
- Background: #FAFAFA (light grey) - main background
- Text: #212121 (dark grey) - primary text
- Accent: #1976D2 (blue) - links and secondary actions
- Success: #4CAF50 (green) - confirmation states and discount indicators

**Dark Mode:**
- Primary: #4CAF50 (lighter green for contrast)
- Secondary: #FFB74D (softer orange)
- Background: #121212 (dark background)
- Text: #E0E0E0 (light grey text)
- Accent: #42A5F5 (lighter blue)
- Success: #66BB6A (brighter green)

### B. Typography
- **Primary Font**: Roboto (Google Fonts)
- **Secondary Font**: Open Sans (Google Fonts)
- **Hierarchy**: 
  - H1: 32px/bold for page titles
  - H2: 24px/semibold for section headers
  - H3: 20px/medium for category titles
  - Body: 16px/regular for product descriptions
  - Small: 14px/regular for prices and details

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Base spacing: p-4, m-4
- Component spacing: gap-6, space-y-8
- Container padding: px-4 md:px-8 lg:px-12
- Section spacing: py-12, my-16

### D. Component Library

**Navigation**
- Sticky header with category dropdown menu
- Prominent shopping cart icon with item count badge
- Search bar with category filter
- Mobile hamburger menu with slide-out drawer

**Product Cards**
- 12px border radius with subtle shadow
- Product image with hover zoom effect
- Price prominently displayed in primary green
- Quick "Add to Cart" button in secondary orange
- Discount badges for promotional items

**Shopping Cart**
- Slide-out cart drawer from right side
- Item quantity controls with +/- buttons
- Running total with automatic discount display
- Clear checkout CTA button
- Empty cart state with suggested products

**Forms**
- Clean input fields with floating labels
- Validation states using success green and error red
- Multi-step registration with progress indicator
- Address autocomplete functionality

**Category Navigation**
- Grid-based category tiles with icons
- Horizontal scrolling category bar on mobile
- Breadcrumb navigation for deep categories
- Filter and sort options for product listings

## Key Design Principles

1. **Clean Category Focus**: Large, visual category tiles for easy browsing
2. **Price Transparency**: Prominent pricing with clear discount indicators
3. **Mobile-First**: Responsive grid that adapts from 1 column (mobile) to 4 columns (desktop)
4. **Trust Building**: Clear delivery information and user reviews
5. **Conversion Optimization**: Persistent cart access and streamlined checkout

## Images
**Product Images**: High-quality product photos with consistent white backgrounds and 1:1 aspect ratio for grid uniformity. Category placeholder images for groceries, cleaning products, personal care, etc.

**Category Icons**: Simple, recognizable icons for each product category (grocery cart, cleaning spray, etc.) in the primary green color.

**No Hero Image**: This utility-focused e-commerce site prioritizes immediate product access over large hero imagery. The homepage leads directly with category navigation and featured products.

## Layout Structure
- Header with logo, search, and cart
- Category navigation bar
- Product grid with filters sidebar
- Sticky cart summary on larger screens
- Footer with delivery info and customer service

This design emphasizes functionality and ease of use while maintaining visual appeal through consistent color usage and clean typography hierarchy.
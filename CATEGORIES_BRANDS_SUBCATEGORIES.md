# E-commerce Next.js Application

## New Pages Added

### Categories
- **Categories Listing**: `/categories` - Displays all available categories with grid/list view toggle
- **Category Detail**: `/categories/[id]` - Shows detailed information about a specific category

### Brands  
- **Brands Listing**: `/brands` - Displays all available brands with grid/list view toggle
- **Brand Detail**: `/brands/[id]` - Shows detailed information about a specific brand

### Subcategories
- **Subcategories Listing**: `/subcategories` - Displays all available subcategories with grid/list view toggle
- **Subcategory Detail**: `/subcategories/[id]` - Shows detailed information about a specific subcategory

## API Integration

All pages integrate with the following APIs:
- Categories: `https://ecommerce.routemisr.com/api/v1/categories`
- Brands: `https://ecommerce.routemisr.com/api/v1/brands`
- Subcategories: `https://ecommerce.routemisr.com/api/v1/subcategories`

## Features

- **Responsive Design**: All pages work on mobile, tablet, and desktop
- **Loading States**: Spinner components while data is being fetched
- **Error Handling**: Graceful error handling with retry functionality
- **View Modes**: Toggle between grid and list views
- **Navigation**: Breadcrumb navigation and back buttons
- **Image Fallbacks**: Placeholder images when category/brand images fail to load
- **TypeScript**: Full type safety with proper interfaces

## File Structure

```
src/
├── app/(pages)/
│   ├── categories/
│   │   ├── page.tsx          # Categories listing
│   │   └── [id]/page.tsx     # Category detail
│   ├── brands/
│   │   ├── page.tsx          # Brands listing
│   │   └── [id]/page.tsx     # Brand detail
│   └── subcategories/
│       ├── page.tsx          # Subcategories listing
│       └── [id]/page.tsx     # Subcategory detail
├── Services/
│   └── api.ts               # Updated with new API methods
├── Types/
│   └── responses.ts         # Updated with new response types
└── interfaces/
    ├── category.ts          # Category and Subcategory interfaces
    └── brand.ts            # Brand interface
```

## Usage

1. Navigate to `/categories` to see all categories
2. Click on any category to view its details
3. Use the same pattern for brands (`/brands`) and subcategories (`/subcategories`)
4. All pages include links to view related products (when product filtering is implemented)

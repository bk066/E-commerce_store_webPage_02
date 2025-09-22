import { db } from "../server/db";
import { products } from "../shared/schema";

const initialProducts = [
  {
    name: 'Basmati Rice Premium Quality 1kg Pack',
    price: '180.00',
    originalPrice: '220.00',
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e26c?w=300&h=300&fit=crop',
    category: 'groceries',
    inStock: true,
    discount: 18
  },
  {
    name: 'Dish Soap Liquid 500ml',
    price: '85.00',
    unit: '500 ml',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop',
    category: 'cleaning',
    inStock: true
  },
  {
    name: 'Organic Toor Dal 1kg',
    price: '120.00',
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1599909533554-9e3b7cae1b7a?w=300&h=300&fit=crop',
    category: 'groceries',
    inStock: true
  },
  {
    name: 'Shampoo Anti-Dandruff 400ml',
    price: '240.00',
    originalPrice: '280.00',
    unit: '400 ml',
    image: 'https://images.unsplash.com/photo-1556229174-f412d0dcbce2?w=300&h=300&fit=crop',
    category: 'personal-care',
    inStock: true,
    discount: 14
  },
  {
    name: 'All Purpose Cleaner 1L',
    price: '150.00',
    unit: '1 L',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=300&fit=crop',
    category: 'cleaning',
    inStock: false
  },
  {
    name: 'Green Tea Bags 25 Count',
    price: '95.00',
    unit: '25 bags',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop',
    category: 'beverages',
    inStock: true
  },
  {
    name: 'Sunflower Oil 1L Bottle',
    price: '160.00',
    unit: '1 L',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop',
    category: 'groceries',
    inStock: true
  },
  {
    name: 'Toilet Paper 12 Roll Pack',
    price: '280.00',
    originalPrice: '320.00',
    unit: '12 rolls',
    image: 'https://images.unsplash.com/photo-1583947582077-ba8b5a2b7ab3?w=300&h=300&fit=crop',
    category: 'household',
    inStock: true,
    discount: 12
  },
  {
    name: 'Organic Honey 250g',
    price: '220.00',
    unit: '250 g',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop',
    category: 'groceries',
    inStock: true
  },
  {
    name: 'Fabric Softener 2L',
    price: '190.00',
    unit: '2 L',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    category: 'cleaning',
    inStock: true
  },
  {
    name: 'Masala Chai Tea Packets',
    price: '85.00',
    unit: '100 g',
    image: 'https://images.unsplash.com/photo-1597318378091-23cb6656b397?w=300&h=300&fit=crop',
    category: 'beverages',
    inStock: true
  },
  {
    name: 'Body Lotion 500ml',
    price: '175.00',
    unit: '500 ml',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
    category: 'personal-care',
    inStock: true
  }
];

async function seedProducts() {
  try {
    await db.insert(products).values(initialProducts);
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

seedProducts();
import { useState } from 'react';
import CategoryNav from '../CategoryNav';

export default function CategoryNavExample() {
  const [selectedCategory, setSelectedCategory] = useState("groceries");

  return (
    <CategoryNav 
      selectedCategory={selectedCategory}
      onCategorySelect={setSelectedCategory}
    />
  );
}
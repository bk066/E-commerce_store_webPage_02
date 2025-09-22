import { useState } from 'react';
import UserForm from '../UserForm';

export default function UserFormExample() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (data: any) => {
    console.log('User registered:', data);
    setIsOpen(false);
  };

  return (
    <UserForm 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
    />
  );
}
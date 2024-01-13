import { SimplePage } from '@/components/common/page';
import { ProductCreateForm } from '@/components/forms';
import React from 'react';

export const CreateProduct: React.FC = () => {
  return (
    <SimplePage title="Create product">
      <ProductCreateForm />
    </SimplePage>
  );
};

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const sampleProduct = {
  id: 1,
  title: 'Sample Product',
  price: 9.99,
  image: 'test.jpg',
  rating: { rate: 4, count: 2 }
};

describe('ProductCard component', () => {
  it('shows the product title and price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });
});

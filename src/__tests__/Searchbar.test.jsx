import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import Searchbar from '../Components/Searchbar';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
  global.fetch = jest.fn(() => 
    Promise.resolve({
      json: async () => []
    })
  );
});
afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('Searchbar component', () => {
  it('renders input field with placeholder', () => {
    render(<Searchbar />);
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    render(<Searchbar />);
    const input = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
});

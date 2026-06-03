import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Searchbar from '../Components/Searchbar';

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  global.fetch = vi.fn(() => 
    Promise.resolve({
      json: async () => []
    })
  );
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
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

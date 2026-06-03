import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../Components/layout/Footer';

describe('Footer component', () => {
  it('renders back to top and columns', () => {
    render(<Footer />);
    expect(screen.getByLabelText(/back to top/i)).toBeInTheDocument();
    expect(screen.getByText(/get to know us/i)).toBeInTheDocument();
  });

  it('scrolls to top when button clicked', () => {
    window.scrollTo = vi.fn();
    render(<Footer />);
    fireEvent.click(screen.getByLabelText(/back to top/i));
    expect(window.scrollTo).toHaveBeenCalled();
  });
});

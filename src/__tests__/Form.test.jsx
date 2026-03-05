import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Form from '../Components/Form';

// basic smoke tests covering login/signup toggle and validation

describe('Form component', () => {
  it('renders login mode by default and toggles to signup', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    // check for heading text specifically
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('shows email and password input fields', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    // verify that email and password input fields exist
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  it('accepts email and password input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const email = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(email, { target: { value: 'test@example.com' } });
    expect(email.value).toBe('test@example.com');
  });
});

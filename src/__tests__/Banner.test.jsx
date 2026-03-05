import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Banner from '../Components/Banner';

describe('Banner component', () => {
  it('renders carousel and countdown', () => {
    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );
    // banner has images and countdown text
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    expect(screen.getByText(/deals of this month/i)).toBeInTheDocument();
  });
});

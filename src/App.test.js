import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero section', () => {
  render(<App />);
  const heroText = screen.getByText(/You're Invited/i);
  expect(heroText).toBeInTheDocument();
});

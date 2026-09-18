import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('closes the dropdown when the mouse leaves the dropdown panel', () => {
  render(<App />);

  const musicItem = screen.getByText('Music').closest('.nav-links');
  fireEvent.mouseEnter(musicItem);

  expect(screen.getByText('Lineup')).toBeInTheDocument();

  fireEvent.mouseLeave(screen.getByText('Lineup').closest('.dropdown'));

  expect(screen.queryByText('Lineup')).not.toBeInTheDocument();
});

test('shows a total for the camping and parking request including donation', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /Get Tickets/i }));

  fireEvent.change(screen.getByLabelText(/Number of campsites/i), { target: { value: '2' } });
  fireEvent.change(screen.getByLabelText(/Number of parking spaces/i), { target: { value: '1' } });
  fireEvent.change(screen.getByLabelText(/Donation amount \(optional\)/i), { target: { value: '15' } });

  expect(screen.getByText('Total: $90.00')).toBeInTheDocument();
});

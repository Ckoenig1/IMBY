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

test('loads the Curator feed on the homepage', () => {
  render(<App />);

  expect(document.getElementById('curator-feed-default-feed-layout')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Powered by Curator.io' })).toHaveAttribute(
    'href',
    'https://curator.io'
  );
  expect(document.querySelector('script[src="https://cdn.curator.io/published/c43de2a3-a239-4a01-a493-bbb894eb4cd5.js"]'))
    .toBeInTheDocument();
});

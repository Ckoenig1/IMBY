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

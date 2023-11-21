import { render, fireEvent } from '@testing-library/react';
import ErrorPopup from './ErrorPopup';

describe('ErrorPopup', () => {
  it('renders without crashing', () => {
    render(<ErrorPopup />);
  });

  it('opens Snackbar and displays correct message when there\'s an error message in localStorage', () => {
    localStorage.setItem('error', 'Test error');
    const { getByText } = render(<ErrorPopup />);

    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('closes Snackbar and removes error message from localStorage on close button click', () => {
    localStorage.setItem('error', 'Test error');
    const { getByLabelText } = render(<ErrorPopup />);
    const button = getByLabelText('close');

    fireEvent.click(button);

    expect(localStorage.getItem('error')).toBeNull();
  });
});
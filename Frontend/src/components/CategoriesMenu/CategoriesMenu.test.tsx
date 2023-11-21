import { render, fireEvent } from '@testing-library/react';
import CategoriesMenu from './CategoriesMenu';

describe('CategoriesMenu', () => {
  test('renders without crashing', () => {
    const mockChoseCategory = jest.fn();
    render(<CategoriesMenu choseCategory={mockChoseCategory} showError={false} />);
  });

  test('opens menu on click', () => {
    const mockChoseCategory = jest.fn();
    const { getByRole } = render(<CategoriesMenu choseCategory={mockChoseCategory} showError={false} />);
    const button = getByRole('button');

    fireEvent.click(button);

    expect(getByRole('menu')).toBeInTheDocument();
  });
});
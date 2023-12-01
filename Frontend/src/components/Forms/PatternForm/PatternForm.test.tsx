import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PatternForm from './PatternForm';

// Mock the useNavigate hook
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigator,
}));

const PatternFormWithRouter = () => {
  return (
    <BrowserRouter>
      <PatternForm method={'POST'} />
    </BrowserRouter>
  );
};

describe('PatternForm', () => {
  test('renders without crashing', () => {
    render(<PatternFormWithRouter />);
  });

  test('navigates to correct page on successful submission', async () => {
    const { container } = render(
      <PatternFormWithRouter />
    );
    const submitButton = container.getElementsByClassName('submitBtn')[0] as HTMLButtonElement;

    fireEvent.click(submitButton);

    setTimeout(() => {
      expect(mockedNavigator).toHaveBeenCalledWith(
        '/fiber-friend/account/patterns'
      );
    }, 0);
  });
});
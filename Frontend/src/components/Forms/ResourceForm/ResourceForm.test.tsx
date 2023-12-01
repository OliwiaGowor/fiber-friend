import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResourceForm from './ResourceForm';

// Mock the useNavigate hook
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedNavigator,
}));

const ResourceFormWithRouter = () => {
    return (
        <BrowserRouter>
            <ResourceForm method={'POST'} />
        </BrowserRouter>
    );
};

describe('ResourceForm', () => {
    test('renders without crashing', () => {
        render(<ResourceFormWithRouter />);
    });

    test('navigates to correct page on successful submission', async () => {
        const { container } = render(
            <ResourceFormWithRouter />
        );
        const submitButton = container.getElementsByClassName('submitBtn')[0] as HTMLButtonElement;

        fireEvent.click(submitButton);

        setTimeout(() => {
            expect(mockedNavigator).toHaveBeenCalledWith(
                '/fiber-friend/account/resources'
            );
        }, 0);
    });
});
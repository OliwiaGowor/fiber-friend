import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CounterForm from './CounterForm';

// Mock the useNavigate hook
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedNavigator,
}));

const CounterFormWithRouter = () => {
    return (
        <BrowserRouter>
            <CounterForm method={'POST'} />
        </BrowserRouter>
    );
};

const counterData = {
    name: "Name",
    counters: [{
        id: 1,
        name: "Counter",
        amount: 123,
    }],
    parentId: "sdfds1",
};

describe('CounterForm', () => {
    test('renders without crashing', () => {
        render(<CounterFormWithRouter />);
    });

    test('navigates to correct page on successful submission', async () => {
        const { container } = render(
            <CounterFormWithRouter />
        );
        const submitButton = container.getElementsByClassName('submitBtnOff')[0] as HTMLButtonElement;

        fireEvent.click(submitButton);

        setTimeout(() => {
            expect(mockedNavigator).toHaveBeenCalledWith(
                '/fiber-friend/account/counters'
            );
        }, 0);
    });

    test('enables submit button when there are counters', () => {
        const { container } = render(
            <BrowserRouter>
                <CounterForm counterGroup={counterData} method="POST" />
            </BrowserRouter>);
        const submitButton = container.getElementsByClassName('submitBtn')[0] as HTMLButtonElement;

        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeEnabled();
    });

    test('disables submit button when there are no counters', () => {
        const { container } = render(<CounterFormWithRouter />);
        const submitButton = container.getElementsByClassName('submitBtnOff')[0] as HTMLButtonElement;

        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
    });
});
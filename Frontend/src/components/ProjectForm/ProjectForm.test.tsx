import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

// Mock the useNavigate hook
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedNavigator,
}));

const ProjectFormWithRouter = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
                <ProjectForm method={'POST'} />
            </BrowserRouter>
        </LocalizationProvider >
    );
};

describe('ProjectForm', () => {
    test('renders without crashing', () => {
        render(<ProjectFormWithRouter />);
    });

    test('navigates to correct page on successful submission', async () => {
        const { container } = render(
            <ProjectFormWithRouter />
        );
        const submitButton = container.getElementsByClassName('submitBtn')[0] as HTMLButtonElement;

        fireEvent.click(submitButton);

        setTimeout(() => {
            expect(mockedNavigator).toHaveBeenCalledWith(
                '/fiber-friend/account/projects'
            );
        }, 0);
    });
});
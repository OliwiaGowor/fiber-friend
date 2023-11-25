import { render, screen, fireEvent } from '@testing-library/react';
import SidebarAccount from './SidebarAccount';
import { BrowserRouter as Router } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";

const getOpenMock = jest.fn();

const SidebarAccountWithRouter = () => (
    <Router>
        <SidebarAccount open={true} getOpen={getOpenMock} />
    </Router>
);

// not testing for mobile as default
jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn().mockReturnValue(false),
}));

// Mock the useNavigate hook
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedNavigator,
}));

describe('SidebarAccount component', () => {
    test('renders SidebarAccount component', () => {
        const { container } = render(
            <SidebarAccountWithRouter />
        );

        expect(container.getElementsByClassName('sidebarAccount')[0]).toBeInTheDocument();
    });

    test('toggles visibility on click on mobile', () => {
        const getOpenMock = jest.fn();
        ((useMediaQuery as unknown) as jest.Mock).mockReturnValue(true);
        render(<SidebarAccountWithRouter />);

        const accountLink = screen.getByText('Account').parentElement as HTMLElement;
        fireEvent.click(accountLink);

        // handle the asynchronous state update
        setTimeout(() => {
            expect(getOpenMock).toHaveBeenCalledWith(false);
        }, 0);
    });

    test("clicking on elements navigates to the correct route", async () => {
        render(<SidebarAccountWithRouter />);

        const projectsLink = screen.getByText('Projects').parentElement as HTMLElement;
        fireEvent.click(projectsLink);

        setTimeout(() => {
            expect(mockedNavigator).toHaveBeenCalledWith(
                '/fiber-friend/account/projects'
            );
        }, 0);
    });
});

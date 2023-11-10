import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const NavbarWithRouter = () => {
    return <BrowserRouter>
        <Navbar />
    </BrowserRouter>
}

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

describe("Navbar component", () => {
    test("renders Navbar component", () => {
        render(<NavbarWithRouter />);
        expect(screen.getByText("Fiber Friend")).toBeInTheDocument();
    });

    test("doesn't render menu icon on desktop", () => {
        const { container } = render(<NavbarWithRouter />);

        const menuButton = container.getElementsByClassName("menuIcon")[0];

        expect(menuButton).toBeUndefined();
    });

    test("doesn't render add icon on desktop", () => {
        const { container } = render(<NavbarWithRouter />);

        const menuButton = container.getElementsByClassName("addIcon")[0];

        expect(menuButton).toBeUndefined();
    });

    test("renders menu icon on mobile and clicking on menu icon toggles sidebar", () => {
        ((useMediaQuery as unknown) as jest.Mock).mockReturnValue(true);
        const { container } = render(<NavbarWithRouter />);

        const menuButton = container.getElementsByClassName("menuIcon")[0].children[0];

        act(() => {
            userEvent.click(menuButton)
        });
        expect(container.getElementsByClassName("sidebarAccount")[0]).toBeInTheDocument();
    });

    test("renders add icon on mobile and clicking on add icon opens the add menu", () => {
        ((useMediaQuery as unknown) as jest.Mock).mockReturnValue(true);
        const { container } = render(<NavbarWithRouter />);

        const addIcon = container.getElementsByClassName("addIcon")[0].children[0];

        act(() => {
            userEvent.click(addIcon);
        });
        expect(screen.getByText("Add project")).toBeInTheDocument();
    });

    test("clicking on add menu item navigates to the correct route on mobile", async () => {
        ((useMediaQuery as unknown) as jest.Mock).mockReturnValue(true);
        const { container } = render(<NavbarWithRouter />);

        const addIcon = container.getElementsByClassName("addIcon")[0].children[0];

        act(() => {
            userEvent.click(addIcon);
        });

        const addProjectItem = await screen.findByText("Add project");

        act(() => {
            userEvent.click(addProjectItem);
        });

        expect(mockedNavigator).toHaveBeenCalledWith(
            "account/projects/new-project"
          );
    });
});

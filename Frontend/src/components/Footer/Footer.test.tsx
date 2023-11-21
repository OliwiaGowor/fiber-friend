import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Footer';

describe('Footer', () => {
    it('renders without crashing', () => {
        render(<Router><Footer /></Router>);
    });

    it('displays logo and media icons', () => {
        const { getByAltText, container } = render(<Router><Footer /></Router>);

        expect(getByAltText('Logo')).toBeInTheDocument();
        expect(container.getElementsByClassName('facebook')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('mediaIcon')[1]).toBeInTheDocument();
    });

    it('displays correct links', () => {
        const { getByText } = render(<Router><Footer /></Router>);

        expect(getByText('About')).toBeInTheDocument();
        expect(getByText('Your account')).toHaveAttribute('href', '/account');
    });
});
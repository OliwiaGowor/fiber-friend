import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MiniaturesList from './MiniaturesList';

const data = [
    {
        id: '1',
        name: 'Test 1',
        photos: ['test1.jpg']
    },
    {
        id: '2',
        name: 'Test 2',
        photos: ['test2.jpg']
    }
];

describe('MiniaturesList', () => {
    it('renders without crashing', () => {
        render(<Router><MiniaturesList data={[]} link="" /></Router>);
    });

    it('renders correct number of SwiperSlide components', () => {
        const { getAllByRole } = render(<Router><MiniaturesList data={data} link="" /></Router>);

        expect(getAllByRole('link').length).toBe(data.length + 1); // +1 for the "Add project" link
    });

    it('displays correct image for each miniature', () => {
        const { getAllByRole } = render(<Router><MiniaturesList data={data} link="" /></Router>);
        const images = getAllByRole('img');

        expect(images[0]).toHaveAttribute('src', 'test1.jpg');
        expect(images[1]).toHaveAttribute('src', 'test2.jpg');
    });
});
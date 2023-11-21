import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Tiles from './Tiles';

const loadedProjects = [
    {
        id: '1',
        name: 'Test 1',
        photos: [{ url: 'test1.jpg' }]
    },
    {
        id: '2',
        name: 'Test 2',
        photos: [{ url: 'test2.jpg' }]
    }
];

describe('Tiles', () => {
    it('renders without crashing', () => {
        render(<Router><Tiles data={undefined} link={''} addText={''} /></Router>);
    });

    it('renders correct number of Link components', () => {
        const { getAllByRole } = render(<Router><Tiles data={loadedProjects} link={''} addText={''} /></Router>);

        expect(getAllByRole('link').length).toBe(loadedProjects.length + 1); // +1 for the "Add project" link
    });

    it('displays correct image for each project', () => {
        const { getAllByRole } = render(<Router><Tiles data={loadedProjects} link={''} addText={''} /></Router>);
        const images = getAllByRole('img');

        expect(images[0]).toHaveAttribute('src', 'test1.jpg');
        expect(images[1]).toHaveAttribute('src', 'test2.jpg');
    });
});
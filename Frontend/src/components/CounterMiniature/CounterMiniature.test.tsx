import { render, fireEvent } from '@testing-library/react';
import CounterMiniature from './CounterMiniature';

describe('CounterMiniature', () => {
    it('renders without crashing', () => {
        render(<CounterMiniature editable={true} counter={{}} />);
    });

    it('opens menu on settings button click', async () => {
        const mockDeleteCounter = jest.fn();
        const { container, getByRole } = render(<CounterMiniature editable={true} counter={{}} deleteCounter={mockDeleteCounter} />);
        const button = container.querySelector('#edit-button') as HTMLButtonElement;

        fireEvent.click(button);

        expect(await getByRole('menu')).toBeInTheDocument();
    });
});
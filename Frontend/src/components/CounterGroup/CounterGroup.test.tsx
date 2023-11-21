import { render, fireEvent } from '@testing-library/react';
import CounterGroup from './CounterGroup';

describe('CounterGroup', () => {
    it('renders without crashing', () => {
        render(<CounterGroup parentId={'1'} />);
    });

    it('opens popup on Add counter button click', async () => {
        const { container, findByRole } = render(<CounterGroup parentId={'1'} />);
        const button = container.getElementsByClassName('addButton')[0];

        fireEvent.click(button);

        const popup = await findByRole("dialog");
        expect(popup).toBeInTheDocument();

    });

    it('renders correct number of CounterMiniature components', () => {
        const counters = [{}, {}, {}];
        const { container } = render(<CounterGroup parentId={'1'} defaultValue={counters} />);
        const counterMiniatures = container.getElementsByClassName('counters')[0].firstChild as HTMLDivElement;

        expect(counterMiniatures.children.length).toBe(counters.length + 1);
    });
});
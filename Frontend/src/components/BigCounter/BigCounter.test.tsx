import { render, fireEvent } from '@testing-library/react';
import BigCounter from './BigCounter';

describe('BigCounter', () => {
    test('renders without crashing', () => {
        const mockGetCounter = jest.fn();
        render(<BigCounter getCounter={mockGetCounter} />);
    });

    test('increases count on click', () => {
        const mockGetCounter = jest.fn();
        const { container } = render(<BigCounter getCounter={mockGetCounter} />);
        const button = container.getElementsByClassName('addBtn')[0];

        fireEvent.click(button);

        expect(mockGetCounter).toHaveBeenCalledWith({ name: "", amount: 1 });
    });

    test('calls getCounter with correct parameters', () => {
        const mockGetCounter = jest.fn();
        render(<BigCounter getCounter={mockGetCounter} />);

        expect(mockGetCounter).toHaveBeenCalledWith({ name: "", amount: 0 });
    });

    test('decreases count on click', () => {
        const mockGetCounter = jest.fn();
        const { container } = render(<BigCounter getCounter={mockGetCounter} />);

        //increase first
        const buttonAdd = container.getElementsByClassName('addBtn')[0];
        fireEvent.click(buttonAdd);
        expect(mockGetCounter).toHaveBeenCalledWith({ name: "", amount: 1 });

        const buttonSub = container.getElementsByClassName('subBtn')[0];

        fireEvent.click(buttonSub);

        expect(mockGetCounter).toHaveBeenCalledWith({ name: "", amount: 0 });
    });

    test('displays the correct count', () => {
        const mockGetCounter = jest.fn();
        const { container } = render(<BigCounter getCounter={mockGetCounter} />);
        const countDisplay = container.getElementsByClassName('number')[0] as HTMLInputElement;

        expect(countDisplay.value).toBe('0');
    });

    test('displays the correct name', () => {
        const mockGetCounter = jest.fn();
        const { container } = render(<BigCounter getCounter={mockGetCounter} />);
        const nameDisplay = container.getElementsByClassName('counterName')[0] as HTMLInputElement;

        expect(nameDisplay.textContent).toBe('');
    });

    test('increases count on space bar press', () => {
        const mockGetCounter = jest.fn();
        const { container } = render(<BigCounter getCounter={mockGetCounter} />);
        const countDisplay = container.getElementsByClassName('number')[0] as HTMLInputElement;

        fireEvent.keyDown(document.body, { key: ' ' });

        expect(countDisplay.value).toBe('1');
    });

    test('changes counter name', () => {
        const mockGetCounter = jest.fn();
        const { container } = render(<BigCounter getCounter={mockGetCounter} />);
        const nameInput = container.getElementsByClassName('counterName')[0].getElementsByTagName('input')[0] as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: 'Test Counter' } });

        expect(nameInput.value).toBe('Test Counter');
    });

    test('changes counter value manually', () => {
        const mockGetCounter = jest.fn();
        const { container } = render(<BigCounter getCounter={mockGetCounter} />);
        const countInput = container.getElementsByClassName('number')[0] as HTMLInputElement;

        fireEvent.change(countInput, { target: { value: '5' } });

        expect(countInput.value).toBe('5');
    });
});
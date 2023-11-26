import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FiltersBar from './FiltersBar';

describe('FiltersBar component', () => {
    const sampleFilters = [
        {
            name: "Status",
            options: [
                {
                    name: "Active",
                    value: "active"
                },
                {
                    name: "Completed",
                    value: "completed"
                }
            ],
            setValue: jest.fn(),
        },
        {
            name: "Type",
            options: [
                {
                    name: "Clothes",
                    value: "clothes"
                },
                {
                    name: "Other",
                    value: "other"
                }
            ],
            setValue: jest.fn(),
        },
    ];

    test('renders FiltersBar component with correct structure', () => {
        render(<FiltersBar filters={sampleFilters} applyFilters={() => {}}  />);

        expect(screen.getByText('Filter by')).toBeInTheDocument();

        sampleFilters.forEach((filter) => {
            expect(screen.getByText(filter.name + ':')).toBeInTheDocument();
        });
    });

    test('calls setValue when selecting an option', () => {
        const {container} = render(<FiltersBar filters={sampleFilters} applyFilters={() => {}} />);

        const firstFilterSelect = container.getElementsByClassName('select')[0].querySelector('input') as HTMLElement;
        fireEvent.change(firstFilterSelect, { target: { value: 'active' } });

        expect(sampleFilters[0].setValue).toHaveBeenCalledWith('active');
    });
});

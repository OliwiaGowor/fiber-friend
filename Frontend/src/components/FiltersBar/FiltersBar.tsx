import { MenuItem, Select } from '@mui/material';
import classes from './FiltersBar.module.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';

interface FiltersBarProps {
    filters: object[];
    applyFilters: Function;
}

const FiltersBar = ({ filters, applyFilters }: FiltersBarProps) => {
    const [chosenFilters, setChosenFilters] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setChosenFilters(Object.fromEntries([...searchParams]));
    }, []);

    useEffect(() => {
        setSearchParams(chosenFilters);
    }, [chosenFilters]);

    const getFilterValue = (filterName: string) => {
        if (filterName in chosenFilters) {
            return chosenFilters[filterName as keyof typeof chosenFilters];
        } else {
            return 'all';
        }
    };

    return (
        <div className={classes.filtersBar}>
            <h1>Filter by</h1>
            {filters.map((filter: any) => (
                <div className={classes.filter} key={filter.name}>
                    <p>{filter.name}:</p>
                    <Select
                        className={classes.select}
                        onChange={(e) => setChosenFilters({ ...chosenFilters, [filter.name]: e.target.value })}
                        defaultValue="all"
                        value={getFilterValue(filter.name)}
                        aria-labelledby={`${filter.name}-label`}
                    >
                        <MenuItem value="all">All</MenuItem>
                        {filter.options.map((option: any) => (
                            <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </div>
            ))}
            <Button
                onClick={() => applyFilters(chosenFilters)}
            >
                Apply
            </Button>
        </div>
    );
};

export default FiltersBar;

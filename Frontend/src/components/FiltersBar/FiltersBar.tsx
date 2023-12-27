import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import classes from './FiltersBar.module.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import _ from 'lodash';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import { useTranslation } from 'react-i18next';

interface FiltersBarProps {
    filters: object[];
    applyFilters: Function;
}

const FiltersBar = ({ filters, applyFilters }: FiltersBarProps) => {
    const { t } = useTranslation("FiltersBar");
    const [chosenFilters, setChosenFilters] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setChosenFilters(Object.fromEntries([...searchParams]));
    }, []);

    useEffect(() => {
        setSearchParams(chosenFilters);
        applyFilters(chosenFilters);
    }, [chosenFilters]);

    const getFilterValue = (filterName: string) => {
        if (filterName in chosenFilters) {
            return chosenFilters[filterName as keyof typeof chosenFilters];
        } else {
            return '';
        }
    };

    const handleChangeFilter = (newFilterValue: string, filterName: string) => {
        const tmpFilters = { ...chosenFilters } as { [key: string]: any };

        if (newFilterValue === '') {
            delete tmpFilters[filterName];
        } else {
            tmpFilters[filterName] = newFilterValue;
        }

        setChosenFilters(tmpFilters);
    };

    return (
        <div className={classes.filtersBar}>
            <h1 className={classes.header}>{t('header')}</h1>
            <div className={classes.filters}>
                {filters.map((filter: any) => (
                    <div className={classes.filter} key={filter.name}>
                        {filter.name === "Category" ?
                        <CategoriesMenu choseCategory={(value: string) => handleChangeFilter(value, "Category")} showError={false} />
                        :
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="select-label">{filter.name}</InputLabel>
                            <Select
                                labelId="select-label"
                                className={classes.formInput}
                                onChange={(e) => handleChangeFilter(e.target.value, filter.name)}
                                value={getFilterValue(filter.name)}
                                aria-labelledby={`${filter.name}-label`}
                            >
                                <MenuItem value="">{t('all')}</MenuItem>
                                {filter.options.map((option: any) => (
                                    <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FiltersBar;

export const filtersBarTranslations = {
    en: {
        header: 'Filter by:',
        all: 'All',
    },
    pl: {
        header: 'Filtruj po:',
        all: 'Wszystkie',
    },
}
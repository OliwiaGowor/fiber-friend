import { MenuItem, Select } from '@mui/material';
import classes from './FiltersBar.module.scss';

interface FiltersBarProps {
    filters: object[];
}

const FiltersBar = ({ filters }: FiltersBarProps) => {

    return (
        <div className={classes.filtersBar}>
            <h1>Filter by</h1>
            {filters.map((filter: any) => (
                <div className={classes.filter} key={filter.name}>
                    <p>{filter.name}:</p>
                    <Select
                        className={classes.select}
                        onChange={(e) => filter.setValue(e.target.value)}
                        defaultValue={"all"}
                    >
                        <MenuItem value="all">All</MenuItem>
                        {filter.options.map((option: any) => (
                            <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </div>
            ))}
        </div>
    );
};

export default FiltersBar;

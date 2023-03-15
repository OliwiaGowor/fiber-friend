import * as React from 'react';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { categories } from './Categories';
import classes from './CategoriesMenu.module.scss'

export default function CategoriesMenu() {
    const [currentCategory, setCurrentCategory] = React.useState(categories);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [categHistory, setCategHistory] = React.useState<any>([]);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setCurrentCategory(categories);
        setCategHistory([]);
    };

    const checkChildren = (category: any) => {
        if (category.children) {
            return generateBtnWithChildren(category);
        } else {
            return generateBtnCategoryChoice(category);
        }
    };

    const handleSubcategory = (category: any) => {
        setCurrentCategory(category.children);
        setCategHistory([...categHistory, category])

    };

    const handleCategoryChoice = () => {

    };

    const generateBtnWithChildren = (category: any) => {
        return (
            <button className={classes.btnCategory} onClick={() => handleSubcategory(category)}>
                {category.category}
                <KeyboardArrowRightIcon sx={{ fontSize: '16px' }} />
            </button>
        );
    };

    const generateBtnCategoryChoice = (category: any) => {
        return (
            <button className={classes.btnCategory} onClick={handleCategoryChoice}>
                {category.category}
            </button>
        );
    };

    const generateBackButton = () => {
        if (currentCategory != categories) {
            return (
                <MenuItem className={classes.category}>
                    <button className={`${classes.btnCategory} ${classes.btnBack}`} onClick={() => {
                        if (categHistory.length <= 1) { 
                            setCurrentCategory(categories); 
                        } else {
                            setCurrentCategory(categHistory[categHistory.length - 2].children); 
                        }
                        setCategHistory(
                            categHistory.filter((c: { category: any; }) =>
                                c.category !== categHistory[categHistory.length - 1].category
                            ));
                    }}>
                        <KeyboardArrowLeftIcon sx={{ fontSize: '16px' }} />
                        <div className={classes.btnText}>Back</div>
                    </button>
                </MenuItem>
            );
        }
    }

    return (
        <div className={classes.menuContainer}>
            <Button
                id="categories-menu-button"
                aria-controls={open ? 'categories-menu-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                className={classes.categoriesMenuBtn}
            >
                Choose category
            </Button>
            <Menu
                id="categories-menu"
                MenuListProps={{
                    'aria-labelledby': 'categories-menu-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={classes.categoriesMenu}
            >
                {generateBackButton()}
                {currentCategory.map((category: any, index: number) => (
                    < MenuItem disableRipple className={classes.category} key={index} >
                        {checkChildren(category)}
                    </MenuItem>
                ))}
            </Menu>
        </div >
    );
}
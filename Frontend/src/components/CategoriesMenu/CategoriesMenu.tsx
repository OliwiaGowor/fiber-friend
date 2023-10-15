import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { categories } from '../../data/Categories';
import classes from './CategoriesMenu.module.scss'

export default function CategoriesMenu({choseCategory, showError, defaultValue}: any) {
    const [currentCategory, setCurrentCategory] = React.useState(categories); //represents the currently displayed category in the menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); //represents the anchor element where the menu will be positioned
    const [categHistory, setCategHistory] = React.useState<any>([]); //represents the category history - the stack of previous categories selected
    const [chosenCategory, setChosenCategory] = React.useState<string | null>(defaultValue ? defaultValue : null); //represents the currently selected category
    const open = Boolean(anchorEl); //a boolean that determines whether the menu is open or closed

    //sets the anchorEl state to the clicked element to show the menu
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    //sets the anchorEl, currentCategory, and categHistory states to null and categories, respectively, to close the menu and reset its state
    const handleClose = () => {
        setAnchorEl(null);
        setCurrentCategory(categories);
        setCategHistory([]);
    };

    //checks whether the category has children subcategories, and renders a button with the right arrow icon to display its subcategories 
    //or a button to select the category
    const checkChildren = (category: any) => {
        if (category.children) {
            return generateBtnWithChildren(category);
        } else {
            return generateBtnCategoryChoice(category);
        }
    };

    //sets the currentCategory state to the selected subcategory and updates the categHistory state
    const handleSubcategory = (category: any) => {
        setCurrentCategory(category.children);
        setCategHistory([...categHistory, category])

    };

    // calls the chooseCategory function passed as props with the selected category and sets the choosenCategory state to the selected category. 
    //It also calls handleClose to close the menu.
    const handleChoseCategory = (category: any) => {
        choseCategory(category.category);
        setChosenCategory(category.category);
        handleClose();
    }

    //renders a button with the right arrow icon to display the category's subcategories
    const generateBtnWithChildren = (category: any) => {
        return (
            <button className={classes.btnCategory} onClick={() => handleSubcategory(category)}>
                {category.category}
                <KeyboardArrowRightIcon sx={{ fontSize: '16px' }} />
            </button>
        );
    };

    //renders a button to select the category
    const generateBtnCategoryChoice = (category: any) => {
        return (
            <button className={classes.btnCategory} onClick={() => handleChoseCategory(category)}>
                {category.category}
            </button>
        );
    };

    //generates a back button to return to the previous category in the history stack. It is only displayed when there is a history stack.
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
    };

    return (
        <div className={classes.menuContainer}>
            <Button
                id="categories-menu-button"
                aria-controls={open ? 'categories-menu-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                disableRipple
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                className={classes.categoriesMenuBtn}
                style={{
                    padding: "12px 16.5px",
                    backgroundColor: 'var(--background-color)', 
                    color: 'var(--text-color-dark)',
                }}
                color={showError ? 'error' : 'primary'}
            >
                {chosenCategory ? chosenCategory : "Choose category"}
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
import { Link } from "react-router-dom";
import classes from './SidebarAccount.module.scss'
import GridOnIcon from '@mui/icons-material/GridOn';
import SettingsIcon from '@mui/icons-material/Settings';
import BrushIcon from '@mui/icons-material/Brush';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalculateIcon from '@mui/icons-material/Calculate';

function SidebarAccount({ open }: any) {

    return (
        <div className={ open ? `${classes.container}` : `${classes.containerHidden}`}>

            <h2 className={classes.header}>
                <Link to={'/fiber-friend/account'} className={classes.link}>
                    <AccountCircleIcon />
                    <div className={classes.text}>Account</div>
                </Link>
            </h2>
            <ul className={classes.elements}>
                <li className={classes.element}>
                    <Link to={'projects'} className={classes.link}>
                        <GridOnIcon />
                        <div className={classes.text}>Projects</div>
                    </Link>
                </li>
                <li className={classes.element}>
                    <Link to={'patterns'} className={classes.link}>
                        <BrushIcon />
                        <div className={classes.text}>Patterns</div>
                    </Link>
                </li>
                <li className={classes.element}>
                    <Link to={'counters'} className={classes.link}>
                        <CalculateIcon />
                        <div className={classes.text}>Counters</div>
                    </Link>
                </li>
                {/*<li className={classes.element}>
                    <Link to={'orders'} className={classes.link}>
                        <ShoppingBasketIcon />
                        <div className={classes.text}>Orders</div>
                    </Link>
                </li>*/}
                <li className={classes.element}>
                    <Link to={'supplies'} className={classes.link}>
                        <ShoppingBasketIcon />
                        <div className={classes.text}>Supplies</div>
                    </Link>
                </li>
                {/*<li className={classes.element}>
                    <Link to={'settings'} className={classes.link}>
                        <ShoppingBasketIcon />
                        <div className={classes.text}>Settings</div>
                    </Link>
                </li>*/}
            </ul>
        </div>
    );

}

export default SidebarAccount;
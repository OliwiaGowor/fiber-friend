import {useState} from "react"
import classes from "./Counter.module.scss";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from "@mui/material/Button";

export default function Counter () {
    const [count, setCount] = useState(0);

    return (
        <div className={classes.container}>
            <h2>Counter</h2>
            <div className={classes.counter}>
                <Button variant='contained' onClick={() => {(count > 0) ? setCount(count - 1) : setCount(count)}}><RemoveIcon></RemoveIcon></Button>
                <div className={classes.number}>{count}</div>
                <Button variant='contained' onClick={() => {setCount(count + 1)}}><AddIcon></AddIcon></Button>
            </div>
        </div>
    );
}
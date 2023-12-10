import classes from "./IncDecCounter.module.scss";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { tokenLoader } from "../../utils/auth";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";

export default function IncDecCounter() {
    const token = tokenLoader();
    const [type, setType] = useState<string>("decrease");
    const [currStitches, setCurrStitches] = useState<number>(0);
    const [desStitches, setDesStitches] = useState<number>(0);
    const [numOfRows, setNumOfRows] = useState<number>(0);

    const calcDecrease = () => {
        let result: { stitchPerRow: number[], rows: { everyStitch: number, rest: number }[] } = { stitchPerRow: [], rows: [] };
        const diff = currStitches - desStitches;
        const stitchPerRow = diff / numOfRows;
        let stitchPerRowArr: number[] = new Array(numOfRows).fill(Math.floor(stitchPerRow));

        if (stitchPerRow % 1 !== 0) {
            for (let i = 1; i < (diff % numOfRows); i++) {
                stitchPerRowArr[i] = stitchPerRowArr[i] + 1;
            }
        }

        result.stitchPerRow = stitchPerRowArr;
        let currNumbStitches = currStitches;
        let iter = 0;

        while (currNumbStitches > desStitches) {
            let everyStitch = Math.floor(currNumbStitches / stitchPerRowArr[iter]);
            let rest = currNumbStitches % stitchPerRowArr[iter];

            result.rows = [...result.rows, { everyStitch: everyStitch, rest: rest }];

            iter++;
            currNumbStitches -= stitchPerRowArr[iter];
        }
        return result;
    }

    const calcIncrease = () => {
        let result: { stitchPerRow: number[], rows: { everyStitch: number, rest: number }[] } = { stitchPerRow: [], rows: [] };
        const diff = desStitches - currStitches;
        const stitchPerRow = diff / numOfRows;
        let stitchPerRowArr: number[] = new Array(numOfRows).fill(Math.floor(stitchPerRow));

        if (stitchPerRow % 1 !== 0) {
            for (let i = 1; i < (diff % numOfRows); i++) {
                stitchPerRowArr[i] = stitchPerRowArr[i] + 1;
            }
        }

        result.stitchPerRow = stitchPerRowArr;
        let currNumbStitches = currStitches;
        let iter = 0;

        while (currNumbStitches < desStitches) {
            let everyStitch = Math.floor(currNumbStitches / stitchPerRowArr[iter]);
            let rest = currNumbStitches % stitchPerRowArr[iter];

            result.rows = [...result.rows, { everyStitch: everyStitch, rest: rest }];
            iter++;
            currNumbStitches += stitchPerRowArr[iter];
        };

        return result;
    }

    const handleResultRender = () => {
        if (type === "decrease") {
            return (
                <div className={classes.resultContainer}>
                    <div>Decrease by:</div>
                    {
                        calcDecrease().stitchPerRow.map((stitch, index) => {
                            return (
                                <div key={index}>{stitch}</div>
                            )
                        })
                    }
                    <div></div>
                </div>
            )
        } else {
            return (
                <div className={classes.resultContainer}>
                    <div>Increase by</div>
                    <div></div>
                </div>
            )
        }
    }

    return (
        <div className={classes.container}>
            <h1>Stitch counter</h1>
            <div className={classes.typeToggleContainer}>
                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={(event, newType) => { setType(newType) }}
                    aria-label="text alignment"
                    id="types"
                    className={classes.typeToggle}
                >
                    <ToggleButton value={"decrease"} className={classes.toggleButton} aria-label="decrease" disableRipple
                        sx={{
                            backgroundColor: "var(--background-color)",
                            '&.Mui-selected, &.Mui-selected:hover': {
                                backgroundColor: "var(--main-color-medium)",
                            }
                        }}>
                        Decrease
                    </ToggleButton>
                    <ToggleButton value={"increase"} className={classes.toggleButton} aria-label="increase" disableRipple
                        sx={{
                            backgroundColor: "var(--background-color)",
                            '&.Mui-selected, &.Mui-selected:hover': {
                                backgroundColor: "var(--main-color-medium)",
                            }
                        }}>
                        Increase
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className={classes.sectionContainer}>
                <div>Current number of stitches</div>
                <TextField
                    id="name"
                    inputProps={{
                        'aria-label': 'name',
                    }}
                    label="Number of stitches"
                    className={classes.formInput}
                    type='number'
                    name='name'
                    onChange={(e) => { setCurrStitches(Number(e.target.value)) }}
                    value={currStitches}
                />
                <div>Desired number of stitches</div>
                <TextField
                    id="name"
                    inputProps={{
                        'aria-label': 'name',
                    }}
                    label="Number of stitches"
                    className={classes.formInput}
                    type='number'
                    name='name'
                    onChange={(e) => { setDesStitches(Number(e.target.value)) }}
                    value={desStitches}
                />
                <div>Number of rows with {type === "decrease" ? "decreases" : "increases"}</div>
                <TextField
                    id="name"
                    inputProps={{
                        'aria-label': 'name',
                    }}
                    label="Number of rows"
                    className={classes.formInput}
                    type='number'
                    name='name'
                    onChange={(e) => { setNumOfRows(Number(e.target.value)) }}
                    value={numOfRows}
                />
                <Button
                    className={classes.submitBtn}
                    onClick={() => { calcDecrease() }}

                >
                    Calculate!
                </Button>
                <div className={classes.resultContainer}>

                </div>
            </div>
        </div>
    );
}
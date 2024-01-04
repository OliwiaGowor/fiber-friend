// IncDecCounter.tsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/base";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import classes from "./IncDecCounter.module.scss";

export default function IncDecCounter() {
    const { t } = useTranslation("IncDecCounter");
    const [type, setType] = useState<string>("decrease");
    const [currStitches, setCurrStitches] = useState<number>(0);
    const [desStitches, setDesStitches] = useState<number>(0);
    const [numOfRows, setNumOfRows] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);

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
            const result = calcDecrease();
            return (
                <div className={classes.sectionContainer}>
                    <h2>{t('result')}</h2>
                    {result.rows.map((row, index) => {
                        return (
                            <div key={index}>
                                <p className={classes.rowNumber}>{t('row')} {index + 1}</p>
                                <p>{t('decrease')} {result.stitchPerRow[index]} {t('stitches')}</p>
                                <p>{t('decreaseEvery')} {row.everyStitch} {t('stitches')}</p>
                                <p>{t('leftWith')} {row.rest} {t('stitchesAtEnd')}</p>
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            const result = calcIncrease();
            return (
                <div className={classes.sectionContainer}>
                    <h2>{t('result')}</h2>
                    {result.rows.map((row, index) => {
                        return (
                            <div key={index}>
                                <p className={classes.rowNumber}>{t('row')} {index + 1}</p>
                                <p>{t('increase')} {result.stitchPerRow[index]} {t('stitches')}</p>
                                <p>{t('increaseEvery')} {row.everyStitch} {t('stitches')}</p>
                                <p>{t('leftWith')} {row.rest} {t('stitchesAtEnd')}</p>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.calcContainer}>
                <h1>{t('stitchCounter')}</h1>
                <div className={classes.typeToggleContainer}>
                    <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={(event, newType) => setType(newType)}
                        aria-label="text alignment"
                        id="types"
                        className={classes.typeToggle}
                    >
                        <ToggleButton
                            value={"decrease"}
                            className={classes.toggleButton}
                            aria-label="decrease"
                            disableRipple
                            sx={{
                                backgroundColor: "var(--background-color)",
                                '&.Mui-selected, &.Mui-selected:hover': {
                                    backgroundColor: "var(--main-color-medium)",
                                },
                            }}
                        >
                            {t('decrease')}
                        </ToggleButton>
                        <ToggleButton
                            value={"increase"}
                            className={classes.toggleButton}
                            aria-label="increase"
                            disableRipple
                            sx={{
                                backgroundColor: "var(--background-color)",
                                '&.Mui-selected, &.Mui-selected:hover': {
                                    backgroundColor: "var(--main-color-medium)",
                                },
                            }}
                        >
                            {t('increase')}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className={classes.sectionContainer}>
                    <div>{t('currentNumberOfStitches')}</div>
                    <TextField
                        id="currStitches"
                        inputProps={{
                            'aria-label': 'currStitches',
                        }}
                        label={t('numberOfStitches')}
                        className={classes.formInput}
                        type='number'
                        name='currStitches'
                        onChange={(e) => setCurrStitches(Number(e.target.value))}
                        value={currStitches}
                    />
                    <div>{t('desiredNumberOfStitches')}</div>
                    <TextField
                        id="desStitches"
                        inputProps={{
                            'aria-label': 'desStitches',
                        }}
                        label={t('numberOfStitches')}
                        className={classes.formInput}
                        type='number'
                        name='desStitches'
                        onChange={(e) => setDesStitches(Number(e.target.value))}
                        value={desStitches}
                    />
                    <div>{t(`numberOfRowsWith${type === "decrease" ? 'Decreases' : 'Increases'}`)}</div>
                    <TextField
                        id="numOfRows"
                        inputProps={{
                            'aria-label': 'numOfRows',
                        }}
                        label={t('numberOfRows')}
                        className={classes.formInput}
                        type='number'
                        name='numOfRows'
                        onChange={(e) => setNumOfRows(Number(e.target.value))}
                        value={numOfRows}
                    />
                    <Button
                        className={classes.submitBtn}
                        onClick={() => setShowResults(true)}
                    >
                        {t('calculate')}
                    </Button>
                </div>
            </div>
            <div className={classes.resultContainer}>
                {showResults ? handleResultRender() : null}
            </div>
        </div>
    );
}

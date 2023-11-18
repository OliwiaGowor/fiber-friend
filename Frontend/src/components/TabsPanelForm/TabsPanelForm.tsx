import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Autocomplete, TextField } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { tokenLoader } from '../../utils/auth';
import classes from './TabsPanelForm.module.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface BasicTabsFormProps {
  getInfo: any;
  showError: boolean;
  defaultValue?: any;
}
//TODO: make it also for tools for patterns?
export default function BasicTabsForm(props: BasicTabsFormProps) {
  const { getInfo, showError, defaultValue, ...other } = props;
  const [value, setValue] = React.useState(0);
  const toolSizeRef = React.useRef<HTMLInputElement | null>(null);
  const gaugeRef = React.useRef<HTMLInputElement | null>(null);
  const stitchRef = React.useRef<HTMLInputElement | null>(null);
  const amountRef = React.useRef<HTMLInputElement | null>(null);
  const [yarns, setYarns] = React.useState<any>(defaultValue ?? []);
  const [yarnName, setYarnName] = React.useState<string | null>('');
  const [fetchedYarns, setFetchedYarns] = React.useState<any>([]);

  const fetchAvailableYarns = useCallback(async () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = tokenLoader();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}Resource${process.env.REACT_APP_ENV === "dev" ? "/GetAllYarnsForUser" : ".json"}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedYarns = [];

      for (const key in data) {
        loadedYarns.push({
          id: key,
          name: data[key].name,
        });
      }
      setFetchedYarns(loadedYarns);

    } catch (error) {
      //setError("Something went wrong, try again.");
    }
  }, []);

  useEffect(() => {
    fetchAvailableYarns();
  }, []);

  const handleData = (yarnName: string) => {
    const tmpYarnsInfo = yarns?.map((yarn: any) => {
      if (yarn.name === yarnName) {
        return ({
          id: yarn.id,
          yarn: yarn.name,
          toolSize: toolSizeRef.current?.value,
          gauge: gaugeRef.current?.value,
          stitch: stitchRef.current?.value,
          quantity: amountRef.current?.value,
        });
      } else {
        return (yarn);
      }
    });
    setYarns(tmpYarnsInfo);
    getInfo(yarns);
  }

  const handleAddTab = () => {
    setYarns([...yarns, {
      id: yarns.length,
      name: yarnName,
      toolSize: '',
      gauge: '',
      stitch: '',
      amount: '',
    }])
    setYarnName('');
    setValue(yarns.length);
  };

  const handleDeleteTab = (yarn: any) => {
    let tmpArray = yarns?.filter((y: any) =>
      y.id !== yarn.id);

    for (let i = 0; i < tmpArray.length; i++) {
      tmpArray[i].id = i;
    }
    setYarns(tmpArray);
  };

  return (
    <div className={classes.container}>
      <div className={classes.addYarns}>
        <Autocomplete
          id="yarn-input"
          freeSolo
          size="medium"
          className={classes.formInput}
          options={fetchedYarns?.map((option: any) => option.name)}
          renderInput={(params) => <TextField {...params} label="Add new yarn" />}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => { setYarnName(newValue) }}
          value={yarnName}
        />
        <Button
          className={classes.addButton}
          onClick={handleAddTab}
          variant="contained">
          Add
        </Button>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            aria-label="basic tabs"
            onChange={(event: React.SyntheticEvent, newValue: number) => { setValue(newValue) }}
            variant='scrollable'
            sx={{
              '.MuiTabs-indicator': {
                backgroundColor: "var(--main-color-dark)"
              }
            }}>
            {yarns?.map((yarn: any, index: number) => {
              return (
                <Tab key={index}
                  className={classes.tab}
                  label={yarn.name}
                  {...a11yProps(index)}
                  disableRipple
                  iconPosition='end'
                  icon={<CloseIcon className={classes.deleteIcon} onClick={() => { handleDeleteTab(yarn) }} />}
                  sx={{
                    '&.Mui-selected, &.Mui-selected:hover': {
                      color: "var(--main-color-dark)",
                    }
                  }}
                />
              )
            })}
          </Tabs>
        </Box>
        {yarns?.map((yarn: any, index: number) => {
          return (<TabPanel key={index} value={value} index={index} >
            <div className={classes.yarnInputs}>
              <TextField
                id={`tool-${index}`}
                aria-describedby="tool-helper-text"
                aria-label="Tool size"
                inputProps={{
                  'aria-labelledby': `tool-label-${index}`,
                }}
                label="Tool size"
                className={classes.formInput}
                name='tool'
                inputRef={toolSizeRef}
                onChange={() => { handleData(yarn.name) }}
                defaultValue={yarn.toolSize}
                required
              />

              <TextField
                id={`gauge-${index}`}
                aria-describedby="gauge-helper-text"
                aria-label="Gauge"
                inputProps={{
                  'aria-labelledby': `gauge-label-${index}`,
                }}
                label="Gauge"
                className={classes.formInput}
                name='gauge'
                onChange={() => { handleData(yarn.name) }}
                inputRef={gaugeRef}
                defaultValue={yarn.gauge}
                required
              />
              <br></br>
              <FormHelperText>Gauge 10cm by 10cm</FormHelperText>

              <TextField
                id={`stitch-${index}`}
                aria-describedby="stitch-helper-text"
                aria-label="Stitch"
                inputProps={{
                  'aria-labelledby': `stitch-label-${index}`,
                }}
                label="Stitch"
                className={classes.formInput}
                name='stitch'
                onChange={() => { handleData(yarn.name) }}
                inputRef={stitchRef}
                defaultValue={yarn.stitch}
                required
              />

              <TextField
                className={classes.formInput}
                id={`amount-${index}`}
                type='number'
                aria-describedby="amount-helper-text"
                aria-label="Amount of skeins"
                inputProps={{
                  'aria-labelledby': `amount-of-skeins-label-${index}`,
                }}
                label="Amount of skeins"
                name='amount'
                onChange={() => { handleData(yarn.name) }}
                inputRef={amountRef}
                defaultValue={yarn.amount}
                required
              />
            </div>
          </TabPanel>)
        })}
      </Box>
    </div>
  );
}

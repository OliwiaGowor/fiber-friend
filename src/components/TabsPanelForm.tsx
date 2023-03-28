import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import CloseIcon from '@mui/icons-material/Close';
import classes from './TabsPanelForm.module.scss';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const yarnAmounts = [
  'grams', 'skeins', 'meters', 'yarsd'
];

const availableYarns = [
  { name: 'yarn' },
];


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
}

export default function BasicTabsForm(props: BasicTabsFormProps) {
  const [value, setValue] = React.useState(0);
  const { getInfo, showError, ...other } = props;
  const toolSizeRef = React.useRef<HTMLInputElement | null>(null);
  const gaugeRef = React.useRef<HTMLInputElement | null>(null);
  const stitchRef = React.useRef<HTMLInputElement | null>(null);
  const amountRef = React.useRef<HTMLInputElement | null>(null);
  const [yarns, setYarns] = React.useState<any>([]);
  const [yarnInput, setYarnInput] = React.useState<any>('');
  const yarnNameRef = React.useRef<HTMLInputElement | null>(null);

  const handleData = (yarnName: string) => {
    const tmpYarnsInfo = yarns.map((yarn: any) => {
      if (yarn.yarn === yarnName) {
        return ({
          yarn: yarn.yarn,
          info:
          {
            toolSize: toolSizeRef.current?.value,
            gauge: gaugeRef.current?.value,
            stitch: stitchRef.current?.value,
            amount: amountRef.current?.value,
          }
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
      yarn: yarnNameRef.current?.value,
      info:
      {
        toolSize: '',
        gauge: '',
        stitch: '',
        amount: '',
      }
    }])
    setYarnInput('');
  }

  const handleDeleteTab = (yarn: any) => {
    setYarns(
      yarns.filter((y: any) =>
        y.yarn !== yarn.yarn)
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.yarnsAdd}>
        <TextField
          id="yarn-input"
          inputProps={{
            'aria-label': 'yarn',
          }}
          label="Add new yarn"
          size="medium"
          className={classes.formInput}
          name='name'
          inputRef={yarnNameRef}
          onChange={(event: any) => { setYarnInput(event.target.value) }}
          value={yarnInput}
          error={showError}
          helperText={showError ? 'You must add at least one yarn!' : ''}
        />
        <Button className={classes.addButton} onClick={handleAddTab} variant="contained">Add</Button>
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
            {yarns.map((yarn: any, index: number) => {
              return (
                <Tab key={index}
                  className={classes.tab}
                  label={yarn.yarn}
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
        {yarns.map((yarn: any, index: number) => {
          return (<TabPanel key={index} value={value} index={index} >
            <div className={classes.yarnInputs}>
              <TextField
                id={`tool-${index}`}
                aria-describedby="tool-helper-text"
                inputProps={{
                  'aria-label': 'tool',
                }}
                label="Tool size"

                className={classes.formInput}
                name='tool'
                inputRef={toolSizeRef}
                onChange={() => { handleData(yarn.yarn) }}
                defaultValue={yarn.info.toolSize}
              />

              <TextField
                id={`gauge-${index}`}
                aria-describedby="gauge-helper-text"
                inputProps={{
                  'aria-label': 'gauge',
                }}
                label="Gauge"

                className={classes.formInput}
                name='gauge'
                onChange={() => { handleData(yarn.yarn) }}
                inputRef={gaugeRef}
                defaultValue={yarn.info.gauge}
                required
              />
              <br></br>
              <FormHelperText>Gauge 10cm by 10cm</FormHelperText>

              <TextField
                id={`stitch-${index}`}
                aria-describedby="stitch-helper-text"
                inputProps={{
                  'aria-label': 'stitch',
                }}
                label="Stitch"

                className={classes.formInput}
                name='stitch'
                onChange={() => { handleData(yarn.yarn) }}
                inputRef={stitchRef}
                defaultValue={yarn.info.stitch}
                required
              />

              <TextField
                id={`amount-${index}`}
                aria-describedby="amount-helper-text"
                inputProps={{
                  'aria-label': 'amount',
                }}
                label="Amount of yarn"

                className={classes.formInput}
                name='amount'
                onChange={() => { handleData(yarn.yarn) }}
                inputRef={amountRef}
                defaultValue={yarn.info.amount}
                required
              />
            </div>
          </TabPanel>)
        })}

      </Box>
    </div>
  );
}

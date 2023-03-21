import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import CloseIcon from '@mui/icons-material/Close';
import classes from './TabsPanelForm.module.scss';
import { setSyntheticLeadingComments } from 'typescript';
import Button from '@mui/material/Button';

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
        <Box sx={{ p: 3 }}>
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
}

export default function BasicTabsForm(props: BasicTabsFormProps) {
  const [value, setValue] = React.useState(0);
  const { getInfo, ...other } = props;
  const toolSizeRef = React.useRef<HTMLInputElement | null>(null);
  const gaugeRef = React.useRef<HTMLInputElement | null>(null);
  const stitchRef = React.useRef<HTMLInputElement | null>(null);
  const amountRef = React.useRef<HTMLInputElement | null>(null);
  const [yarns, setYarns] = React.useState<any>([]);
  const [yarnInput, setYarnInput] = React.useState<any>('');
  const yarnNameRef = React.useRef<HTMLInputElement | null>(null);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  const handleChange = (event: any) => {
    setYarnInput(event.target.value)
  }

  const handleDeleteTab = (yarn: any) => {
    console.log(yarn);
      setYarns(
        yarns.filter((y: any) =>
          y.yarn !== yarn.yarn)
      );
  }
  console.log(yarns);
  return (
    <div>
      <label>Yarns</label>
      <div>
        <p className={classes.additionalText}>Add yarns to see more</p>
        <OutlinedInput
          id="yarn-input"
          inputProps={{
            'aria-label': 'yarn',
          }}
          placeholder="Add new yarn"
          size="small"
          className={classes.formInput}
          name='name'
          inputRef={yarnNameRef}
          onChange={handleChange}
          value={yarnInput}
        />
        <Button onClick={handleAddTab} variant="contained">Add</Button>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} aria-label="basic tabs" onChange={handleChangeTabs} variant='scrollable'>
            {yarns.map((yarn: any, index: number) => {
              return (
                <Tab key={index} label={yarn.yarn} {...a11yProps(index)} disableRipple icon={<CloseIcon className={classes.deleteIcon} onClick={() => {handleDeleteTab(yarn)}}/>} />
                
              )
            })}
          </Tabs>
        </Box>
        {yarns.map((yarn: any, index: number) => {
          return (<TabPanel key={index} value={value} index={index}>
            <div>{yarn.yarn}</div>
            
            <label htmlFor="label">{"Tool size"}</label>
            <OutlinedInput
              id={`tool-${index}`}
              aria-describedby="tool-helper-text"
              inputProps={{
                'aria-label': 'tool',
              }}
              placeholder="Write tool size"
              size="small"
              className={'classes.formInput'}
              name='tool'
              inputRef={toolSizeRef}
              onChange={() => { handleData(yarn.yarn) }}
              defaultValue={yarn.info.toolSize}
              required
            />
            <label htmlFor="label">Gauge</label>
            <OutlinedInput
              id={`gauge-${index}`}
              aria-describedby="gauge-helper-text"
              inputProps={{
                'aria-label': 'gauge',
              }}
              placeholder="Write gauge"
              size="small"
              className={'classes.formInput'}
              name='gauge'
              onChange={() => { handleData(yarn.yarn) }}
              inputRef={gaugeRef}
              defaultValue={yarn.info.gauge}
              required
            />
            <FormHelperText>Gauge 10cm by 10cm</FormHelperText>
            <label htmlFor="stitch">Stitch</label>
            <OutlinedInput
              id={`stitch-${index}`}
              aria-describedby="stitch-helper-text"
              inputProps={{
                'aria-label': 'stitch',
              }}
              placeholder="Write stitch stitch"
              size="small"
              className={'classes.formInput'}
              name='stitch'
              onChange={() => { handleData(yarn.yarn) }}
              inputRef={stitchRef}
              defaultValue={yarn.info.stitch}
              required
            />
            <label htmlFor="amount">Amount</label>
            <OutlinedInput
              id={`amount-${index}`}
              aria-describedby="amount-helper-text"
              inputProps={{
                'aria-label': 'amount',
              }}
              placeholder="Write amount of yarn"
              size="small"
              className={'classes.formInput'}
              name='amount'
              onChange={() => { handleData(yarn.yarn) }}
              inputRef={amountRef}
              defaultValue={yarn.info.amount}
              required
            />
          </TabPanel>)
        })}

      </Box>
    </div>
  );
}

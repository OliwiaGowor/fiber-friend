import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import classes from './TabsPanelForm.module.scss';
import { setSyntheticLeadingComments } from 'typescript';


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

interface BasicTabsDisplayProps {
    yarns: any;
}

export default function BasicTabsDisplay(props: BasicTabsDisplayProps) {
  const [value, setValue] = React.useState(0);
  const { yarns, ...other } = props;
  const toolSizeRef = React.useRef<HTMLInputElement | null>(null);
  const gaugeRef = React.useRef<HTMLInputElement | null>(null);
  const stitchRef = React.useRef<HTMLInputElement | null>(null);
  const amountRef = React.useRef<HTMLInputElement | null>(null);
  const [yarnsInfo, setYarnsInfo] = React.useState<any>(yarns);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <label>Yarns</label>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeTabs} aria-label="basic tabs" variant='scrollable'>
            {yarns.map((yarn: any, index: number) => {
              return (<Tab key={index} label={yarn.yarn} {...a11yProps(index)} disableRipple />)
            })}
          </Tabs>
        </Box>
        {yarns.map((yarn: any, index: number) => {
          return (<TabPanel key={index} value={value} index={index}>
            <div>Tool size:{yarn.info.toolSize}</div>
            <div>Stitch: {yarn.info.stitch}</div>
            <div>Gauge (10cm x 10cm): {yarn.info.gauge}</div>
            <div>Amount: {yarn.info.amount}</div>
          </TabPanel>)
        })}

      </Box>
    </div>
  );
}

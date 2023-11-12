import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import classes from './TabsPanelDisplay.module.scss';
import FormHelperText from '@mui/material/FormHelperText';

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

export default function BasicTabsDisplay({ yarns }: BasicTabsDisplayProps) {
  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            aria-label="basic tabs"
            onChange={handleChangeTabs}
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
                  label={yarn.yarn}
                  {...a11yProps(index)}
                  disableRipple
                  iconPosition='end'
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
          return (<TabPanel key={yarn.id || index} value={value} index={index}>
            <div className={classes.yarnInfoContainer}>
              <div className={classes.attributeName}>Tool size: </div>
              {yarn.info.toolSize ? yarn.info.toolSize : <br />}

              <div className={classes.attributeName}>Stitch: </div>
              {yarn.info.stitch ? yarn.info.stitch : <br />}

              <div className={classes.attributeName}>
                Gauge
                <FormHelperText style={{ display: "inline" }}>
                  (10cm x 10cm)
                </FormHelperText>:
              </div>
              {yarn.info.gauge ? yarn.info.gauge : <br />}

              <div className={classes.attributeName}>Amount: </div>
              {yarn.info.amount ? yarn.info.amount : <br />}
            </div>
          </TabPanel>)
        })}
      </Box>
    </div>
  );
}

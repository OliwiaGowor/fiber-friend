import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import classes from './TabsPanelDisplay.module.scss';
import FormHelperText from '@mui/material/FormHelperText';
import { Yarn } from '../../DTOs/Yarn';
import { OtherSupply, Tool } from '../../DTOs/Pattern';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Supply = Yarn | Tool | OtherSupply;

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
  supplies: Supply[];
  type: "yarn" | "tool" | "other supply";
}

export default function BasicTabsDisplay({ supplies, type }: BasicTabsDisplayProps) {
  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleRenderInfo = (supply: Supply, index: number) => {
    switch (type) {
      case "yarn": {
        const yarnSupply = supply as Yarn;
        return (
          <div className={classes.infoContainer}>
            <div className={classes.attributeName}>Tool size: </div>
            {yarnSupply.toolSize ?? <br />}

            <div className={classes.attributeName}>Stitch: </div>
            {yarnSupply.stitch ?? <br />}

            <div className={classes.attributeName}>
              Gauge
              <FormHelperText style={{ display: "inline" }}>
                (10cm x 10cm)
              </FormHelperText>:
            </div>
            {yarnSupply.gauge ?? <br />}

            <div className={classes.attributeName}>Amount: </div>
            {yarnSupply.quantity ?? <br />}
          </div>
        )
      }
      case "tool": {
        const toolSupply = supply as Tool;
        return (
          <div className={classes.infoContainer}>
            <div className={classes.attributeName}>Tool size: </div>
            {toolSupply.size ?? <br />}

            <div className={classes.attributeName}>Quantity: </div>
            {toolSupply.quantity ?? <br />}
          </div>
        )
      }
      case "other supply": {
        const otherSupply = supply as OtherSupply;
        return (
          <div className={classes.infoContainer}>
            <div className={classes.attributeName}>Quantity: </div>
            {otherSupply.quantity ?? <br />}

            <div className={classes.attributeName}>Notes: </div>
            {otherSupply.note ?? <br />}
          </div>
        )
      }
    }
  }

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
            {supplies?.map((supply: any, index: number) => {
              return (
                <Tab key={index}
                  className={classes.tab}
                  label={supply.name}
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
        {supplies?.map((supply: Supply, index: number) => {
          return (<TabPanel key={supply.id || index} value={value} index={index}>
            {handleRenderInfo(supply, index)}
          </TabPanel>)
        })}
      </Box>
    </div>
  );
}

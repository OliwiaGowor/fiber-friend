import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Autocomplete, InputLabelProps, TextField, useMediaQuery } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { tokenLoader } from '../../utils/auth';
import classes from './TabsPanelForm.module.scss';
import { Yarn } from '../../DTOs/Yarn';
import { OtherSupply, Tool } from '../../DTOs/Pattern';
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from '../../utils/handleRequestHelper';
import { setError } from '../../reducers/errorSlice';

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
  type: "yarn" | "tool" | "other supply";
}

export default function BasicTabsForm({ getInfo, showError, defaultValue, type }: BasicTabsFormProps) {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);
  const toolSizeRef = React.useRef<HTMLInputElement | null>(null);
  const gaugeRef = React.useRef<HTMLInputElement | null>(null);
  const stitchRef = React.useRef<HTMLInputElement | null>(null);
  const quantityRef = React.useRef<HTMLInputElement | null>(null);
  const noteRef = React.useRef<HTMLInputElement | null>(null);
  const [supplies, setSupplies] = React.useState<Supply[]>(defaultValue ?? []);
  const [supplyName, setSupplyName] = React.useState<string | null>('');
  const [fetchedSupplies, setFetchedYarns] = React.useState<any>([]);

  const fetchAvailableSupplies = useCallback(async () => {
    try {
      const data = await handleRequest(
        `${process.env.REACT_APP_API_URL}Resource${process.env.REACT_APP_ENV === "dev" ? `/GetAll${type.charAt(0).toUpperCase() + type.slice(1)}ForUser` : ".json"}`,
        "GET",
        "Could not available supplies. Please try again later.",
        tokenLoader(),
      );

      const loadedSupplies = [];

      for (const key in data) {
        loadedSupplies.push({
          id: key,
          name: data[key].name,
        });
      }
      setFetchedYarns(loadedSupplies);

    } catch (error) {
      dispatch(setError(error));
      return;
    }
  }, []);

  useEffect(() => {
    fetchAvailableSupplies();
  }, []);

  const handleData = (resourceName: string) => {
    const tmpResourceInfo: Supply[] = supplies?.map((resource: Supply) => {
      if (resource.name === resourceName) {
        switch (type) {
          case "yarn": {
            return ({
              name: resource.name ?? "",
              toolSize: toolSizeRef.current?.value ?? "",
              gauge: gaugeRef.current?.value ?? "",
              stitch: stitchRef.current?.value ?? "",
              quantity: Number(quantityRef.current?.value) ?? "",
            });
          }
          case "tool": {
            return ({
              name: resource.name ?? "",
              size: toolSizeRef.current?.value ?? "",
              quantity: Number(quantityRef.current?.value) ?? "",
            });
          }
          case "other supply": {
            return ({
              name: resource.name ?? "",
              quantity: Number(quantityRef.current?.value) ?? "",
              note: noteRef.current?.value ?? "",
            });
          }
        }
      } else {
        return (resource);
      }
    });
    setSupplies(tmpResourceInfo);
    getInfo(supplies);
  }

  const handleAddTab = () => {
    if (supplyName === null || supplyName === '') {
      return;
    }

    switch (type) {
      case "yarn": {
        setSupplies([...supplies, {
          name: supplyName,
          toolSize: '',
          gauge: '',
          stitch: '',
          quantity: 1,
        }])
        break;
      }
      case "tool": {
        setSupplies([...supplies, {
          name: supplyName,
          size: '',
          quantity: 1,
        }])
        break;
      }
      case "other supply": {
        setSupplies([...supplies, {
          name: supplyName,
          quantity: 1,
          note: '',
        }])
        break;
      }
    }
    setSupplyName('');
    setValue(supplies.length);
  };

  const handleDeleteTab = (resource: Supply) => {
    const tmpArray = supplies?.filter((y) => y.id !== resource.id) || [];

    for (let i = 0; i < tmpArray.length; i++) {
      tmpArray[i].id = String(i);
    }
    setSupplies(tmpArray);
  };

  const handleRenderFields = (supply: Supply, index: number) => {
    switch (type) {
      case "yarn": {
        const yarnSupply = supply as Yarn;
        return (
          <div className={classes.inputs}>
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
              onChange={() => { handleData(yarnSupply.name) }}
              defaultValue={yarnSupply.toolSize}
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
              onChange={() => { handleData(yarnSupply.name) }}
              inputRef={gaugeRef}
              defaultValue={yarnSupply.gauge}
              required
            />
            {!isMobile && <br></br>}
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
              onChange={() => { handleData(yarnSupply.name) }}
              inputRef={stitchRef}
              defaultValue={yarnSupply.stitch}
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
              onChange={() => { handleData(yarnSupply.name) }}
              inputRef={quantityRef}
              defaultValue={yarnSupply.quantity}
              required
            />
          </div>
        )
      }
      case "tool": {
        const toolSupply = supply as Tool;
        return (
          <div className={classes.inputs}>
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
              onChange={() => { handleData(toolSupply.name) }}
              defaultValue={toolSupply.size}
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
              label="Quantity"
              name='amount'
              onChange={() => { handleData(toolSupply.name) }}
              inputRef={quantityRef}
              defaultValue={toolSupply.quantity}
              required
            />
          </div>
        )
      }
      case "other supply": {
        const otherSupply = supply as OtherSupply;
        return (
          <div className={classes.inputs}>
            <TextField
              className={classes.formInput}
              id={`other-supply-quantity-${index}`}
              type='number'
              aria-describedby="other-supply-quantity-helper-text"
              aria-label="Other supply quantity"
              inputProps={{
                'aria-labelledby': `other-supply-quantity-label-${index}`,
              }}
              label="Quantity"
              name='other-supply-quantity'
              onChange={() => { handleData(otherSupply.name) }}
              inputRef={quantityRef}
              defaultValue={otherSupply.quantity}
              required
            />
            <TextField
              id={`tool-${index}`}
              aria-label="Tool size"
              inputProps={{
                'aria-labelledby': `other-supply-quantity-label-${index}`,
              }}
              label="Notes"
              className={classes.formInput}
              name='tool'
              inputRef={noteRef}
              onChange={() => { handleData(otherSupply.name) }}
              defaultValue={otherSupply.note}
              multiline
              rows={2}
            />
          </div>
        )
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.addYarns}>
        {fetchedSupplies.length > 0 &&
          <Autocomplete
            id="yarn-input"
            freeSolo
            size="medium"
            className={classes.formInput}
            options={fetchedSupplies?.map((option: any) => option.name)}
            renderInput={(params) =>
              <TextField {...params}
                variant='outlined'
                label={`Add new ${type}`}
                InputLabelProps={{ children: '' } as Partial<InputLabelProps>}
              />}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => { setSupplyName(newValue) }}
            value={supplyName}
            autoSelect
          />}
        {fetchedSupplies.length === 0 &&
          <TextField
            id="yarn-input"
            inputProps={{
              'aria-label': 'yarn',
            }}
            label="Add new yarn"
            size="medium"
            className={classes.formInput}
            name='name'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSupplyName(event.target.value) }}
            value={supplyName}
            error={showError}
            helperText={showError ? 'You must add at least one yarn!' : ''}
          />}
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
            {supplies?.map((yarn: any, index: number) => {
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
        {supplies?.map((supply: any, index: number) => {
          return (<TabPanel key={index} value={value} index={index} >
            {handleRenderFields(supply, index)}
          </TabPanel>)
        })}
      </Box>
    </div>
  );
}

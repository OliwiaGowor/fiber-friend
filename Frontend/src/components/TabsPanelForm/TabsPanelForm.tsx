import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Autocomplete, InputLabelProps, TextField, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import { Yarn } from '../../DTOs/Yarn';
import { OtherSupply, Tool } from '../../DTOs/Pattern';
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from '../../utils/handleRequestHelper';
import { setError } from '../../reducers/errorSlice';
import { ResourceType } from '../../DTOs/Enums';
import { tokenLoader } from '../../utils/auth';
import classes from './TabsPanelForm.module.scss';

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
  const { t } = useTranslation("TabsPanelForm"); // Use the useTranslation hook
  const isMobile = useMediaQuery('(max-width: 800px)');
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const toolSizeRef = useRef<HTMLInputElement | null>(null);
  const gaugeRef = useRef<HTMLInputElement | null>(null);
  const stitchRef = useRef<HTMLInputElement | null>(null);
  const quantityRef = useRef<HTMLInputElement | null>(null);
  const noteRef = useRef<HTMLInputElement | null>(null);
  const [supplies, setSupplies] = useState<Supply[]>(defaultValue ?? []);
  const [supplyName, setSupplyName] = useState<string | null>('');
  const [fetchedYarns, setFetchedYarns] = useState<any>([]);
  const autocompleteOptions = useMemo(() => {
    return (fetchedYarns?.map((option: any) => {
      return ({ label: `${option.name}`, id: `${option.id}` })
    }))
  }, [fetchedYarns]);

  const fetchAvailableYarns = useCallback(async () => {
    try {
      const data = await handleRequest(
        `${process.env.REACT_APP_API_URL}Resource/GetResourcesForUser/${localStorage.getItem("userId")}`,
        "GET",
        t("couldNotFetchSupplies"),
        tokenLoader(),
      );

      const loadedSupplies = data?.find((resource: any) => resource.type === ResourceType.yarn)?.resources ?? [];

      setFetchedYarns(loadedSupplies);

    } catch (error) {
      dispatch(setError(error));
      return;
    }
  }, [t]);

  useEffect(() => {
    fetchAvailableYarns();
  }, [fetchAvailableYarns]);

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
    setSupplies(tmpArray.map((supply) => {
      return ({
        name: supply.name,
        quantity: supply.quantity,
        note: '',
      })
    }));
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
              label={t("toolSize")}
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
              label={t("gauge")}
              className={classes.formInput}
              name='gauge'
              onChange={() => { handleData(yarnSupply.name) }}
              inputRef={gaugeRef}
              defaultValue={yarnSupply.gauge}
              required
            />
            {!isMobile && <br></br>}
            <FormHelperText>{t("gaugeHelperText")}</FormHelperText>
            <TextField
              id={`stitch-${index}`}
              aria-describedby="stitch-helper-text"
              aria-label="Stitch"
              inputProps={{
                'aria-labelledby': `stitch-label-${index}`,
              }}
              label={t("stitch")}
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
              aria-label={t("amountOfSkeins")}
              inputProps={{
                'aria-labelledby': `amount-of-skeins-label-${index}`,
              }}
              label={t("amountOfSkeins")}
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
              label={t("toolSize")}
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
              aria-label={t("quantity")}
              inputProps={{
                'aria-labelledby': `amount-of-skeins-label-${index}`,
              }}
              label={t("quantity")}
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
              aria-label={t("quantity")}
              inputProps={{
                'aria-labelledby': `other-supply-quantity-label-${index}`,
              }}
              label={t("quantity")}
              name='other-supply-quantity'
              onChange={() => { handleData(otherSupply.name) }}
              inputRef={quantityRef}
              defaultValue={otherSupply.quantity}
              required
            />
            <TextField
              id={`tool-${index}`}
              aria-label={t("notes")}
              inputProps={{
                'aria-labelledby': `other-supply-quantity-label-${index}`,
              }}
              label={t("notes")}
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
        {fetchedYarns.length > 0 &&
          <Autocomplete
            id="yarn-input"
            freeSolo
            size="medium"
            className={classes.formInput}
            options={autocompleteOptions ?? undefined}
            renderInput={(params) =>
              <TextField {...params}
                variant='outlined'
                label={t(`addNew${type}`)}
                InputLabelProps={{ children: '' } as Partial<InputLabelProps>}
              />}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => { setSupplyName(newValue) }}
            value={supplyName}
            autoSelect
          />}
        {fetchedYarns.length === 0 &&
          <TextField
            id="yarn-input"
            inputProps={{
              'aria-label': 'yarn',
            }}
            label={t(`addNew${type.replace(" ", "")}`)}
            size="medium"
            className={classes.formInput}
            name='name'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSupplyName(event.target.value) }}
            value={supplyName}
            error={showError}
            helperText={showError ? t(`youMustAddAtLeastOne${type}`) : ''}
          />}
        <Button
          className={classes.addButton}
          onClick={handleAddTab}
          variant="contained">
          {t("add")}
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

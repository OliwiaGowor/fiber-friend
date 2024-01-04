import React, { Suspense, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PieChart } from '@mui/x-charts/PieChart';
import { Await } from 'react-router';
import { useTranslation } from 'react-i18next';
import { handleRequest } from '../../utils/handleRequestHelper';
import { tokenLoader } from '../../utils/auth';
import { useAppDispatch } from '../../utils/hooks';
import { setError } from '../../reducers/errorSlice';
import classes from './ProjectsStatistics.module.scss';

const tmpData = {
  totalProjects: 40,
  finishedProjects: 30,
  skeinsUsed: 100,
  mostUsedTool: '3mm',
  mostUsedStitch: 'single crochet',
  mostCommonCategory: 'top',
  typeOfProjects: [
    {
      id: 0,
      value: 50,
      label: 'crochet',
    },
    {
      id: 1,
      value: 50,
      label: 'knit',
    },
  ],
};

interface ProjectsStatisticsDto {
  timePeriodStart: string;
  timePeriodEnd: string;
}

const ProjectsStatistics = ({ timePeriodStart, timePeriodEnd }: ProjectsStatisticsDto) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any | null>(tmpData);
  const { t } = useTranslation("ProjectStatistics");

  const fetchStatistics = async () => {
    try {
      const response = await handleRequest(
        `${process.env.REACT_APP_API_URL}Statistics/ProjectStatistics/${localStorage.getItem(
          'userId'
        )}/${timePeriodStart}/${timePeriodEnd}`,
        'GET',
        t('couldNotFetchStatistics'),
        tokenLoader()
      );
      setData(response);
    } catch (error) {
      dispatch(setError(error));
      return;
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [timePeriodStart, timePeriodEnd]);

  return (
    <div className={classes.container}>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={null}>
          <div className={classes.dataTile}>
            <p className={classes.dataTileHeader}>{t('numberOfAddedProjects')}</p>
            <p className={classes.dataTileData}>{data?.activeProjects}</p>
          </div>
          <div className={classes.dataTile}>
            <p className={classes.dataTileHeader}>{t('numberOfFinishedProjects')}</p>
            <p className={classes.dataTileData}>{data?.finishedProjects}</p>
          </div>
          <div className={classes.dataTile}>
            <p className={classes.dataTileHeader}>{t('skeinsUsed')}</p>
            <p className={classes.dataTileData}>{data?.skeinsUsed}</p>
          </div>
          <div className={classes.dataTile}>
            <p className={classes.dataTileHeader}>{t('mostFrequentlyUsedToolSize')}</p>
            <p className={classes.dataTileData}>{data?.mostFreqToolSize}</p>
          </div>
          <div className={classes.dataTile}>
            <p className={classes.dataTileHeader}>{t('mostlyUsedStitch')}</p>
            <p className={classes.dataTileData}>{data?.mostFreqStitch}</p>
          </div>
          <div className={classes.dataTile}>
            <p className={classes.dataTileHeader}>{t('mostCommonCategory')}</p>
            <p className={classes.dataTileData}>{data?.mostFreqCategory}</p>
          </div>
          <div className={`${classes.dataTile} ${classes.chart}`}>
            <p className={classes.dataTileHeader}>{t('typeOfProjects')}</p>
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: data.crochetProjects,
                      label: 'crochet',
                    },
                    {
                      id: 1,
                      value: data.knitingProjects,
                      label: 'knit',
                    },
                    {
                      id: 2,
                      value: data.otherProjects,
                      label: 'other',
                    },
                  ] ?? [],
                },
              ]}
              width={400}
              height={200}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'middle' },
                  padding: 0,
                },
              }}
              margin={{ bottom: 60 }}
            />
          </div>
        </Await>
      </Suspense>
    </div>
  );
};

export default ProjectsStatistics;

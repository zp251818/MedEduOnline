import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { barProps } from '@/type/statistic';
import { BACK } from '@/static/const';

echarts.use([GridComponent, BarChart, CanvasRenderer, UniversalTransition]);


const BarChartComponent: React.FC<barProps> = ({ xAxisData, seriesData, drilldownData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const initialOption = {
        xAxis: {
          data: xAxisData,
          axisLabel: {
            rotate: 45, // 旋转角度，可以根据需要调整
            interval: 0 // 强制显示所有标签
          }
        },
        yAxis: {},
        dataGroupId: '',
        animationDurationUpdate: 500,
        series: {
          type: 'bar',
          id: 'sales',
          data: seriesData,
          universalTransition: {
            enabled: true,
            divideShape: 'clone'
          },
          label: {
            show: true, 
            position: 'top' 
          }
        }
      };

      const handleChartClick = (event: any) => {
        if (event.data) {
          const subData = drilldownData.find(data => data.dataGroupId === event.data.groupId);
          if (!subData) return;

          myChart.setOption({
            xAxis: {
              data: subData.data.map(item => item[0]),
              axisLabel: {
                rotate: 45, // 旋转角度，可以根据需要调整
                interval: 0 // 强制显示所有标签
              }
            },
            series: {
              type: 'bar',
              id: 'sales',
              dataGroupId: subData.dataGroupId,
              data: subData.data.map(item => item[1]),
              universalTransition: {
                enabled: true,
                divideShape: 'clone'
              },
              label: {
                show: true, 
                position: 'top' 
              }
            },
            graphic: [
              {
                type: 'text',
                left: 50,
                top: 20,
                style: {
                  text: BACK,
                  fontSize: 18
                },
                onclick: () => {
                  myChart.setOption(initialOption);
                }
              }
            ]
          });
        }
      };

      myChart.on('click', handleChartClick);
      myChart.setOption(initialOption);

      // 自适应宽度
      const resizeHandler = () => {
        if (myChart) {
          myChart.resize();
        }
      };
      window.addEventListener('resize', resizeHandler);
      return () => {
        window.removeEventListener('resize', resizeHandler);
        myChart.dispose();
      };
    }
  }, [xAxisData, seriesData, drilldownData]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default BarChartComponent;
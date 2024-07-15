import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

// Register echarts components
echarts.use([GridComponent, BarChart, CanvasRenderer]);

interface Props {
  xAxisData: string[];
  seriesData: number[];
}

const SimpleBarComponent: React.FC<Props> = ({ xAxisData, seriesData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
        const myChart = echarts.init(chartRef.current);

      const option = {
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            rotate: 45, // 旋转角度，可以根据需要调整
            interval: 0 // 强制显示所有标签
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            label: {
                show: true, 
                position: 'top' 
              }
          }
        ]
      };

      myChart.setOption(option);
      //自适应宽度
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

  }, [xAxisData, seriesData]);

  return <div id="main" style={{ width: '100%', height: '100%' }} ref={chartRef}></div>;
};

export default SimpleBarComponent;
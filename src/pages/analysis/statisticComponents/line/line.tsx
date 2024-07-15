import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface ChartProps {
  xAxisData: string[]; 
  seriesData: number[]; 
  title: string; 
}

const LineComponent: React.FC<ChartProps> = ({ xAxisData, seriesData, title }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
    const myChart = echarts.init(chartRef.current);
      const option= {
        title: {
          text: title,
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: seriesData,
            type: 'line',
            label: {
              show: true,
              formatter: '{c}'
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
  }, [xAxisData, seriesData, title]);

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
};

export default LineComponent;
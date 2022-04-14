import React from 'react';
import { isMobile } from 'react-device-detect';
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
  // LineChart,
  BarChart,
  PieChart,
  // PieChart,
  // ScatterChart,
  // RadarChart,
  // MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from 'echarts/charts';
// import components, all suffixed with Component
import {
  GridComponent,
 
  TooltipComponent,

  TitleComponent,

  LegendComponent,
 
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
} from 'echarts/renderers';

echarts.use(
  [ LegendComponent, CanvasRenderer, PieChart, TooltipComponent, ]
);
const radius = isMobile ? ['40%', '70%'] : ['50%', '90%']
const option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      show: false,
    },
    legend: {
      show: false
    },
    series: [
      {
        name: 'TOKENOMICS',
        type: 'pie',
        radius: radius,
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#4DD8C4'
            },
            {
              offset: 1,
              color: '#57B6F1'
            }
          ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#F18263'
            },
            {
              offset: 1,
              color: '#EFD8A2'
            }
          ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#9262E7'
            },
            {
              offset: 1,
              color: '#CC6DEE'
            }
          ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#E96695'
            },
            {
              offset: 1,
              color: '#F57DAF'
            }
          ])
        
        ],
        data: [
          { value: 20, name: 'Airdrop' },
          { value: 35, name: 'Pre sale' },
          { value: 40, name: 'List' },
          { value: 5, name: 'Team developer' },
        ],
        label: {
          fontSize: 18, 
          fontFamily: 'Karla-Medium',
          color: '#4AA3FF',
          formatter: '{b}\n{c}%'
        },
        labelLine: {
          lineStyle: {
            width: 2,
          },
          length2: isMobile ? 30 : '20%',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
const Chart = () => {
    return (
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            lazyUpdate={true}
            theme={"theme_name"}
        />
    )
}
export default Chart;

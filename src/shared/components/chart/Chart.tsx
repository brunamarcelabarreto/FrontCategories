import { Chart } from 'react-google-charts';

interface DonutChartProps {
  chartType: any;
  data: any;
  options: any;
  chartArea: any;
  width: any;
  height: any;
  backgroundColor: any;
}

export const DonutChart = ({chartType, data, options, width, height}: DonutChartProps) => (
  <Chart
    chartType={chartType}
    data={data}
    options={options}
    legendToggle
    width={width}
    height={height}
  />
);
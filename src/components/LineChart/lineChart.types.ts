export interface LineChartProps {
  title: string;
  chartValues: null | Array<{
    Data: string;
    'Lucro/Prejuizo do Periodo': number;
  }>;
}

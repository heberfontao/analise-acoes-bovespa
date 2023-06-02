export interface LineChartMultiProps {
  title: string;
  chartValues: null | Array<{
    'Adj Close': string | number | bigint | any;
    Data: string;
    IBOV: string | number | bigint | any;
  }>;
}

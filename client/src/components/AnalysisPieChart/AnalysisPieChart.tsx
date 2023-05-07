import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

const LINE_WIDTH_PIE_CHART = 60;

interface AnalysisPieChartProps {
  data: any;
  totalValue: number;
}

export default function AnalysisPieChart({ data, totalValue }: AnalysisPieChartProps) {
  const [ selected, setSelected] = useState<number | undefined>(0);
  const [ hovered, setHovered ] = useState<number | undefined>(undefined);

  const displayData = data.map((entry: any, i: number) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      };
    }
    return entry;
  });
  
  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '8px',
      }}
      data={displayData}
      radius={44}
      lineWidth={LINE_WIDTH_PIE_CHART}
      totalValue={totalValue}
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
      animate
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      labelStyle={{
        fill: '#fff',
        opacity: 0.75,
        pointerEvents: 'none',
      }}
      labelPosition={100 - LINE_WIDTH_PIE_CHART / 2}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
};



  export interface DataPoint {
    day: string;
    value: number;
    tasks?: number;
  }  
  export const chartData: DataPoint[] = [
    { day: "S", value: 1 },
    { day: "M", value: 2, tasks: 2 },
    { day: "T", value: 1 },
    { day: "W", value: 1 },
    { day: "T", value: 2 },
    { day: "F", value: 1.8 },
    { day: "S", value: 1.7 },
  ];
  
  export const timeRanges = ["This Week", "This Month", "This Year"];
  
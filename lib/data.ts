export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  pollutionLevel: number;
  description: string;
  timeSeries: { date: string; pm25: number }[];
  pollutantBreakdown: { name: string; value: number }[];
}

export const stations: Station[] = [
  {
    id: "1",
    name: "Київ ",
    lat: 50.4501,
    lng: 30.5234,
    pollutionLevel: 65,
    description: "PM2.5: 28 µg/m³",
    timeSeries: [
      { date: "18.03", pm25: 22 }, { date: "19.03", pm25: 35 },
      { date: "20.03", pm25: 41 }, { date: "21.03", pm25: 28 },
      { date: "22.03", pm25: 55 }, { date: "23.03", pm25: 48 },
      { date: "24.03", pm25: 32 },
    ],
    pollutantBreakdown: [
      { name: "PM2.5", value: 45 }, { name: "NO2", value: 30 },
      { name: "SO2", value: 15 }, { name: "O3", value: 10 },
    ],
  },
  {
    id: "2",
    name: "Львів ",
    lat: 49.8397,
    lng: 24.0297,
    pollutionLevel: 35,
    description: "PM2.5: 12 µg/m³",
    timeSeries: [
      { date: "18.03", pm25: 15 }, { date: "19.03", pm25: 18 },
      { date: "20.03", pm25: 22 }, { date: "21.03", pm25: 14 },
      { date: "22.03", pm25: 19 }, { date: "23.03", pm25: 25 },
      { date: "24.03", pm25: 17 },
    ],
    pollutantBreakdown: [
      { name: "PM2.5", value: 25 }, { name: "NO2", value: 40 },
      { name: "SO2", value: 20 }, { name: "O3", value: 15 },
    ],
  },
  {
    id: "3",
    name: "Одеса ",
    lat: 46.4825,
    lng: 30.7233,
    pollutionLevel: 85,
    description: "PM2.5: 42 µg/m³",
    timeSeries: [
      { date: "18.03", pm25: 38 }, { date: "19.03", pm25: 45 },
      { date: "20.03", pm25: 51 }, { date: "21.03", pm25: 39 },
      { date: "22.03", pm25: 47 }, { date: "23.03", pm25: 55 },
      { date: "24.03", pm25: 42 },
    ],
    pollutantBreakdown: [
      { name: "PM2.5", value: 60 }, { name: "NO2", value: 25 },
      { name: "SO2", value: 10 }, { name: "O3", value: 5 },
    ],
  },
  {
    id: "4",
    name: "Харків ",
    lat: 49.9935,
    lng: 36.2304,
    pollutionLevel: 52,
    description: "PM2.5: 19 µg/m³",
    timeSeries: [
      { date: "18.03", pm25: 25 }, { date: "19.03", pm25: 31 },
      { date: "20.03", pm25: 28 }, { date: "21.03", pm25: 22 },
      { date: "22.03", pm25: 35 }, { date: "23.03", pm25: 29 },
      { date: "24.03", pm25: 26 },
    ],
    pollutantBreakdown: [
      { name: "PM2.5", value: 35 }, { name: "NO2", value: 35 },
      { name: "SO2", value: 20 }, { name: "O3", value: 10 },
    ],
  },
];
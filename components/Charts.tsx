'use client';

import { useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { trackEvent } from '@/lib/analytics';
import { stations } from '@/lib/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

type Props = {
  selectedStationId: string | null;
};

export default function Charts({ selectedStationId }: Props) {
  const selectedStation =
    stations.find(s => s.id === selectedStationId) || null;

  useEffect(() => {
    if (selectedStation) {
      trackEvent('chart_viewed', {
        stationId: selectedStation.id,
        stationName: selectedStation.name,
        pollutionLevel: selectedStation.pollutionLevel,
      });
    }
  }, [selectedStation]);

  if (!selectedStation) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        📊 Оберіть станцію на карті
      </div>
    );
  }

  const data = Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * 50 + selectedStation.pollutionLevel / 2)
  );

  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  return (
    <div className="space-y-8">

      <h2 className="text-3xl font-bold">
        {selectedStation.name}
      </h2>

      <div className="h-80">
        <Line
          data={{
            labels,
            datasets: [
              {
                label: 'PM2.5',
                data,
                borderColor: '#2563eb',
              },
            ],
          }}
        />
      </div>

      <div className="h-80">
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: 'Забруднення',
                data,
                backgroundColor: '#f59e0b',
              },
            ],
          }}
        />
      </div>

      <div className="h-80">
        <Pie
          data={{
            labels: ['PM2.5', 'NO₂', 'SO₂'],
            datasets: [
              {
                data: [50, 30, 20],
                backgroundColor: ['#ef4444', '#f59e0b', '#22c55e'],
              },
            ],
          }}
        />
      </div>

    </div>
  );
}
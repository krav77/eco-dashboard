'use client';

import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  selectedStation: any;
  stations: any[];
}

export default function Charts({ selectedStation, stations }: ChartsProps) {
  if (!selectedStation) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 p-10 text-center">
        <div className="text-7xl mb-6 opacity-40">📊</div>
        <h3 className="text-2xl font-semibold text-gray-400">Станція не обрана</h3>
        <p className="text-gray-500 mt-3">Клікніть на маркер на карті</p>
      </div>
    );
  }

  const timeSeriesData = Array.from({ length: 7 }, (_, i) => 
    Math.max(20, Math.min(95, selectedStation.pollutionLevel + Math.round(Math.sin(i) * 20 + (Math.random() * 15 - 7))))
  );

  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  const lineData = {
    labels,
    datasets: [
      {
        label: 'PM2.5',
        data: timeSeriesData,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        tension: 0.4,
        fill: true,
        borderWidth: 4,
      },
      {
        label: 'NO₂',
        data: timeSeriesData.map(v => Math.round(v * 0.75)),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const barData = {
    labels: stations.map(s => s.name.length > 15 ? s.name.slice(0,15)+'...' : s.name),
    datasets: [{
      label: 'Рівень забруднення',
      data: stations.map(s => s.pollutionLevel),
      backgroundColor: stations.map(s => 
        s.id === selectedStation.id ? '#1e40af' : 
        s.pollutionLevel > 70 ? '#ef4444' : s.pollutionLevel > 40 ? '#f59e0b' : '#22c55e'
      ),
      borderRadius: 6,
    }],
  };

  const pieData = {
    labels: ['PM2.5', 'NO₂', 'SO₂', 'O₃', 'CO'],
    datasets: [{
      data: [48, 22, 12, 10, 8],
      backgroundColor: ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#22c55e'],
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 15,
          font: { size: 13 },
          usePointStyle: true,
        },
        onClick: (e: any, legendItem: any, legend: any) => {
          const index = legendItem.datasetIndex ?? 0;
          const ci = legend.chart;
          if (ci.data.datasets[index]) {
            ci.data.datasets[index].hidden = !ci.data.datasets[index].hidden;
            ci.update();
          }
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  } as const;

  return (
    <div className="space-y-8 overflow-auto">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{selectedStation.name}</h2>
        <p className="text-5xl font-semibold text-blue-600 mt-2">
          {selectedStation.pollutionLevel} 
          <span className="text-2xl text-gray-500 ml-2">мкг/м³</span>
        </p>
      </div>

      {/* Лінійний графік */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Динаміка рівня забруднення за тиждень</h3>
        <div className="h-80">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>

      {/* Стовпчикова діаграма */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Порівняння всіх станцій</h3>
        <div className="h-80">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>

      {/* Кругова діаграма */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Структура забруднювачів повітря</h3>
        <div className="h-80 flex items-center justify-center">
          <div className="w-80">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { trackEvent } from '@/lib/analytics';

const InteractiveMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const Charts = dynamic(() => import('@/components/Charts'), {
  ssr: false,
  loading: () => <div className="p-8">Завантаження графіків...</div>,
});

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleStationSelect = (
    id: string | null,
    meta?: { name?: string; pollutionLevel?: number }
  ) => {
    setSelectedId(id);

    if (id && meta) {
      trackEvent('station_viewed', {
        stationId: id,
        stationName: meta.name?.trim(),
        pollutionLevel: meta.pollutionLevel,
      });
    } else {
      trackEvent('station_viewed', { action: 'reset_selection' });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50">

      <header className="bg-white border-b px-8 py-5 flex items-center justify-between shadow-sm z-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Еко-дашборд України
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Інтерактивний моніторинг рівня забруднення повітря
          </p>
        </div>

        {selectedId && (
          <button
            onClick={() => handleStationSelect(null)}
            className="px-6 py-2.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            ✕ Скинути вибір
          </button>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-[3] border-r border-gray-200 h-full min-h-[500px]">
          <InteractiveMap
            selectedId={selectedId}
            onStationSelect={handleStationSelect}
          />
        </div>

        <div className="flex-[2] bg-white overflow-auto p-8">
          <Charts selectedStationId={selectedId} />
        </div>
      </div>
    </div>
  );
}
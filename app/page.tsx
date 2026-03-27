'use client';

import { useState } from 'react';
import InteractiveMap from '@/components/Map';
import Charts from '@/components/Charts';
import { stations } from '@/lib/data';

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedStation = stations.find(s => s.id === selectedId) || null;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50">

      <header className="bg-white border-b px-8 py-5 flex items-center justify-between shadow-sm z-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Еко-дашборд України</h1>
          <p className="text-sm text-gray-500 mt-1">Інтерактивний моніторинг рівня забруднення повітря</p>
        </div>

        {selectedId && (
          <button
            onClick={() => setSelectedId(null)}
            className="px-6 py-2.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full transition-colors flex items-center gap-2"
          >
            ✕ Скинути вибір
          </button>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-[3] relative border-r border-gray-200">
          <InteractiveMap 
            selectedId={selectedId} 
            onStationSelect={setSelectedId} 
          />
        </div>

        <div className="flex-[2] bg-white overflow-auto p-8">
          <Charts 
            selectedStation={selectedStation} 
            stations={stations} 
          />
        </div>
      </div>
    </div>
  );
}
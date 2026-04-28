'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { stations } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function InteractiveMap({ 
  selectedId, 
  onStationSelect 
}: { 
  selectedId: string | null; 
  onStationSelect: (id: string | null) => void;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 text-xl text-gray-500">
        Завантаження інтерактивної карти...
      </div>
    );
  }

  const L = require('leaflet');

  const createCustomIcon = (level: number, isSelected: boolean = false) => {
    const color = level > 70 ? '#ef4444' : level > 40 ? '#f59e0b' : '#22c55e';
    const size = isSelected ? 46 : 34;
    const fontSize = isSelected ? 19 : 16;
    const borderWidth = isSelected ? 6 : 3.5;

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: ${borderWidth}px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: ${isSelected ? '0 8px 20px rgba(0,0,0,0.6)' : '0 4px 12px rgba(0,0,0,0.4)'};
          font-size: ${fontSize}px;
          font-weight: 700;
          color: white;
          transition: all 0.25s ease;
        ">
          ${level}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  return (
    <MapContainer
      center={[48.8, 31.5]}
      zoom={6.2}
      minZoom={5}
      maxZoom={12}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />
      {stations.map((station) => {
        const isSelected = station.id === selectedId;

        return (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={createCustomIcon(station.pollutionLevel, isSelected)}
            eventHandlers={{
              click: () => {
                onStationSelect(station.id);

                trackEvent('map_marker_click', {
                  stationId: station.id,
                  stationName: station.name.trim(),
                  pollutionLevel: station.pollutionLevel,
                  city: station.name.trim()
                });
              },
            }}
          >
            <Popup>
              <strong>{station.name}</strong><br />
              Рівень забруднення: <strong>{station.pollutionLevel} мкг/м³</strong><br />
              <small>{station.description || 'Моніторингова станція'}</small>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { stations } from '@/lib/data';
import L from 'leaflet';

type Props = {
  selectedId: string | null;
  onStationSelect: (id: string | null) => void;
};

const MapContainer = dynamic(
  () => import('react-leaflet').then(m => m.MapContainer),
  { ssr: false, loading: () => <div>Завантаження карти...</div> }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then(m => m.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then(m => m.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then(m => m.Popup),
  { ssr: false }
);
export default function InteractiveMap({ selectedId, onStationSelect }: Props) {

  const createCustomIcon = (level: number, isSelected: boolean = false) => {
    const color = level > 70 ? '#ef4444' : level > 40 ? '#f59e0b' : '#22c55e';
    const size = isSelected ? 46 : 34;

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-weight:700;
        ">
          ${level}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  return (
    <MapContainer center={[48.8, 31.5]} zoom={6.2} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          icon={createCustomIcon(station.pollutionLevel, station.id === selectedId)}
          eventHandlers={{
            click: () => onStationSelect(station.id),
          }}
        >
          <Popup>
            <strong>{station.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
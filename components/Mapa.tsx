'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para os ícones do Leaflet no Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type Pista = {
  id: number;
  ordem: number;
  titulo: string;
  descricao: string;
  latitude?: number;
  longitude?: number;
};

interface MapaProps {
  pistas: Pista[];
  pistasEncontradas: number[];
}

export default function Mapa({ pistas, pistasEncontradas }: MapaProps) {
  useEffect(() => {
    // Limpar mapa anterior se existir
    const container = L.DomUtil.get('map');
    if (container != null) {
      (container as any)._leaflet_id = null;
    }

    // Centro no ponto médio das pistas
    const map = L.map('map').setView([-16.7355, -49.2135], 15);

    // Adicionar camada de tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Criar ícones customizados
    const createCustomIcon = (numero: number, encontrada: boolean) => {
      const color = encontrada ? '#10b981' : '#4f46e5'; // Verde se encontrada, azul senão
      const bgColor = encontrada ? '#d1fae5' : '#e0e7ff';
      
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 36px;
            height: 36px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-weight: bold;
              font-size: 16px;
            ">${numero}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      });
    };

    // Adicionar marcadores para cada pista
    pistas.forEach((pista) => {
      if (pista.latitude && pista.longitude) {
        const encontrada = pistasEncontradas.includes(pista.id);
        const icon = createCustomIcon(pista.ordem, encontrada);
        
        const marker = L.marker([pista.latitude, pista.longitude], { icon })
          .addTo(map);

        const status = encontrada 
          ? '<span style="color: #10b981; font-weight: bold;">✓ Encontrada!</span>' 
          : '<span style="color: #6b7280;">Ainda não encontrada</span>';

        marker.bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">
              ${pista.ordem}. ${pista.titulo}
            </h3>
            <p style="margin: 0; font-size: 14px;">
              ${status}
            </p>
          </div>
        `);
      }
    });

    // Cleanup
    return () => {
      map.remove();
    };
  }, [pistas, pistasEncontradas]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-indigo-600">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          🗺️ Mapa dos Locais
        </h2>
        <p className="text-indigo-100 text-sm mt-1">
          Os números indicam a localização de cada pista
        </p>
      </div>
      <div 
        id="map" 
        style={{ height: '400px', width: '100%' }}
        className="z-0"
      />
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
            <span className="text-gray-700">Não encontrada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Encontrada</span>
          </div>
        </div>
      </div>
    </div>
  );
}

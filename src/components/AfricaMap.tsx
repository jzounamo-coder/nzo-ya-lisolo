/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography 
} from 'react-simple-maps';

// URL STABLE : Données des pays du monde (on filtrera pour l'Afrique)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface AfricaMapProps {
  onSelectCountry: (countryName: string) => void;
}

export default function AfricaMap({ onSelectCountry }: AfricaMapProps) {
  return (
    <div className="bg-[#e0f2f1] border-3 border-brand-ink p-8 shadow-[12px_12px_0px_#1A1A1A] overflow-hidden relative min-h-[500px] flex flex-col">
      {/* Correction : On force le titre au-dessus avec z-10 et relative */}
      <div className="relative z-10 mb-4">
        <h3 className="text-3xl font-serif font-black text-brand-earth tracking-tighter italic">Carte de la Sagesse</h3>
        <p className="text-brand-ink/70 text-xs font-bold uppercase tracking-widest mt-1">Explorez le continent ancestral.</p>
      </div>

      {/* Ajustement : La carte est maintenant dans un conteneur qui respecte l'espace du titre */}
      <div className="w-full flex-1 flex items-center justify-center -mt-12">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 250,
            center: [17, 0] // Centrage optimisé sur l'Afrique
          }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      const name = geo.properties.name;
                      onSelectCountry(name);
                    }}
                    style={{
                      default: {
                        fill: "#F5F5F0",
                        stroke: "#1A1A1A",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "#E2A745",
                        stroke: "#1A1A1A",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: "#B2513B",
                        outline: "none",
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <div className="absolute bottom-6 right-6 border-2 border-brand-ink bg-white p-4 shadow-[4px_4px_0px_#1A1A1A] z-10">
        <p className="text-[10px] font-black text-brand-ink uppercase tracking-widest">Cliquez sur un pays</p>
      </div>
    </div>
  );
}
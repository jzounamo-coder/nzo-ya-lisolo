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

// URL STABLE : Données des pays du monde avec propriétés de continents
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

// Mapping pour s'assurer que les noms correspondent à ta base Supabase
const countryNameMapping: Record<string, string> = {
  "Democratic Republic of the Congo": "RDC",
  "Republic of the Congo": "Congo",
  "South Africa": "Afrique du Sud",
  "Ivory Coast": "Côte d'Ivoire",
  "Morocco": "Maroc",
  "Egypt": "Égypte",
  "Senegal": "Sénégal",
  "Algeria": "Algérie",
  "Nigeria": "Nigeria",
  "Niger": "Niger",
  "Mali": "Mali",
  "Cameroon": "Cameroun",
  "Gabon": "Gabon",
  "Togo": "Togo",
  "Benin": "Bénin",
  "Burkina Faso": "Burkina Faso",
  "Guinea": "Guinée",
  "Chad": "Tchad"
};

interface AfricaMapProps {
  onSelectCountry: (countryName: string) => void;
}

export default function AfricaMap({ onSelectCountry }: AfricaMapProps) {
  return (
    <div className="bg-[#e0f2f1] border-3 border-brand-ink p-8 shadow-[12px_12px_0px_#1A1A1A] overflow-hidden relative min-h-[500px] flex flex-col">
      <div className="relative z-10 mb-4">
        <h3 className="text-3xl font-serif font-black text-brand-earth tracking-tighter italic">Carte de la Sagesse</h3>
        <p className="text-brand-ink/70 text-xs font-bold uppercase tracking-widest mt-1">Explorez le continent ancestral.</p>
      </div>

      <div className="w-full flex-1 flex items-center justify-center -mt-12">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 380,
            center: [17, 2] 
          }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter(geo => geo.properties.continent === "Africa") // On ne garde que l'Afrique
                .map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      const rawName = geo.properties.name;
                      const finalName = countryNameMapping[rawName] || rawName;
                      onSelectCountry(finalName);
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
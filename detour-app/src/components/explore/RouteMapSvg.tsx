'use client';

import { motion } from 'motion/react';
import { ScenicDrive } from '@/types';

interface RouteMapSvgProps {
  drive: ScenicDrive;
}

export default function RouteMapSvg({ drive }: RouteMapSvgProps) {
  if (drive.id !== 'gorge') {
    // Schematic timeline for Coast and Mount Hood
    return (
      <div className="w-full bg-[#eae6ca] border border-[#a9aa9c] p-8 flex flex-col justify-center min-h-[380px]">
        <div className="border-b border-[#a9aa9c] pb-3 mb-6 flex items-center justify-between">
          <span className="font-['Anton',sans-serif] text-xl tracking-wider text-[#18274b]">
            SUGGESTED STOP SEQUENCE
          </span>
          <span className="text-xs uppercase font-bold text-[#47516a] bg-[#faf2db] px-2 py-0.5 border border-[#a9aa9c]">
            {drive.name}
          </span>
        </div>
        <ol className="flex flex-col gap-5">
          {drive.stops.map(([name, desc], idx) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.12 }}
              className="flex items-start gap-4"
            >
              <span className="w-8 h-8 rounded-none border-2 border-[#18274b] bg-[#fce466] text-[#18274b] font-bold text-sm flex items-center justify-center shrink-0">
                {idx === 0 ? '●' : idx}
              </span>
              <div>
                <strong className="text-base text-[#18274b] block font-bold">{name}</strong>
                <p className="text-xs text-[#47516a] mt-0.5">{desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    );
  }

  // Authentic Animated Columbia River Gorge Map
  return (
    <div className="w-full bg-[#eae6ca] border border-[#a9aa9c] overflow-hidden relative">
      <svg
        viewBox="0 0 900 440"
        role="img"
        aria-label="Schematic of the Columbia River Gorge route from Portland through Vista House and Multnomah Falls to Hood River"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
      >
        <defs>
          <path
            id="columbia"
            d="M-50 173C24 177 49 196 103 214C166 235 221 246 289 232C376 215 421 226 482 204C550 179 563 168 630 164C713 159 766 132 805 102C839 77 870 72 950 70"
          />
        </defs>

        <path fill="#eae6ca" d="M0 0h900v440H0z" />
        <path
          fill="#e7e8d2"
          d="M0 0h900v80c-97-11-110 46-230 70-77 16-145 50-206 66-93 24-152 27-222 27S91 218 0 178Z"
        />

        {/* Topographic Contour Lines */}
        <g fill="none" stroke="#bfc7ac" strokeWidth="1.3" opacity=".76">
          <path d="M-40 101C58 86 84 161 174 153s91-62 186-53 105-3 157-36c48-31 100-32 163-13s125-11 156-36" />
          <path d="M-40 84c101-18 139 63 217 53 90-11 93-63 178-52 63 8 112-6 153-34C552 22 602 16 683 36c63 15 106-14 134-30" />
          <path d="M-25 66C83 52 110 137 181 120s86-58 169-50 110-17 150-41C559-6 614 9 671 20c46 9 92-9 121-29" />
          <path d="M-13 49c92-5 127 72 194 54 64-17 94-60 168-48S453 40 491 14c56-38 111-27 183-12" />
          <path d="M-18 32c90-7 142 69 192 57s99-64 174-49 107-18 139-39" />
        </g>

        <g fill="none" stroke="#c8c2a5" strokeWidth="1.3" opacity=".9">
          <path d="M-12 387c82-29 156-40 224-17 97 32 146 36 217 3 76-37 79-70 166-55 73 13 115 48 172 27 74-28 74-75 150-87" />
          <path d="M-14 406c79-30 155-43 221-21 103 35 155 39 232 2 76-37 73-68 156-55 62 10 114 48 173 26 67-26 83-69 146-81" />
          <path d="M-12 425c73-32 160-45 222-25 104 34 162 39 238 2 67-33 73-68 149-55 63 10 113 50 176 25 71-29 76-66 149-82" />
        </g>

        {/* Columbia River */}
        <use href="#columbia" fill="none" stroke="#97b7bb" strokeWidth="53" />
        <use href="#columbia" fill="none" stroke="#a8c7c9" strokeWidth="44" />

        <g
          fontFamily="HK, sans-serif"
          fontWeight="700"
          fontSize="12"
          letterSpacing="3.6"
          fill="#5a6e67"
        >
          <text x="291" y="157">
            WASHINGTON
          </text>
          <text x="397" y="366">
            OREGON
          </text>
        </g>

        <text
          fill="#284e59"
          fontFamily="HK, sans-serif"
          fontSize="14"
          fontWeight="700"
          letterSpacing="2.5"
        >
          <textPath href="#columbia" startOffset="25%">
            COLUMBIA RIVER
          </textPath>
        </text>

        {/* Base Road Shadow */}
        <path
          d="M117 342c25-11 38-24 59-29 26-6 33-5 62-8 36-4 58-24 86-26 22-2 36-2 55-5 47-7 70 2 105-16 16-9 39-15 61-17 23-3 41-16 74-15 23 0 44-12 62-16 24-5 44-7 58-19"
          fill="none"
          stroke="#203a78"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Animated Highway Path */}
        <motion.path
          d="M117 342c25-11 38-24 59-29 26-6 33-5 62-8 36-4 58-24 86-26 22-2 36-2 55-5 47-7 70 2 105-16 16-9 39-15 61-17 23-3 41-16 74-15 23 0 44-12 62-16 24-5 44-7 58-19"
          fill="none"
          stroke="#fce466"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />

        {/* Stop Labels */}
        <g
          fontFamily="HK, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill="#18274b"
          paintOrder="stroke"
          stroke="#f1ead2"
          strokeWidth="4"
          strokeLinejoin="round"
        >
          <text x="59" y="378">
            Portland
          </text>
          <text x="284" y="316">
            Vista House
          </text>
          <text x="461" y="286">
            Multnomah Falls
          </text>
          <text x="687" y="226">
            Hood River
          </text>
        </g>

        {/* Stop Markers */}
        <g stroke="#203a78" strokeWidth="2.5" fill="#fce466">
          <circle cx="117" cy="342" r="8" fill="#203a78" />
          <circle cx="324" cy="279" r="9" />
          <circle cx="518" cy="247" r="9" />
          <circle cx="739" cy="191" r="9" />
        </g>

        {/* Stop Numbers */}
        <g
          fontFamily="HK, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#18274b"
          textAnchor="middle"
        >
          <text x="324" y="283">
            1
          </text>
          <text x="518" y="251">
            2
          </text>
          <text x="739" y="195">
            3
          </text>
        </g>

        {/* Compass Needle */}
        <g transform="translate(842 345)" fill="#203a78">
          <path d="M0 32 8 9l8 23-8-5Z" />
          <text x="8" y="4" textAnchor="middle" fontFamily="HK, sans-serif" fontSize="13" fontWeight="700">
            N
          </text>
        </g>
      </svg>
      <div className="p-3 bg-[#e7e8d2] border-t border-[#a9aa9c] flex items-center justify-between text-xs text-[#47516a]">
        <span className="font-bold text-[#18274b]">Columbia River Gorge Scenic Route</span>
        <span>Schematic Map · Not to scale</span>
      </div>
    </div>
  );
}

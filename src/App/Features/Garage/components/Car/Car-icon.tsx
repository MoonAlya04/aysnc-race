import React from 'react';

type Props = { size?: number | string; color?: string };

export default function GetCar({ size = 128, color = 'currentColor' }: Props) {
  return (
    <svg viewBox="0 0 256 128" width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{ color }}>
      <path
        d="M28 86h-8c-6 0-10-4-10-10v-8c0-6 4-10 10-10h18l20-18c5-5 8-6 15-6h48c7 0 12 2 17 7l14 14h40c10 0 18 8 18 18v3c0 7-5 10-12 10h-8H28Z"
        fill="currentColor"
      />
      <rect x="65" y="46" width="30" height="14" rx="2" fill="white" opacity="0.9" />
      <rect x="105" y="46" width="25" height="14" rx="2" fill="white" opacity="0.9" />
      <circle cx="70" cy="90" r="14" fill="white" stroke="currentColor" strokeWidth={6} />
      <circle cx="178" cy="90" r="14" fill="white" stroke="currentColor" strokeWidth={6} />
    </svg>
  );
}

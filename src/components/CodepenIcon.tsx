import React from 'react';
import { siCodepen } from 'simple-icons';

const CodepenIcon: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${siCodepen.hex}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{siCodepen.title}</title>
      <path d={siCodepen.path} />
    </svg>
  );
};

export default CodepenIcon;
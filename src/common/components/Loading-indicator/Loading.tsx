import React from 'react';
import { Loader } from 'lucide-react';

interface Props {
  size?: number;
}

function Loading({ size = 24 }: Props) {
  return (
    <div className="w-fit h-fit">
      <Loader className="animate-spin" size={size} />
    </div>
  );
}

export default Loading;

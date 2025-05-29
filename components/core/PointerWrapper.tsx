// components/PointerWrapper.tsx
"use client";

import { Pointer } from "@/components/magicui/pointer";

const PointerWrapper = () => {
  return (
    <Pointer>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="#f00" d="M4.5.79v22.42l6.56-6.57h9.29L4.5.79z" />
        </svg>
      </div>
    </Pointer>
  );
};

export default PointerWrapper;

import { useEffect, useState } from "react";

interface Panel {
  children: React.ReactNode;
}

export function Panel({ children }: Panel) {
  const [opacity, setOpacity] = useState("opacity-100");
  useEffect(() => {
    // console.log("hi there");
    setOpacity("opacity-100");
  }, []);

  return (
    <div
      className={`bg-base-100 card card-compact shadow-xl w-full h-full transition ${opacity}`}
    >
      {children}
    </div>
  );
}

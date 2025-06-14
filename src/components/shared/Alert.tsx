import { useStore } from "@nanostores/react";
import { alertStore } from "../../store/AlertStore";

export function Alert() {
  const alertInfo = useStore(alertStore);
  const position = alertInfo.display ? "opacity-100" : "opacity-0";

  return (
    <div
      role="alert"
      className={`alert ${alertInfo.type} fixed ${position} bottom-5 right-5 w-1/4 transition-opacity`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{alertInfo.msg}</span>
    </div>
  );
}

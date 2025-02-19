import { Panel } from "../Panel";
import test from "../../assets/monitor.svg";

export function Device() {
  return (
    <div className="w-2/5">
      <Panel>
        <div className="card-body flex flex-row h-56">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-laptop h-full w-full"
              viewBox="0 0 16 16"
            >
              <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
            </svg>
          </div>

          <div className="flex-1">
            <h2 className="card-title">Device Name</h2>
            <div>
              <button className="btn btn-primary">Details</button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

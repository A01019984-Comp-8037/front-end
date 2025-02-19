import { Device } from "../shared/Device";

export function Devices() {
  return (
    <div className="w-full h-full p-3">
      <h1 className="w-full text-xl font-bold">Devices</h1>
      <div className="w-full h-screen flex justify-evenly">
        <Device />
        <Device />
      </div>
    </div>
  );
}

import { Device } from "../shared/Device";
import { PUBLIC_SERVER } from "../../utils/environment";
import { dbHeader } from "../../utils/fetch";

interface props {
  deviceList: {
    id: string;
    createdAt: string;
    displayname: string;
    connected: boolean;
  }[];
}

export function Devices({ deviceList }: props) {
  const addHandler = async () => {
    const url = `${PUBLIC_SERVER}/devices`;
    await fetch(url, {
      method: "POST",
      headers: dbHeader(),
      body: JSON.stringify({ test: "hi there" }),
    });
  };

  return (
    <div className="w-full p-3">
      <h1 className="text-2xl font-bold mb-5 px-3">Devices</h1>
      {/* <button onClick={addHandler} className="btn btn-neutral absolute">
        add
      </button> */}
      <div className="w-full flex justify-evenly flex-wrap">
        {deviceList.map((val, key) => (
          <Device key={key} info={val} />
        ))}
      </div>
    </div>
  );
}

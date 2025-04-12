import { useState } from "react";
import { Panel } from "../Panel";
import { PUBLIC_SERVER } from "../../utils/environment";
import { getCookie } from "../../utils/cookies";
import { sendAlert } from "../../store/AlertStore";

interface Props {
  name: string;
  id: number;
}

export function DeviceName({ name, id }: Props) {
  const [nameInput, setNameInput] = useState(name);

  const updateName = async () => {
    const url = `${PUBLIC_SERVER}/devices/name?device=${id}&name=${nameInput}`;
    console.log(url);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
    });
    if (res.ok) {
      sendAlert({
        type: "alert-success",
        msg: "Device name has been changed",
      });
    } else {
      sendAlert({
        type: "alert-error",
        msg: "Failed to change device name",
      });
    }
  };

  return (
    <div className="mb-3">
      <Panel>
        <div className="flex flex-row join">
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="p-5 flex-1 text-xl input join-item"
          />
          <button onClick={updateName} className="btn join-item w-fit">
            Update
          </button>
        </div>
      </Panel>
    </div>
  );
}

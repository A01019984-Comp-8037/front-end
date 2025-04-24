import { Panel } from "../Panel";
import { socket } from "../../utils/socket";
import { getCookie } from "../../utils/cookies";
import { useEffect } from "react";

interface Props {
  info: {
    id: string;
    createdAt: string;
    displayname: string;
    connected: boolean;
  };
}

export function Device({ info }: Props) {
  useEffect(() => {
    socket.on("client:delete-complete", () => {
      location.reload();
    });
    socket.emit(
      "client:join",
      {
        token: getCookie("access_token"),
      },
      (val: { status: string }) => {
        if (val.status === "connected") {
          console.log("connected");
        }
      }
    );
  }, []);

  let createddate = new Date(info.createdAt);
  createddate.toISOString().substring(0, 10);

  return (
    <div className="w-2/5 p-2 min-w-80">
      <Panel>
        <a
          className="card-body flex flex-row h-fit btn-ghost rounded-2xl"
          href={`/dashboard/device/${info.id}`}
        >
          <div className="w-fit flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-laptop h-36 w-auto"
              viewBox="0 0 16 16"
            >
              <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
            </svg>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div>
              <h2 className="card-title">{info.displayname}</h2>
              <p>Added: {createddate.toDateString()}</p>
              <p>Initialized: {`${info.connected}`}</p>
            </div>
          </div>
        </a>
      </Panel>
    </div>
  );
}

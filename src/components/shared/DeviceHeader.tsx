import { sendAlert } from "../../store/AlertStore";
import { getCookie } from "../../utils/cookies";
import { PUBLIC_SERVER } from "../../utils/environment";
import { dbHeader } from "../../utils/fetch";
import { socket } from "../../utils/socket";

interface Props {
  id: string;
}

export function DeviceHeader({ id }: Props) {
  const handleDelete = async () => {
    socket.emit("client:delete", {
      device: id,
      token: getCookie("access_token"),
    });
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${PUBLIC_SERVER}/devices/download?device=${id}`,
        {
          headers: dbHeader(),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "client-installer.sh";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Remote Firewall Web App</a>
      </div>
      <div className="navbar-end">
        <button className="btn mr-2 btn-primary w-24" onClick={handleDownload}>
          Installer
        </button>
        <button onClick={handleDelete} className="btn btn-error w-24">
          Delete
        </button>
      </div>
    </div>
  );
}

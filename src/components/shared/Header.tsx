import { sendAlert } from "../../store/AlertStore";
import { PUBLIC_SERVER } from "../../utils/environment";
import { dbHeader } from "../../utils/fetch";

export function Header() {
  const addHandler = async () => {
    const url = `${PUBLIC_SERVER}/devices`;
    const response = await fetch(url, {
      method: "POST",
      headers: dbHeader(),
      body: JSON.stringify({ test: "creating device" }),
    });
    console.log(response.status);
    if (response.status !== 500) {
      sendAlert({
        type: "alert-success",
        msg: "Device has been added, please complete setup",
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } else {
      sendAlert({
        type: "alert-error",
        msg: "Something went wrong, please try again",
      });
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl" href="/dashboard">
          Remote Firewall Web App
        </a>
      </div>
      <div className="navbar-end">
        <button onClick={addHandler} className="btn">
          Add Device
        </button>
      </div>
    </div>
  );
}

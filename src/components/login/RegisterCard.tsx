import { useState, type FormEvent } from "react";
import { Panel } from "../Panel";
import { PUBLIC_SERVER } from "../../utils/environment";
import { header } from "../../utils/fetch";

import { sendAlert } from "../../store/AlertStore";
import { RegisterSuccess } from "./RegisterSuccess";

export function RegisterCard() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e?.target as any);

    const reqBody = JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    try {
      const url = `${PUBLIC_SERVER}/auth/register`;
      const resp = await fetch(url, {
        method: "POST",
        headers: header,
        body: reqBody,
      }).then((res) => res.json());
      if (resp?.error) {
        console.error(resp.error);
        sendAlert({
          type: "alert-error",
          msg: resp.error,
        });
      } else {
        setRegistered(true);
        return;
      }
    } catch (e) {
      sendAlert({
        type: "alert-error",
        msg: "Something Went Wrong",
      });
    }
    setLoading(false);
  };

  if (registered) {
    return <RegisterSuccess />;
  }

  return (
    <Panel>
      <form className="card-body" onSubmit={submit}>
        <h2 className="card-title font-bold">Register</h2>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg font-semibold">Email</span>
            <span className="label-text-alt"></span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg font-semibold">Password</span>
            <span className="label-text-alt"></span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading}
        >
          Create Account
        </button>
        <div className="flex w-full flex-col border-opacity-50">
          <div className="divider">OR</div>
        </div>
        <a
          href="/"
          className={`btn btn-secondary ${loading ? "btn-disabled" : ""}`}
        >
          Return to Login
        </a>
      </form>
    </Panel>
  );
}

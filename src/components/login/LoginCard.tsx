import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Panel } from "../Panel";
import cookie from "cookie";

export function LoginCard() {
  const [loading, setLoading] = useState(false);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e?.target as any);
    const reqBody = JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    setLoading(true);
    const url = `${import.meta.env.PUBLIC_SERVER}/auth/login`;
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: reqBody,
      }).then((res) => res.json());
      const token = resp.access_token;
      const cookieString = cookie.serialize("access_token", token, {
        secure: true,
      });
      document.cookie = cookieString;
      document.location.href = "/dashboard";
    } catch (e) {
      console.log("login failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => console.log("cleanup");
  }, []);

  return (
    <Panel>
      <div className="card-body">
        <div className={`${loading ? "" : "hidden"} text-center`}>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
        <form onSubmit={login} className={loading ? "hidden" : ""}>
          <h2 className="card-title font-bold">Login</h2>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg font-semibold">Email</span>
              <span className="label-text-alt"></span>
            </div>
            <input
              type="email"
              name="email"
              required
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
              required
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </label>
          <button type="submit" className="btn w-full btn-primary mt-3">
            Sign In
          </button>
          <div className="flex w-full flex-col border-opacity-50">
            <div className="divider">OR</div>
          </div>
          <a href="/register" className="btn w-full btn-secondary">
            Create an account
          </a>
        </form>
      </div>
    </Panel>
  );
}

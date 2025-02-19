import { Panel } from "../Panel";

export function RegisterSuccess() {
  return (
    <Panel>
      <div className="p-5">
        <h1 className="font-bold text-lg">Account Created</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="green"
          className="bi bi-check2-circle w-full h-24 my-3"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
        </svg>
        <h2 className="my-3 text-center">You can now login</h2>
        <a href="/" className="btn btn-primary w-full">
          Return to Login
        </a>
      </div>
    </Panel>
  );
}

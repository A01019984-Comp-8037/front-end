import { getCookie } from "./cookies";

export const header = {
  "content-type": "application/json",
};

export function dbHeader() {
  const token = getCookie("access_token");
  if (!token) document.location.href = "/";
  return {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

import { atom } from "nanostores";

interface alert {
  msg: string;
  type: "alert-info" | "alert-success" | "alert-warning" | "alert-error" | "";
  display: boolean;
}

export const alertStore = atom<alert>({
  msg: "",
  type: "",
  display: false,
});

interface sendAlert {
  msg: string;
  type: "alert-info" | "alert-success" | "alert-warning" | "alert-error" | "";
}

export async function sendAlert({ type = "", msg }: sendAlert) {
  if (alertStore.get().display) return;
  const settings: alert = {
    type,
    msg,
    display: true,
  };
  alertStore.set(settings);
  setTimeout(
    () =>
      alertStore.set({
        ...settings,
        display: false,
      }),
    10000
  );
}

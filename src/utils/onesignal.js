import OneSignal from "react-onesignal";

export const getOneSignalId = () => {
  const id = OneSignal.User.onesignalId;
  return id;
};

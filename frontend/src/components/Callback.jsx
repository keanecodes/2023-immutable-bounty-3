import { passportInstance } from "../immutable";

export default function CallbackPage() {
  window.addEventListener("load", function () {
    passportInstance.loginCallback();
  });
  return <div>Loading... Please close this window if it hangs more than 30 seconds.</div>;
};

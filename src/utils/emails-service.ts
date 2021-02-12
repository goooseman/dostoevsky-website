import { MAILCHIMP_ADDRESS, MAILCHIMP_U, MAILCHIMP_ID } from "src/config/vars";

export const subscribeToEmail = (email: string): Promise<Response> => {
  return fetch(
    MAILCHIMP_ADDRESS +
      "?" +
      new URLSearchParams({
        u: MAILCHIMP_U || "",
        id: MAILCHIMP_ID || "",
        MERGE0: email,
      }),
    {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "unsafe-url",
    }
  );
};

if (!process.env.GATSBY_MAILCHIMP_ADDRESS) {
  throw new Error(
    "GATSBY_MAILCHIMP_ADDRESS is not set. Please, use .env file to configure application"
  );
}
export const MAILCHIMP_ADDRESS = process.env.GATSBY_MAILCHIMP_ADDRESS;
export const MAILCHIMP_U = process.env.GATSBY_MAILCHIMP_U;
export const MAILCHIMP_ID = process.env.GATSBY_MAILCHIMP_ID;

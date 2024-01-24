const headers = {
  Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
};

const BASE_URL = "https://api.buttondown.email";
const ENDPOINT = "/v1/subscribers";

const errorDetails = {
  email_already_exists: "This email is already subscribed.",
  email_invalid: "This email is invalid.",
  tag_invalid: "An invalid tag was provided.",
};

export async function createSubscriber(formData: FormData) {
  if (!formData.get("email")) {
    throw new Error("Email is required");
  }
  const body = { email: formData.get("email") };
  const res = await fetch(`${BASE_URL}${ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
  const data = await res.json();
  if (res.status !== 201) {
    throw new Error(errorDetails[data.code]);
  }
  return data;
}

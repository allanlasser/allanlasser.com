"use server";

import { createSubscriber } from "src/providers/buttondown";

export interface FormState {
  success?: boolean;
  error?: boolean;
  message?: string;
}

export async function handleSignup(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  let data;
  try {
    data = await createSubscriber(formData);
  } catch (err) {
    return {
      error: true,
      message: String(err),
    };
  }
  return {
    success: true,
    message: "You’re now subscribed, thank you!",
  };
}

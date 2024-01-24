"use server";

import { cookies } from "next/headers";
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
  cookies().set("subscriber", data.email);
  return {
    success: true,
    message: "You’re now subscribed, thank you!",
  };
}

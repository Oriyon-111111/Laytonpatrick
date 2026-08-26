import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/email";
import { contactFormSchema, getContactFieldErrors } from "@/lib/validation";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 12_000;
const noStoreHeaders = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { message: "Request is too large." },
      { status: 413, headers: noStoreHeaders },
    );
  }

  try {
    const verification = await checkBotId({
      advancedOptions: { checkLevel: "basic" },
    });

    if (verification.isBot) {
      return NextResponse.json(
        { message: "Submission blocked." },
        { status: 403, headers: noStoreHeaders },
      );
    }
  } catch (error) {
    console.error("[contact] Bot verification failed", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { message: "Submission could not be verified." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const validation = contactFormSchema.safeParse(requestBody);
  if (!validation.success) {
    return NextResponse.json(
      {
        message: "Please review the submitted fields.",
        fieldErrors: getContactFieldErrors(validation.error),
      },
      { status: 422, headers: noStoreHeaders },
    );
  }

  if (validation.data.company) {
    return NextResponse.json(
      { message: "Submission blocked." },
      { status: 403, headers: noStoreHeaders },
    );
  }

  try {
    await sendContactEmail(validation.data);
    return NextResponse.json(
      { message: "Thank you. Your message has been sent." },
      { headers: noStoreHeaders },
    );
  } catch (error) {
    console.error("[contact] Email delivery failed", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { message: "Email delivery is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }
}

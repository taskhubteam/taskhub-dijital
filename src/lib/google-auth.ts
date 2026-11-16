import crypto from "node:crypto";

// Server-only helper: service-account JWT bearer flow for Google APIs (GA4 Data API, Search
// Console). Plain fetch instead of Google's SDKs, which load protobuf files from disk at runtime
// and break once bundled for Workers. Only import this from inside server-function handlers.

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

/** Normalise a private key pasted into an env var: literal \n, stray wrapping quotes. */
export function readPrivateKey(raw: string | undefined): string | undefined {
  return raw
    ?.replace(/\\n/g, "\n")
    .trim()
    .replace(/^"+|"+$/g, "");
}

export async function getGoogleAccessToken(
  clientEmail: string,
  privateKey: string,
  scope: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: clientEmail,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), privateKey);
  const jwt = `${unsigned}.${base64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

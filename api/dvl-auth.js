export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const expected = process.env.DVL_PASSWORD;
  if (!expected) {
    res.status(503).json({ ok: false, error: "Password not configured" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const password = body?.password ?? "";
  if (password !== expected) {
    res.status(401).json({ ok: false, error: "Wrong password" });
    return;
  }

  const maxAge = 60 * 60 * 24 * 7;
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `dvl_auth=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`
  );
  res.status(200).json({ ok: true });
}

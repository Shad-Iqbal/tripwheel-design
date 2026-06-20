export default function middleware(request) {
  const expected = process.env.DVL_PASSWORD;
  if (!expected) return;

  const url = new URL(request.url);
  const path = url.pathname;

  // cleanUrls strips .html — allow both /auth and /auth.html
  if (path === "/auth" || path === "/auth.html" || path.startsWith("/api/")) return;

  const cookie = request.headers.get("cookie") || "";
  if (cookie.includes("dvl_auth=1")) return;

  const next = encodeURIComponent(path + url.search);
  return Response.redirect(new URL(`/auth?next=${next}`, request.url), 302);
}

export const config = {
  matcher: ["/((?!auth(?:\\.html)?|api/).*)"],
};

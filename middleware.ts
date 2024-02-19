import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { AUTH_ROUTES, DEFAULT_LOGIN_ROUTE, PUBLIC_ROUTES } from "./Routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isAuthRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }
});

export const config = {
  matcher: ["/users/:path*"],
};

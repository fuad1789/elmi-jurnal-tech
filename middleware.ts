import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user is authenticated, we continue.
    // withAuth will handle redirecting unauthenticated users to the sign-in page.
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  // Protect all routes under /admin
  matcher: ["/admin/:path*"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Get the JWT token (or any auth token) from cookies
//   const token = request.cookies.get("token")?.value;

//     // Define public routes
//   const publicRoutes = ["/login", "/register", "/forgot-password"];

//     const isPublic = publicRoutes.some((path) =>
//     request.nextUrl.pathname.startsWith(path)
//     );

//     if (!isPublic && !token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//     }

//   // Otherwise, continue as normal
//   return NextResponse.next();
// }

// // Match all routes except API, static files, and Next.js internals
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)",
//   ],
// };

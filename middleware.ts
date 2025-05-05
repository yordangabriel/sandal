import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limit store (consider Redis for production)
const rateLimits = new Map<string, { count: number; resetAt: number }>();

// Admin password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip =
    request.ip || request.headers.get("x-forwarded-for") || "127.0.0.1";

  // Rate limiting for API routes
  if (pathname.startsWith("/api/orders")) {
    const now = Date.now();
    const limit = 5; // 5 requests per minute
    const windowMs = 60 * 1000; // 1 minute

    // Get or initialize rate limit for this IP
    const rateLimit = rateLimits.get(ip) || {
      count: 0,
      resetAt: now + windowMs,
    };

    // Reset if window has passed
    if (now > rateLimit.resetAt) {
      rateLimit.count = 0;
      rateLimit.resetAt = now + windowMs;
    }

    // Check if limit exceeded
    if (rateLimit.count >= limit) {
      return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": Math.ceil((rateLimit.resetAt - now) / 1000).toString(),
        },
      });
    }

    // Increment count
    rateLimit.count += 1;
    rateLimits.set(ip, rateLimit);

    // Clean up old entries periodically (optional)
    if (Math.random() < 0.1) {
      // 10% chance to clean up
      rateLimits.forEach((value, key) => {
        if (now > value.resetAt + windowMs) {
          rateLimits.delete(key);
        }
      });
    }
  }

  // Admin authentication
  if (pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Access"',
        },
      });
    }

    const credentials = atob(authHeader.split(" ")[1]);
    const [username, password] = credentials.split(":");

    if (password !== ADMIN_PASSWORD) {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Access"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/orders"],
};

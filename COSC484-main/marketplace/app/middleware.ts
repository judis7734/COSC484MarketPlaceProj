// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = new TextEncoder().encode(
    process.env.JWT_SECRET_KEY || 'your-secret-key-min-32-chars-long!!!'
)

// Add paths that don't require authentication
const publicPaths = ['/login', '/register', '/about']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if the path is public
    if (publicPaths.includes(pathname)) {
        return NextResponse.next()
    }

    const session = request.cookies.get('session')

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        // Verify the session
        await jwtVerify(session.value, secretKey)
        return NextResponse.next()
    } catch (error) {
        // Invalid or expired session
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('session')
        return response
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
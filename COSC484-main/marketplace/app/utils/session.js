"use server"
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

// Use a more secure key in production, stored in environment variables
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'secret_key')

/**
 * Creates a session and sets it in a cookie
 * @param {Object} data - Data to store in the session
 * @returns {Promise<string>} Session token
 */
export async function createSession(data) {
    try {
        // Create a JWT token with the session data
        const token = await new SignJWT(data)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h') // Adjust expiration time as needed
            .sign(secretKey)

        // Set the session cookie
        cookies().set('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours in seconds
            path: '/'
        })

        return token
    } catch (error) {
        console.error('Error creating session:', error)
        throw new Error('Failed to create session')
    }
}

/**
 * Gets the current session data
 * @returns {Promise<Object|null>} Session data or null if no session exists
 */
export async function getSession() {
    try {
        const token = cookies().get('session')
        
        if (!token) {
            return null
        }

        const verified = await jwtVerify(token.value, secretKey)
        return verified.payload
    } catch (error) {
        console.error('Error getting session:', error)
        return null
    }
}

/**
 * Updates the current session with new data
 * @param {Object} newData - New data to merge with existing session
 * @returns {Promise<Object>} Updated session data
 */
export async function updateSession(newData) {
    try {
        const currentSession = await getSession()
        const updatedData = { ...currentSession, ...newData }
        
        await createSession(updatedData)
        return updatedData
    } catch (error) {
        console.error('Error updating session:', error)
        throw new Error('Failed to update session')
    }
}

/**
 * Destroys the current session
 */
export async function destroySession() {
    try {
        cookies().delete('session')
    } catch (error) {
        console.error('Error destroying session:', error)
        throw new Error('Failed to destroy session')
    }
}

/**
 * Middleware to check if user is authenticated
 * @param {Function} handler - Route handler
 */
export async function withAuth(handler) {
    return async (request) => {
        const session = await getSession()
        
        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }
        
        return handler(request, session)
    }
}
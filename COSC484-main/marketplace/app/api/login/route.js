// app/api/login/route.js
import { NextResponse } from 'next/server';
import { verifyLogin } from '../dbFunctions';
import { createSession } from '../../utils/session';

/**
 * Fetches user data by CID using GET request
 * @param {string} cid - Customer ID
 * @returns {Promise<Object>} User data
 */
async function getUserData(cid) {
    try {
        // Use URL with search params for GET request
        const url = new URL('/api/get_user', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
        url.searchParams.append('cid', cid);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store' // Prevent caching of user data
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch user data');
        }

        const data = await response.json();
        return data.data; // Assuming the data is nested under 'data' key
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export async function POST(req) {
    try {
        // Input validation
        if (!req.body) {
            return NextResponse.json({ 
                error: 'Request body is required' 
            }, { status: 400 });
        }

        const body = await req.json();
        const { email, pword } = body;

        // Validate required fields
        if (!email || !pword) {
            return NextResponse.json({ 
                error: 'Email and password are required' 
            }, { status: 400 });
        }

        // Verify login and get CID
        const cid = await verifyLogin(email.trim(), pword.trim());

        if (!cid) {
            return NextResponse.json({ 
                error: 'Invalid credentials' 
            }, { status: 401 });
        }

        // Fetch user data using the GET route
        const userData = await getUserData(cid);

        if (!userData) {
            return NextResponse.json({ 
                error: 'User data not found' 
            }, { status: 404 });
        }

        // Create session
        await createSession({
            userCID: userData.cid,
            email: userData.email,
        });

        // Return success response with user data
        return NextResponse.json({
            success: true,
            userData: {
                cid: userData.cid,
                email: userData.email,
                fname: userData.fname,
                lname: userData.lname,
                age: userData.age,
                city: userData.city,
                zip: userData.zip,
                phone: userData.phone
            }
        }, { 
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate'
            }
        });

    } catch (error) {
        console.error('Login error:', error);

        // Handle specific errors
        if (error.message === 'Invalid credentials') {
            return NextResponse.json({ 
                error: 'Invalid email or password' 
            }, { status: 401 });
        }

        if (error.message === 'User not found') {
            return NextResponse.json({ 
                error: 'User not found' 
            }, { status: 404 });
        }

        // Generic error for unexpected issues
        return NextResponse.json({ 
            error: 'An error occurred during login' 
        }, { status: 500 });
    }
}
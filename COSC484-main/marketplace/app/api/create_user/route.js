import { NextResponse } from 'next/server';
import { createUserWithLogin } from '../dbFunctions';
import { createSession } from '../../utils/session';

export async function POST(req) {
    try {
        // Parse the JSON body from the request
        const body = await req.json();

        // Destructure the data from the parsed body
        const { 
            age,
            phone,
            email,
            street,
            city,
            state,
            zipcode,
            lname,
            fname,
            password
        } = body;

        // Validate required fields
        if (!age || !phone || !email || !street || !city || !state || !zipcode || !lname || !fname || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create user account with trimmed values
        const newUserStatus = await createUserWithLogin({
            age: String(age).trim(),
            phone: phone.trim(),
            email: email.trim(),
            street: street.trim(),
            city: city.trim(),
            state: state.trim(),
            zipcode: zipcode.trim(),
            lname: lname.trim(),
            fname: fname.trim(),
            password: password
        });

        // Create a new session for the newly created user
        const sessionData = {
            userId: newUserStatus.customerId,
            email: email
        };
        const sessionToken = await createSession(sessionData);

        // Return success response with the session token
        return NextResponse.json(
            { success: true, data: newUserStatus, sessionToken },
            { status: 200 }
        );

    } catch (error) {
        console.error('Signup Error:', error);
        
        // Return detailed error for debugging (consider removing in production)
        return NextResponse.json(
            { 
                error: error.message ,
            }, 
            { status: 500 }
        );
    }
}
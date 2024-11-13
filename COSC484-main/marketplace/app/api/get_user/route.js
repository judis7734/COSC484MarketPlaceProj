import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const connectionConfig = {
    host: process.env.NEXT_PUBLIC_RDS_HOST,
    user: process.env.NEXT_PUBLIC_RDS_USER,
    password: process.env.NEXT_PUBLIC_RDS_PASS,
    database: 'cosc484_marketDB'
};

export async function GET(req) {
    const cid = req.nextUrl.searchParams.get('cid');
    if (!cid) {
        return NextResponse.json(
            { error: 'CID parameter is required' },
            { status: 400 }
        );
    }
    
    try {
        const userInfo = await getUserInformation(cid);
        return NextResponse.json({
            success: true,
            data: userInfo
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.message === 'User not found' ? 404 : 500 }
        );
    }
}

async function getUserInformation(cid) {
    let connection;
    try {
        // Validate CID
        if (!cid || typeof cid !== 'string') {
            throw new Error('Invalid CID provided');
        }

        connection = await mysql.createConnection(connectionConfig);

        const [rows] = await connection.execute(
            'SELECT cid, age, phone, email, street, city, state, zipcode, lname, fname FROM customers WHERE cid = ?',
            [cid]
        );

        if (!rows || rows.length === 0) {
            throw new Error('User not found');
        }

        // Return first matching user
        const userInfo = rows[0];

        // Format phone number if needed
        if (userInfo.phone) {
            userInfo.phone = userInfo.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }

        // Format address for convenient display
        userInfo.fullAddress = `${userInfo.street}, ${userInfo.city}, ${userInfo.state} ${userInfo.zipcode}`;

        return userInfo;

    } catch (error) {
        console.error('Database error in getUserInformation:', {
            errorCode: error.code,
            errorMessage: error.message,
            cid: cid
        });
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    }
}
import mysql from 'mysql2/promise';
const connectionConfig = {
    host: process.env.NEXT_PUBLIC_RDS_HOST,
    user: process.env.NEXT_PUBLIC_RDS_USER,
    password: process.env.NEXT_PUBLIC_RDS_PASS,
    database: 'cosc484_marketDB'
};
export async function checkEmailExists(email) {
    try {
        // Create a connection
        const connection = await mysql.createConnection(connectionConfig);

        // Execute the query to check email with backticks around `exists` since exists is a keyword
        const [results] = await connection.execute(
            'SELECT EXISTS(SELECT email FROM customers WHERE email = ?) AS `exists`',
            [email]
        );
        
        // Close the connection
        await connection.end();

        // Return true if exists, false otherwise
        return results[0].exists === 1;
    } catch (error) {
        console.error('Database query failed23:', error);
        throw error;
    }
}
export async function verifyLogin(email,password){
    try {
        // Create a connection
        const connection = await mysql.createConnection(connectionConfig);


        // after check email in the api call is found to be true checks password to see if it matches
    
        const [results] = await connection.execute(
            'SELECT cid FROM login WHERE user_name = ? and password=?',
            [email,password]
        );
        // Close the connection
        await connection.end();
        console.log(results);
        // Return true if exists, false otherwise
        return results[0].cid;
    } catch (error) {
        console.error('Database query failed login :', error);
        throw error;
    }
    
}



export async function createUserWithLogin({
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
}) {
    let connection;
    try {
        // Input validation
        if (!email || !password) {
            throw new Error('Missing required fields: email and password are required');
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        connection = await mysql.createConnection(connectionConfig);

        // Start transaction
        await connection.beginTransaction();

        // Check if email already exists in either table
        const [existingCustomers] = await connection.execute(
            'SELECT email FROM customers WHERE email = ?',
            [email]
        );

        console.log(existingCustomers)

        const [existingLogins] = await connection.execute(
            'SELECT user_name FROM login WHERE user_name = ?',
            [email]
        );

        console.log(existingLogins)

        if (existingCustomers.length > 0 || existingLogins.length > 0) {
            throw new Error('User with this email already exists');
        }

        // Generate a unique customer ID (you can modify this according to your needs)
        const cid = `CID${Date.now()}${Math.floor(Math.random() * 1000)}`;

        // Insert into customers table first
        const [customerResult] = await connection.execute(
            'INSERT INTO customers (cid, age, phone, email, street, city, state, zipcode, lname, fname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [cid, age, phone, email, street, city, state, zipcode, lname, fname]
        );

        // Insert into login table
        const [loginResult] = await connection.execute(
            'INSERT INTO login (user_name, password, cid) VALUES (?, ?, ?)',
            [email, password, cid]
        );

        // Commit the transaction
        await connection.commit();

        const userStatus = {
            success: true,
            customerId: cid,
            customerInsertId: customerResult.insertId,
            loginInsertId: loginResult.insertId,
            message: 'User account and login created successfully',
            timestamp: new Date().toISOString()
        };

        return userStatus;

    } catch (error) {
        // Rollback transaction on error
        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackError) {
                console.error('Error rolling back transaction:', rollbackError);
            }
        }

        // Categorize errors
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('User with this email already exists');
        }
        
        if (error.code === 'ECONNREFUSED') {
            throw new Error('Unable to connect to database');
        }

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new Error('Invalid customer ID reference');
        }

        // Log error details for debugging
        console.error('Database error in createUserWithLogin:', {
            errorCode: error.code,
            errorMessage: error.message,
            timestamp: new Date().toISOString(),
            stack: error.stack
        });

        // Throw a sanitized error for the client
        throw new Error('Failed to create user account: ' + error.message);

    } finally {
        // Always close the connection, even if there's an error
        if (connection) {
            try {
                await connection.end();
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    }
}

export async function randomAlphaNum() {
    try {
        let cid;
        let exists = 1; // Initialize to 1 to enter the while loop
        
        while (exists === 1) {
            cid = randomAlphaNumHelper();
            console.log('Generated CID:', cid);
            
            // Create a connection
            const connection = await mysql.createConnection(connectionConfig);
            const [rows] = await connection.execute(
                'SELECT EXISTS(SELECT * FROM customers WHERE cid = ?) AS `exists`',
                [cid]
            );
            await connection.end();
            
            // MySQL returns an array of objects, we need to access the first row's exists property
            exists = rows[0].exists;
        }

        console.log('Final unique CID:', cid);
        return cid;
    } catch (error) {
        console.error('Random number generation failed:', error);
        throw error;
    }
}

function randomAlphaNumHelper() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) { // Changed <= to < to generate exactly 10 characters
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
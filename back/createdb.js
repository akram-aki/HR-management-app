import pg from "pg";
const { Client } = pg;
// Define the PostgreSQL script
const createTablesScript = `
-- Create Users Table
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('employee', 'hr_manager', 'accountant')) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telephone VARCHAR(15) NOT NULL
);

-- Create Employees Table
CREATE TABLE IF NOT EXISTS Employees (
    id INT PRIMARY KEY REFERENCES Users(id) ON DELETE CASCADE,
    job_title VARCHAR(100),
    base_salary NUMERIC(10, 2) NOT NULL,
    department VARCHAR(50),
    vacation_days INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create Attendance Table
CREATE TABLE IF NOT EXISTS Attendance (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(10) CHECK (status IN ('present', 'absent')) NOT NULL,
    justification TEXT,
    hours_worked NUMERIC(5, 2) DEFAULT 0
);

-- Create Payroll Table
CREATE TABLE IF NOT EXISTS Payroll (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(id) ON DELETE CASCADE,
    month DATE NOT NULL,
    days_worked INT DEFAULT 0,
    days_absent INT DEFAULT 0,
    base_salary NUMERIC(10, 2) NOT NULL,
    taxes NUMERIC(10, 2) DEFAULT 0,
    bonuses NUMERIC(10, 2) DEFAULT 0,
    net_salary NUMERIC(10, 2) NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Roles and Permissions Table
CREATE TABLE IF NOT EXISTS RolesPermissions (
    id SERIAL PRIMARY KEY,
    role VARCHAR(20) CHECK (role IN ('hr_manager', 'accountant')) NOT NULL,
    permission VARCHAR(50) NOT NULL
);

-- Create Employee demand absense table
CREATE TABLE EmployeeAbsence (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    employee_name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    justification_photo_url TEXT NOT NULL,
    status VARCHAR(10) CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending'
);

`;

// Function to execute the script
async function executeScript() {
  const client = new Client({
    user: "postgres", // Replace with your PostgreSQL username
    host: "localhost", // Replace with your PostgreSQL host
    database: "hr", // Replace with your PostgreSQL database name
    password: "pataki", // Replace with your PostgreSQL password
    port: 1234, // Default PostgreSQL port
  });

  try {
    await client.connect();
    console.log("Connected to the database.");

    // Execute the script
    await client.query(createTablesScript);
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error executing script:", err.stack);
  } finally {
    await client.end();
    console.log("Disconnected from the database.");
  }
}

// Call the function
executeScript();

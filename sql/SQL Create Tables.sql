-- Company Table
CREATE TABLE Company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Branch Table
CREATE TABLE Branch (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES Company(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    admin_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    location_latitude DECIMAL(9,6),  
    location_longitude DECIMAL(9,6),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Users Table (Manages Employees, Admins, and Drivers)
CREATE TABLE Users (
    uid TEXT PRIMARY KEY, -- Firebase UID
    role VARCHAR(20) CHECK (role IN ('ShiftMeAdmin', 'CompanyAdmin', 'Employee', 'Driver')) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    location_latitude DECIMAL(9,6),  
    location_longitude DECIMAL(9,6),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Employee Table (Links to Users Table)
CREATE TABLE Employee (
    emp_no VARCHAR(255) PRIMARY KEY,
    uid TEXT REFERENCES Users(uid) ON DELETE CASCADE, -- Links to Firebase Auth UID
    branch_id INT REFERENCES Branch(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Shift Table
CREATE TABLE Shift (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL CHECK (name IN ('Day Shift', 'Night Shift', 'Evening Shift')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Employee_Shift (Many-to-Many)
CREATE TABLE Employee_Shift (
    employee_id VARCHAR(255) REFERENCES Employee(emp_no) ON DELETE CASCADE,
    shift_id INT REFERENCES Shift(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (employee_id, shift_id)
);

-- Driver Table (Links to Users Table)
CREATE TABLE Driver (
    id SERIAL PRIMARY KEY,
    uid TEXT REFERENCES Users(uid) ON DELETE CASCADE, -- Links to Firebase Auth UID
    driving_license_number VARCHAR(50) UNIQUE NOT NULL,
    nic_number VARCHAR(50) UNIQUE NOT NULL,
    photo TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Vehicle Table
CREATE TABLE Vehicle (
    id SERIAL PRIMARY KEY,
    driver_id INT REFERENCES Driver(id) ON DELETE CASCADE,
    photo TEXT,
    number_plate VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Transport Schedule
CREATE TABLE Transport_Schedule (
    id SERIAL PRIMARY KEY,
    branch_id INT REFERENCES Branch(id) ON DELETE CASCADE,
    route TEXT NOT NULL,
    schedule_week INT NOT NULL,
    schedule_start_date DATE NOT NULL,
    schedule_end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Employee Transport Confirmation (Many-to-Many)
CREATE TABLE Employee_Transport_Confirmation (
    employee_id VARCHAR(255) REFERENCES Employee(emp_no) ON DELETE CASCADE,
    schedule_id INT REFERENCES Transport_Schedule(id) ON DELETE CASCADE,
    confirmed_date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Confirmed', 'Not Confirmed')) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (employee_id, schedule_id, confirmed_date)
);

-- Trip Table
CREATE TABLE Trip (
    id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES Transport_Schedule(id) ON DELETE CASCADE,
    driver_id INT REFERENCES Driver(id) ON DELETE CASCADE,
    vehicle_id INT REFERENCES Vehicle(id) ON DELETE CASCADE,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    mileage DECIMAL(10,2),
    status VARCHAR(20) CHECK (status IN ('Ongoing', 'Completed', 'Cancelled')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Live Location Tracking
CREATE TABLE Live_Location (
    id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES Trip(id) ON DELETE CASCADE,
    driver_location_latitude DECIMAL(9,6),  
    driver_location_longitude DECIMAL(9,6),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

# MySQL Database Setup Guide

## Prerequisites
- MySQL Server installed and running (version 5.7+)
- MySQL client or GUI tool (phpMyAdmin, MySQL Workbench, etc.)

## Setup Steps

### 1. Start MySQL Server

**Windows (if using XAMPP or MySQL Service):**
```bash
# If using XAMPP, start MySQL from the control panel
# OR start the service via Services app
# OR run in terminal:
net start MySQL80  # Replace 80 with your version
```

**macOS (using Homebrew):**
```bash
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo systemctl start mysql
```

### 2. Create the Database

Open MySQL terminal or GUI client and run:

```sql
-- Create the database
CREATE DATABASE emotional_support;

-- Create a new user (optional but recommended)
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON emotional_support.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Update .env File

Edit `.env` in the project root:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=emotional_support
DB_SYNCHRONIZE=true
JWT_SECRET=your-secret-key-change-in-production
```

**Replace with your MySQL credentials:**
- `DB_USERNAME` - MySQL user (default: `root`)
- `DB_PASSWORD` - MySQL password (default: empty)
- `DB_HOST` - MySQL host (default: `localhost`, change if remote)
- `DB_PORT` - MySQL port (default: `3306`)

### 4. Start the NestJS Application

```bash
npm run start:dev
```

The app will:
- Connect to MySQL
- Auto-create tables based on entities (User, Posts, Replies)
- Sync database schema

### 5. Verify Connection

Check the terminal output for:
```
Server running on: http://localhost:3000
```

If there are connection errors, verify:
1. MySQL server is running: `mysql -u root -p`
2. Database exists: `SHOW DATABASES;`
3. .env credentials are correct

## Database Entities

- **User** — User accounts (id, name, email, password, userId)
- **Post** — Support posts (extends later)
- **Reply** — Reply messages (extends later)

## Common Issues

| Issue | Solution |
|-------|----------|
| "Access denied" | Check `DB_USERNAME` and `DB_PASSWORD` in `.env` |
| "Unknown database" | Run `CREATE DATABASE emotional_support;` |
| "Connection refused" | Ensure MySQL server is running |
| "Port 3306 in use" | Check if another MySQL instance is running or change `DB_PORT` |

## Reset Database (Development Only)

```sql
DROP DATABASE emotional_support;
CREATE DATABASE emotional_support;
```

Then restart the app to resync.

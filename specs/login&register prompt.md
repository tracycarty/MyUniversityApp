Implement a user authentication system for my project nest-app/specs/login&registration.md: "Anonymous Emotional Support Platform".

FEATURES TO BUILD:
1. Registration Page
2. Login Page
3. Anonymous Dashboard

REQUIREMENTS:

[Registration]
- Create a registration form with fields:
  - Full Name
  - Email
  - Password
  - Confirm Password
- Validate inputs (email format, password match)
- Store user data in database
- Hash passwords securely
- Generate a unique User ID (e.g., USER_1001)
- After registration, redirect to login page

[Login]
- Create login form:
  - Email
  - Password
- Authenticate user using stored credentials
- Handle invalid login with error message
- Start session after successful login
- Redirect to dashboard

[Dashboard]
- Display only the generated User ID
- Do NOT display real name or email
- Add logout functionality

TECH STACK:
- PHP (separate files for register, login, logout)
- MySQL database
- Bootstrap 5 UI (clean modern design)

DATABASE:
Create a `users` table with:
- id (primary key)
- full_name
- email
- password (hashed)
- user_code (anonymous ID)
- created_at

FILE STRUCTURE:
- register.php
- login.php
- dashboard.php
- logout.php
- db.php (database connection)

UI:
- Use Bootstrap cards/forms
- Centered layout
- Clean and minimal

DELIVERABLE:
- Complete working code for all files
- Include SQL for table creation
- Follow best practices and clean structure
- Align with the existing features to work properly
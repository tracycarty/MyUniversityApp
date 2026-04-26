# Specification Document (spec.md)

## Project: Anonymous Emotional Support Platform

---

## Feature 1: User Registration

### Purpose
To allow users to create an account using their real personal information while ensuring anonymity within the platform.

### Expected Users
New users who want to join the platform and access its features.

### Main Functionality
Users can register by providing their real details such as name, email, and password. Upon successful registration, the system generates a unique User ID that will be used instead of their real identity within the platform.

### UI Design
- Input fields:
  - Full Name  
  - Email Address  
  - Password  
  - Confirm Password  
- A **Register** button  
- A link to navigate to the Login page  

### Acceptance Criteria
1. Users can input their real personal information to register.  
2. The system validates required fields (e.g., email format, password match).  
3. A unique User ID is generated for each registered user.  
4. The system stores user data securely.  
5. After successful registration, users are redirected to the Login page or Dashboard.  

---

## Feature 2: User Login

### Purpose
To authenticate registered users and allow secure access to their accounts.

### Expected Users
Registered users who want to log into the platform.

### Main Functionality
Users can log in using their registered email and password. Once authenticated, they are redirected to their dashboard where only their User ID is visible.

### UI Design
- Input fields:
  - Email Address  
  - Password  
- A **Login** button  
- A link to navigate to the Registration page  

### Acceptance Criteria
1. Users can log in using valid credentials (email and password).  
2. The system verifies the correctness of the credentials.  
3. Invalid login attempts display an appropriate error message.  
4. Upon successful login, users are redirected to the dashboard.  
5. The system maintains user session securely.  

---

## Feature 3: Anonymous Dashboard View

### Purpose
To maintain user anonymity by displaying only system-generated User IDs instead of personal information.

### Expected Users
Logged-in users accessing their dashboard.

### Main Functionality
After logging in, users can view their dashboard where their identity is represented only by a unique User ID. No personal details (e.g., name or email) are displayed.

### UI Design
- A dashboard page displaying:
  - **User ID** (e.g., User_1023)  
- Navigation options:
  - Logout  
  - Go to posts  

### Acceptance Criteria
1. The dashboard displays only the User ID and not personal details.  
2. Each user sees only their own User ID.  
3. The User ID remains consistent for the account.  
4. Personal information is hidden from other users.  

---

## Notes

- User data must be stored securely (e.g., hashed passwords).  
- The system must ensure privacy between real identity and public identity (User ID).  
- This feature supports anonymity while maintaining accountability through registered accounts.  
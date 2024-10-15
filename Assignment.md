# IoT Assignment

## Development of IoT Platform for Back-office Device Management

The system should be developed as a Web application.

### System Segmentation

The system should be divided into two parts: Frontend and Backend.

#### Frontend

- **Technology**: The Frontend should be developed using ReactJs or NextJs, written in Typescript or Javascript.
- **Requirements**:
  - A registration page for user signup with the following fields:
    - Username
    - Email
    - Password (must be encrypted, plain text is not allowed)
  - A login page where users log in using their username and password, and receive a JWT Token (valid for 1 hour) from the Backend.
  - A page to view all devices in the system, requiring a JWT Token for each API request.
  - Functionality for users to add, edit, and delete devices via the Web application.

#### Backend

- **Technology**: The Backend should be developed using NodeJs, written in Typescript or Javascript.
- **API Communication**: The Frontend and Backend will communicate through RESTful API.
- **Database**: Connect to either a Relational or Non-relational database.
- **Testing**: Write unit tests show the coverage.

### Deployment

- The application should be deployable via a `container`, with `a single command to run the Web Application`.

### Documentation

- Git should be used for version control.

## Assignment Submission

- Send the assignment to t.chanon@gmail.com (Ton) with a git URL (GitHub or GitLab) for review.
- Include a user guide and initial installation instructions, especially if the Web application cannot be run with a single command.

---
# “Have fun developing and see you soon ;)”

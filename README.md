# Email Automation System API Documentation

Welcome to the Email Automation System API documentation. This API provides endpoints to manage users, subscribers, email queues, lists, and dashboard functionalities for email automation.

## Authentication

All endpoints except for user registration and login require authentication. Authentication is performed via JWT tokens. To access authenticated endpoints, include the JWT token in the `Authorization` header of the HTTP request.

### User Routes

#### Register User

- **POST** `/api/v2/user/register`
  - Registers a new user with the system.
  - Requires parameters: `username`, `email`, `password`.
  - Returns a JWT token upon successful registration.

#### Verify User

- **POST** `/api/v2/user/verify`
  - Verifies a user's email address using a verification token.
  - Requires parameters: `token`.
  - Returns a success message upon successful verification.

#### Login User

- **POST** `/api/v2/user/login`
  - Logs in a user to the system.
  - Requires parameters: `email`, `password`.
  - Returns a JWT token upon successful login.

### Subscriber Routes

#### Add Subscriber

- **POST** `/api/v2/subscriber`
  - Adds a new subscriber to a specified list.
  - Requires parameters: `name`, `email`, `listId`.
  - Requires authentication.

#### Get Subscriber

- **GET** `/api/v2/subscriber/:subscriberId`
  - Retrieves details of a specific subscriber by ID.
  - Requires authentication.

#### Remove Subscriber

- **DELETE** `/api/v2/subscriber/:subscriberId`
  - Removes a subscriber from the system.
  - Requires authentication.

### List Routes

#### Add List

- **POST** `/api/v2/list`
  - Adds a new list to the system.
  - Requires parameters: `name`, `description`.
  - Requires authentication.

#### Select List

- **GET** `/api/v2/list/:listId`
  - Retrieves details of a specific list by ID.
  - Requires authentication.

#### Remove List

- **DELETE** `/api/v2/list/:listId`
  - Removes a list from the system.
  - Requires authentication.

### Email Queue Routes

#### Create Email

- **POST** `/api/v2/email-queue/createmail/:listId`
  - Creates a new email to be sent to subscribers of the specified list.
  - Requires parameters: `subject`, `text`, `timeToSend`.
  - Requires authentication.

### Dashboard Routes

#### Mail Tracker

- **GET** `/api/v2/dashboard`
  - Retrieves dashboard information including lists and emails for tracking purposes.
  - Requires authentication.

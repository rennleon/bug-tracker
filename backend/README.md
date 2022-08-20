# BUG-TRACKER API

## Endpoints:
### USERS `access to` **(Admin)**
- `api/users` 
 - **GET**: Returns a list of users
 - **POST**: Creates a new user

- `api/users/:id`
  - **GET**: Returns the user with id `:id`
  - **PUT**: Updates the user with id `:id`
  - **DELETE**: Deletes the user with id `:id`


### TICKETS `access to` **(Admin)**
- `api/tickets`
  - **GET**: Returns a list of tickets
  - **POST**: Creates a new ticket

- `api/tickets/:id`
  - **GET**: Returns the ticket with id `:id`
  - **PUT**: Updates the ticket with id `:id`
  - **DELETE**: Deletes the ticket with id `:id`


### USER-TICKETS `access to` **(User)**
- `api/users/:userId/tickets`
  - **GET**: Returns a list of tickets that belongs to the logged in user
  - **POST**: Creates a new ticket for the logged in user

- `api/users/tickets/:id`
  - **GET**: Returns the ticket with id `:id` that belongs to the logged in user
  - **PUT**: Updates the ticket with id `:id` that belongs to the logged in user
  - **DELETE**: Deletes the ticket with id `:id` that belongs to the logged in user


### STAFF-TICKETS `access to` **(Staff)**
- `api/staff/:staffId/tickets`
  - **GET**: Returns a list of tickets for the logged in staff member

- `api/staff/:staffId/tickets/:id/take`
  - **PATCH**: Assigns the ticket with id `:id` to the logged in staff member

- `api/staff/:staffId/tickets/:id/close`
  - **PATCH**: Closes the ticket with id `:id` to the logged in staff member
  
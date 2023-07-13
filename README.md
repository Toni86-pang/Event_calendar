# The Event Calendar

# Description of the application

A project-based web application for browsing, creating, editing and commenting on events. The application can be used without logging-in or by logging-in.

- Language: Typescript

- Framework: React

- Package Manager: npm

- Database: PostgreSQL.


# Functionality for a non-logged-in user:

- Top bar with links ( Events, Register, Login )

    - Events - displays a list of upcoming events that are public:

        - Search bar to search an event by name

        - A link with the event name, date and time.
            - Clicking on the link will take the user to the event details:
                - The name of the event
                - Date and time of event
                - Content of the event
                - Participants and number of participants:
                    - Participating
                    - Not participating
                    - Uncertain.
                - Text field and "add comment" -button to add a comment
                - Comments of the event with content, posters username and date and time.

    - Register - Register as a user by entering your username and password.

    - Login - Log in by entering your username and password.

# Functionality for the logged-in user:

- Top bar with links ( Events, New event, Logout )

    - Events - Displays a list of events created by the logged-in user, as well as other public events

        - Search bar to search an event by name

        - Link with event name, date and time.
            - Clicking on the link will take the user to the event details:
                - The name of the event
                - Date and time
                - Content of the event
                - Public / Private
                - Participants and number of participants:
                    - Participating
                    - Not participating
                    - Uncertain.
                - Text field and "add comment" -button to add a comment
                - Comments of the event with content, posters username and date and time
                - If a logged in user has created an event, there is buttons for:
                    - Edit the event
                        - There is the same form that is used to create an event, containing the data of an existing event. All the data on the form can be edited.
                        - Buttons:
                            - Modify event - if all fields are filled in, modify event and return to home page
                            - Cancel - cancel the editing of the event and return to the home page
                            - Reset - clears the form data.
                    - Delete an event
                    - Invite other users to the event.

    - New event - opens a form with the following fields:

        - Title - enter a title for the event
        - Content - describe the event in more detail
        - Public / Private - set the event to public or private
        - Date - enter the date of the event or select it from the calendar
        - Time - enter the time of the event
        - Buttons:
            - Create event - if all fields are filled in, create event and return to home page
            - Cancel - cancel the creation of the event and return to the home page.
            - Reset - clears the form data.

    - Logout - logs the user out

    - Delete User - deletes the user's own profile, as well as:
        - User-created events
        - Comments related to user-created events
        - Participation announcements.

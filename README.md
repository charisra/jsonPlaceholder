JSONPlaceholder React App

## How To Run The Project & Test

1. cd into 'jsonPlaceholder'
2. `npm install` (only once)
3. `npm start`

To test, input various values on the first search bar (userId) or select a property and input a value from the second form group.

There are also a couple of basic tests, which can be run with `npm test`

### About The Project & Technology Chosen

React was chosen as the framework to work with, since it allows for a fast and easy setup of the pages requested by the tech specs as well as an easy handling of the API's responses.
The main page allows the user to:
a) See all posts on a list
b) Search & filter by userId
c) Filter by any property of the posts

If no posts are found, either after searching using the input for an id or after using the dropdown, a message is displayed to notify the user.

The system doesn't allow a user to search for a property type if he hasn't first input a value in the appropriate field.

Reacstrap was chosen for a speedy yet aesthetically pleasing development of the skeleton of the pages. Axios was chosen as the library for the API calls and Underscore for throttling the requests to the API.

The system is broken down to two React Components, one for the main page (Home) and the other one for posts (Post).

### Improvements

- The two search filters (userId and the property type) could be expanded to work in parallel.
- Aesthetic changes can be done, though that wasn't the scope of this test.
- More tests can be written

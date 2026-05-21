//creating a model to display stories

toaster for notification

CONNECTION COMPONENT

👉 A strong viva answer would be:
“The Connections component manages different categories of a user’s network (followers, following, pending requests, and connections). It uses useState to track the active tab, maps over dummy data to render user cards, and conditionally shows different action buttons depending on the tab. Navigation to profile or messages is handled with useNavigate.”


MESSAGES COMPONENT

The Messages component displays a list of connected users using dummy data. Each user card shows profile info and has two buttons — one to start a chat and one to view the profile. It uses useNavigate from React Router for navigation and maps over the data to render multiple user cards dynamically.”

DISCOVER COMPONENT
“The Discover component lets users search for new connections. It uses useState to manage search input, user list, and loading state. When Enter is pressed, it simulates an API call with setTimeout, shows a loading spinner, and then reloads dummy data. It maps over the user list to render UserCard components dynamically.”

PROFILE COMPONENT
The Profile component displays a user’s profile page. It uses useParams to read the profile ID from the URL, useState to manage user and post data, and useEffect to fetch data when the component mounts. It conditionally renders a loading spinner until data is ready, and passes props to UserProfileInfo for displaying user details and posts.”





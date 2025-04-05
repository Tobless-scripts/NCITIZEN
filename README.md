# ncitizen

ncitizen is a community-driven platform that allows users to engage with various societal and geographic issues. The platform lets users join communities based on different issues like politics, military, healthcare, education, etc., as well as geographic communities for specific cities and locations.

## Features

-   _Login and Authentication_: Users can log in via Firebase authentication.
-   _Join/Leave Communities_: Users can join or leave communities related to various societal and geographic issues. The state is saved using localStorage.
-   _Responsive Design_: The platform is built with a responsive design that adapts to different screen sizes.
-   _Dynamic Community Cards_: Each community has an associated image, and users can easily join or leave communities with a single click.

## Tech Stack

-   _Frontend_: React.js
-   _Backend_: Firebase Authentication, Firebase Firestore
-   _Routing_: React Router
-   _Styling_: Tailwind CSS
-   _State Management_: React useState and useEffect

### Communities:

The Community component now features two types of communities:

1. _Issue-based communities_: Covering topics like Media, Military, Education, etc.
2. _Geographic-based communities_: Covering locations like New York, Texas, Tennessee, etc.

Each community has an associated image, and users can join or leave them based on their login state. If the user is not logged in, they are prompted to log in before they can join a community.

### Firebase Integration:

This project uses Firebase Authentication to manage user logins. Upon login, users can join communities, and their choices are stored in localStorage so that they persist across sessions.

---

Let me know if you need further adjustments or additions!

## Setup Instructions

1. _Clone the Repository_:
    ```bash
    git clone https://github.com/your-username/ncitizen.git
    ```

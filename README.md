<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url] -->

[![LinkedIn][linkedin-shield]][linkedin-url]

<div align="center">
<h1 align="center">Chortle</h1>
  <p align="center">
    GA SEI Project 3
    <br />
    <br />
    <a href="https://chortle-mk-2.vercel.app/">View Live Site</a>

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#brief">Brief</a></li>
    <li><a href="#planning">Planning</a></li>
    <li><a href="#build-process">Build Process</a></li>
    <li><a href="#challenges-and-bugs">Challenges and Bugs</a></li>
    <li><a href="#key-takeaways">Key Takeaways</a></li>
    <li><a href="#future-improvements">Future Improvements</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
 
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://chortle-mk-2.vercel.app/)

Timeframe: 1 week
Team: Groups of 3

This was the third portfolio project of the General Assembly Software Engineering Immersive bootcamp. We were tasked with creating a full stack application using the MERN stack or Next.js. Because of the rising popularity of this framework we decided to use Next.js.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- Next.js
- MongoDB
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/j-o-phillips/ga-chores
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the development server
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BRIEF -->

## Brief

The following was the General Assembly requirements for this project:

- A working full-stack, single-page application
- Incorporate the technologies of the MERN-stack, or use Next.js with a MongoDB database

- Have a well-styled interactive front-end.
- Implement token-based authentication. Including the ability of a user to sign-up, log in & log out.
- Implement authorization by restricting CUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.
- Have a well-scoped feature-set. Full-CRUD data operations are not required if one or more other features are included, for example:
  Consume data from a third-party API.
  Implement additional functionality if the user is an admin.
  Implementation of a highly dynamic UI or data visualization.
  Other, instructor approved, complexity/features.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PLANNING -->

## Planning

As a team of three fathers, we decided to build an app that would be useful to us and our families, so we settled on a chore tracking app. We used Miro to plan our database and organise the features of our app into priorities and ‘nice to haves’. We also decided to spend the first morning working together to organise the structure of our app, then split off to work on specific parts individually.

![User Story 1 Screen Shot][user1-screenshot]
![User Story 2 Screen Shot][user2-screenshot]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BUILD PROCESS -->

## Build Process

### Structure

As a team, we would use github to build separate parts of the app individually on our own branches and then merge them to the main branch. However, to begin the project I thought it best that we create the overall structure together to avoid too many merge conflicts. Therefore I created the basic structure of the app and defined the file structure. I also wrote the first API routes for creating, reading, updating and deleting chores, so that we could use them as templates for future routes. After this the other team members cloned the repo and we worked mostly individually from then on.

### Authentication

I handled the authentication process, which uses Next.js authentication system with the google O-Auth provider. This also required writing the code to connect to MongoDB so that we could create and access user models. This became a longer process involving some branching logic as I wanted the app to do several things automatically:

- Check if a user exists
- If not create a new user and redirect to the create household page
- If the user exists check if they are assigned to a household
- If they are redirect them to the household page
- If not redirect to the create household page

```js
export async function POST(req) {
  const { name, email, imgURL, households } = await req.json();
  await connectMongoDB();
  const user = await User.find({ email: email });

  if (!user[0]) {
    //If the user doesn't exist
    const user = await User.create({ name, email, imgURL, households });
    return NextResponse.json(
      { message: "User Created", redirect: "/createHousehold", user: user },
      { status: 201 }
    );
  }

  if (user[0]) {
    //if the user exists but their houshold array is empty
    if (!user[0].households.length)
      return NextResponse.json(
        {
          message: "User exists, create a household",
          redirect: "/createHousehold",
          user: user[0],
        },
        { status: 200 }
      );

    //the user exists and already has atleast one household
    //the user may have been added by another user, so we must update the image and name
    user[0].name = name;
    user[0].imgURL = imgURL;
    await user[0].save();

    return NextResponse.json(
      {
        message: "User email already exists",
        redirect: `/${user[0].households[0]}`,
        user: user[0],
      },
      { status: 200 }
    );
  }
}
```

The backend call to the database when a user logs in

### Sessions

Another of my tasks was to design the navbar, and I wanted the user’s profile information to be visible here across the whole site. I used the Next.js SessionProvider to expose the user data, and used the useSession hook to display the username and image in the navbar. I could also use this session data to protect the frontend routes.

```js
function Navbar() {
  const session = useSession();
  const [showUserName, setShowUserName] = useState(false);

  const toggleUserName = () => {
    setShowUserName(!showUserName);
  };

  return (
    <nav className={style.nav}>
      <div className={style.hello} width="auto">
        Choretle
      </div>
      {session.status === "authenticated" && (
        <div className={style.end}>
          {showUserName && (
            <h4 className={style.userName}>{session.data.user.name}</h4>
          )}
          <img
            onClick={toggleUserName}
            src={session.data.user.image}
            alt="image"
            className={style.image}
          />
          <LogOutBtn />
        </div>
      )}
    </nav>
  );
}
```

The Navbar component showing the conditional rendering of user information, and the protection of the route with session.authenticated

### Frontend/Backend

Most of the other backend routes were handled by another team member, and it was my task to connect them to the front end. I was also responsible for the design of some of the UI elements such as the new chore form, and the edit household page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CHALLENGES AND BUGS -->

## Challenges and Bugs

### Authentication and Next.js

The biggest challenge in this project involved learning about Next.js. Most of this module focussed on React so adding that layer of understanding required watching a lot of tutorials. In particular the authentication process and handling sessions was a challenge to implement at first. I also struggled a bit with the difference between server and client components, but I find the concept exciting and am eager to explore this further in upcoming side projects.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Key Takeaways -->

## Key Takeaways

I feel like I have gained confidence using Next.js and I was pleased to be able to implement a working authentication system with Next auth. I'm eager to continue to explore the possibilities of this framework in future projects

These were my key takeaways for this project:

- **I became more comfortable working in groups and have learnt a lot about how to plan projects and avoiding potential pitfalls**
- **Understanding how Next.js uses server and client components to incorporate both frontend and backend.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE IMPORVEMENTS -->

## Future Improvements

- I am quite unhappy with the UI. None of us really focussed on this area, and some early bad decisions on the layout make it more difficult to address now. I would like to redesign the whole UI and make it responsive (EDIT: Layout is now responsive and design has been moderately improved)
- I would like to add an invitation system to email other users with an invitation to your household

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Jake Phillips - jphillips@gmail.com

Portfolio Link: [Portfolio](https://jakephillips.eu)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/jake-o-phillips/spaceacademy-backend.svg?style=for-the-badge
[contributors-url]: https://github.com/j-o-phillips/spaceacademy-backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/j-o-phillips/spaceacademy-backend.svg?style=for-the-badge
[forks-url]: https://github.com/j-o-phillips/spaceacademy-backend/network/members
[stars-shield]: https://img.shields.io/github/stars/jake-o-phillips/spaceacademy-backend/.svg?style=for-the-badge
[stars-url]: https://github.com/j-o-phillips/spaceacademy-backend/stargazers
[issues-shield]: https://img.shields.io/github/issues/spaceacademy-backend/spaceacademy-backend.svg?style=for-the-badge
[issues-url]: https://github.com/j-o-phillips/spaceacademy-backend/issues
[license-shield]: https://img.shields.io/github/license/spaceacademy-backend/spaceacademy-backend.svg?style=for-the-badge
[license-url]: https://github.com/j-o-phillips/spaceacademy-backend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/jake-phillips-developer/
[product-screenshot]: app/assets/product.png
[erd-screenshot]: app/assets/erd.png
[user1-screenshot]: app/assets/userstory1.png
[user2-screenshot]: app/assets/userstory2.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

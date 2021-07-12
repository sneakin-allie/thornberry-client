# Capstone #2: THORNBERRY

This full stack application was made as my second capstone project for the Bloc/Thinkful Web Development course. It is a wildlife tracker application to be used by nature lovers that allows for the tracking of animal sightings and details about each sighting. Users can upload information about the animal, location, date, photos, and notes. Inspiration for this application came from my parents' need to keep track of bird and bear activity in their backyard. This application was built to meet the specifications laid out by the Bloc/Thinkful course. The project's server-side code can be viewed on its GitHub repository here: https://github.com/sneakin-allie/thornberry-api

## Live Application

This application can be viewed here:  https://wildlifer-client-sneakin-allie.vercel.app

It is hosted on Vercel.

## Summary

THORNBERRY has four main page branches. The Home/Landing Page, Sightings List Page, Add New Sighting Page, and Edit Sighting Page.

The Home/Landing Page has concise instructions on what the application does and how to get started, as well as Sign Up and Log In forms for new users and existing users respectively. 

The Sightings List Page lists a user's animal sightings with any previously saved details that the user input. The top of the page has an "Add New Sighting" button for easy access and each sighting listed has an "Edit" button so that users can edit fields as desired.

The Add New Sighting Page displays a form where a user can enter information about a sighting, including the animal, location, date, photos, and notes about activity, behavior, appearance, etc. Only the animal, location, and date are required at first so that a user can quickly save a sighting and return to it later to add notes. The Cloudinary Widget was used to allow users to upload photos from their personal camera roll.

The Edit Sighting Page displays a form where a user can update information about a sighting that has been saved. The input fields auto-fill with the previously saved information so the user can make edits where desired while keeping the rest of the input fields in tack. At the bottom of the form, there is a "Delete" button that deletes the sighting from the collection.

## Process

The design and implementation of this application went through multiple steps, each of which was approved by the grading team along the way. First, I wrote a proposal describing my project idea and the name for my application. Next, I wrote user stories to guide in development and edited the list to conform with the Pareto Principle, also known as the 80-20 rule. Then, I set up a Kanban board to manage my project and used it to keep track of my user stories and any issues with the application. Next, I created user flows and wireframes. This included creating a screen inventory, HTML wireframes for each page using HTML and CSS, and user flows for each wireframe. Using the wireframes and user flows, I built and implemented a static version of the client-side. I presented this to users to get initial feedback and did a round of iteration to address issues that came up. Next, I implemented the full MVP of the application, including the API and database. Once again, I did a final round of collecting user feedback and iterating. Finally, I styled the application with typography, color, and a responsive layout.

## Technology Used

The front-end of this project was built in React, using Router, class components, state, props, vanilla CSS, and the Cloudinary Widget. An API was created that handled all promises necessary to interact with the back-end API database.

The back-end of this project was built using Node.js, Express, PostgreSQL, and Knex. RESTful APIs were used along with middleware including Morgan, Express.json, Helmet, and CORS. CORS was implemented to ensure connection between the front-end application and back-end API.

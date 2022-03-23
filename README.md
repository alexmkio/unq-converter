# Unqork Converter

Unqork Converter is an application designed to help the software engineers on the Styles team at Unqork convert urls from one form to another.

The application is deployed [here](https://unqork-converter.vercel.app/)

## Technologies Used
This application is written in JavaScript utilizing the [Next.js](https://nextjs.org/) framework. [Tailwind CSS](https://tailwindcss.com/) is utilized for styling.

## Features

1. If the url contains form and edit then an `x` should be appended to the environment, `form` should be changed to `display`, and `edit` should be removed
   - `https://training.unqork.io/#/form/123456789abcdefg/edit` should become `https://trainingx.unqork.io/#/display/123456789abcdefg`
2. If a CUSTOMER and THEME are supplied then `?&style=THEME&remoteRootCustomer=http://localhost:3002/CUSTOMER/` should be added when converting to a display link
   - `https://training.unqork.io/#/form/123456789abcdefg/edit` should become `https://trainingx.unqork.io/?&style=THEME&remoteRootCustomer=http://localhost:3002/CUSTOMER/#/display/123456789abcdefg`
3. If the url contains display then the trailing `x` should be removed from the environment, `display` should be changed to `form`, and `edit` should be added to the end
   - `https://trainingx.unqork.io/#/display/123456789abcdefg` becomes `https://training.unqork.io/#/form/123456789abcdefg/edit`
   - `https://trainingx.unqork.io/?&style=THEME&remoteRootCustomer=http://localhost:3002/CUSTOMER/#/display/123456789abcdefg` also becomes `https://training.unqork.io/#/form/123456789abcdefg/edit`
4. If it's a workflow then `workflow` should not change to `display`
   - `https://training.unqork.io/#/workflow/123456789abcdefg/edit` should become `https://trainingx.unqork.io/#/workflow/123456789abcdefg`

## Contributors
This application was built by [Alex Kio](https://www.linkedin.com/in/alexkio/); a Front End Engineer at [Rightpoint](https://www.rightpoint.com/).

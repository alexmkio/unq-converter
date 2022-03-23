# Unqork Converter

Unqork Converter is an application designed to help the software engineers on the Styles team at Unqork convert urls from one form to another.

The application is deployed [here](https://unqork-converter.vercel.app/)

## Technologies Used
This application is written in JavaScript utilizing the [Next.js](https://nextjs.org/) framework. [Tailwind CSS](https://tailwindcss.com/) is utilized for styling.

## Features

1. If the url contains form and edit then an `x` should be appended to the environment, `form` should be changed to `display`, and `edit` should be removed
   - `https://training.unqork.io/#/form/61fa2ba2276bfe7377a371a3/edit` should become `https://trainingx.unqork.io/#/display/61fa2ba2276bfe7377a371a3`
2. If a CUSTOMER and THEME are supplied then `?&style=THEME&remoteRootCustomer=http://localhost:3002/CUSTOMER/` should be added when converting to a display link
   - `https://training.unqork.io/#/form/61fa2ba2276bfe7377a371a3/edit` should become `https://trainingx.unqork.io/?&style=THEME&remoteRootCustomer=http://localhost:3002/CUSTOMER/#/display/61fa2ba2276bfe7377a371a3`
3. If the url contains display then the trailing `x` should be removed from the environment, `display` should be changed to `form`, and `edit` should be added to the end
   - `https://trainingx.unqork.io/#/display/61fa2ba2276bfe7377a371a3` becomes `https://training.unqork.io/#/form/61fa2ba2276bfe7377a371a3/edit`
   - `https://trainingx.unqork.io/?&style=THEME&remoteRootCustomer=http://localhost:3002/CUSTOMER/#/display/61fa2ba2276bfe7377a371a3` also becomes `https://training.unqork.io/#/form/61fa2ba2276bfe7377a371a3/edit`
4. If it's a workflow then `workflow` should not change to `display`
   - `https://training.unqork.io/#/workflow/620c80000c447a19b157c29c/edit` should become `https://trainingx.unqork.io/#/workflow/620c80000c447a19b157c29c`

## Contributors
This application was built by [Alex Kio](https://github.com/alexmkio/); a Front End Engineer at [Rightpoint](https://www.rightpoint.com/).

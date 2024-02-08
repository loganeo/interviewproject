This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Project developement time: 16 hours

## Getting Started

What you'll need, MySQL Community, Example Dataset and Node.js

First download MySQL Community and set up a database using any dataset or the one provided

then clone the git repository into location of choice:

open command prompt or terminal of choice
```bash
cd *location of choice*
git clone <repository-url>
```

then in the cloned folder create a file named .env.local and in it fill out the following information:

```bash
DB_HOST=localhost
DB_USER=*enter user name here*
DB_PASSWORD=*enter password here*
DB_DATABASE=*enter database name here*
```

where DB_USER is your MySQL workbench connection user name

DB_PASSWORD is the password for said connection

and DB_DATABASE is the name of the database you want to connect to

## Running the Website

To run the development server you must be in the project's directory then type in console/terminal:

```bash
npm install
#then
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

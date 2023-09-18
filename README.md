# Invoicenator - Invoice managing app built with NextJS 13

InvoicePro is a versatile and user-friendly invoicing application designed to simplify your financial management tasks. Whether you're a freelancer, small business owner, or a growing enterprise, our app empowers you to take control of your invoicing process with ease.

- [Invoicenator Live Preview](https://invoicenator.vercel.app/)

## Built with

<div>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="64" width="64"/>
    <img    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"  height="64" width="64"/>
    <img    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" height="64" width="64"/>
    <img    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="64" width="64"/>
    <img    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="64" width="64"/>
    <img    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="64" width="64"/>
</div>
## Installation and Setup

To run Invoicenator on your local machine, follow these steps:

Ensure you have Node.js and npm (Node Package Manager) installed on your system. It's recommended to use Node v18.0 or higher.

### Clone the repository:

```bash
git clone https://github.com/your-username/invoicenator.git

cd invoicenator
```

### Install the required dependencies:

```bash
npm install
```

### Create a copy from `.env.example` and rename it to `.env.local`

```bash
cp .env.example .env.local
```

### Start the development server:

```bash
npm start
```

Open your web browser and visit http://localhost:3000 to access Invoicenator.

## Deployment

This project is deployed using Vercel.

## Available Scripts

Running development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

ESLint and/or Format with Prettier using: 

```bash
npm run lint
# or
npm run lint:fix
# or
npm run format
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Future Work

We have a few items listed for future work that weren't addressed for now due to the availability.

- Add jest testing into individual components.
- Generate PDF Invoices with React-PDF
- Different types of login (e.g. Google, Facebook, etc)
- Save user name and settings
- Dark mode

## License

Invoicenator is released under the MIT License. You are free to use, modify, and distribute this project as per the terms of the license.

Happy invoicing with Invoicenator! If you have any questions or need assistance, please don't hesitate to reach out to us.

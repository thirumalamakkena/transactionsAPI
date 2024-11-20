# Transaction API

## Overview
This project is a simple Transaction API that allows users to manage financial transactions. It provides endpoints to create, read and update transactions.

## Features
- Create a new transaction
- Retrieve transaction details
- Update an existing transaction


## Technologies Used
- Node.js
- Express.js
- SQlite

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/Transaction-Api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Transaction-Api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage
1. Start the server:
    ```bash
    npm start
    ```
2. The API will be available at `http://localhost:3000`.

## Endpoints
- `POST api/transactions` - Create a new transaction
- `GET api/transactions/:id` - Retrieve a transaction by ID
- `PUT api/transactions/:id` - Update a transaction by ID
- `GET api/transactions/` - Retrieve all transactions


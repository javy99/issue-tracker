# Issue Tracker

## Overview

The **Issue Tracker** is a Next.js application designed to help manage and track issues. It features a dashboard with statistics and visualizations, an issues page with filtering and sorting capabilities, and detailed issue views for editing and deletion.

## Features

- **Dashboard Page:**
  - Displays statistics on the number of open, in-progress, and closed issues.
  - Includes a bar chart for visual representation of the issues' statuses.
  - Lists the latest issues in a table format.

- **Issues Page:**
  - Shows all issues in a table with columns for Issue, Status, and Created Date.
  - Provides filtering options by status and column values.
  - Includes a "New Issue" button to create and add new issues by specifying a title and description.

- **Issue Details Page:**
  - Displays detailed information about a selected issue.
  - Provides options to edit or delete the issue.

## Installation

To run the Issue Tracker app locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/javy99/issue-tracker.git

2. **Navigate to the Project Directory:**
    ```bash
    cd issue-tracker

3. Install Dependencies:
    ```bash
    npm install

4. Run the Development Server:
    ```bash
    npm run dev

Open http://localhost:3000 in your browser to view the application.

## Environment Variables

To run the application, you'll need to set up a `.env` file with the required environment variables. 

### Instructions for Setting Up the `.env` File

1. **Create a `.env` File:**

   In the root directory of your project, create a file named `.env`.

2. **Add Environment Variables:**

   Copy and paste the example configuration into the `.env` file. Replace the placeholders with your actual values:

   ```env
   DATABASE_URL="your-database-connection-string"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   SENTRY_AUTH_TOKEN="your-sentry-auth-token"
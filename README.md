# RUF Nation Fight Predictions - cPanel Installation Guide

## Prerequisites

1. cPanel hosting account with:
   - Node.js support
   - MySQL database
   - PHP version 7.4 or higher

2. Access to:
   - cPanel dashboard
   - MySQL database credentials
   - Cloudinary account (for image hosting)

## Installation Steps

1. Create a MySQL database and user in cPanel:
   - Go to MySQL Databases in cPanel
   - Create a new database
   - Create a new user
   - Add the user to the database with all privileges

2. Upload the project files to your hosting:
   - Use File Manager or FTP
   - Upload to public_html or a subdirectory

3. Configure the environment:
   ```bash
   cp .env.example .env
   ```
   Edit the .env file with your:
   - MySQL credentials
   - Admin email and password
   - JWT secret
   - Cloudinary credentials

4. Install dependencies and run the installer:
   ```bash
   npm install
   npm run install-cpanel
   ```

5. Build the frontend:
   ```bash
   npm run build
   ```

6. Set up Node.js app in cPanel:
   - Go to Setup Node.js App in cPanel
   - Create a new Node.js application
   - Set the following:
     - Node.js version: 18.x or higher
     - Application mode: Production
     - Application root: Your project directory
     - Application URL: Your domain or subdomain
     - Application startup file: server/index.js
     - Start command: npm run server

7. Start the application in cPanel:
   - Click "Run NPM Install"
   - Start the application

## Post-Installation

1. Access the admin panel:
   - Go to yourdomain.com/admin/login
   - Log in with the admin credentials set in .env

2. Start adding fighters and creating fights

## Troubleshooting

- Check the error logs in cPanel
- Ensure all environment variables are set correctly
- Verify database connection settings
- Check Node.js application status in cPanel

## Security Notes

- Change the default admin password immediately after installation
- Keep your .env file secure and outside public access
- Regularly update dependencies
- Monitor error logs for any issues
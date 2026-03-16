# CSE 135 Analytics Backend Project

This project is a analytics backend built for a website. It collects analytics events from a tracked website, stores them in MySQL, and provides a protected backend where authenticated users can view reports and export a PDF summary.

The backend includes:
- authentication with session-based login
- role-based access control
- analytics event collection and storage
- fixed report pages with charts and aggregate tables
- PDF export for reports

## 1. MVC-style app with authentication and navigation
Node.js and Express

- `models/` contains database access logic
- `views/` contains the EJS pages
- `controllers/` contains the route handlers
- `routes/` contains the routes
- `middleware/` contains the authentication

- a login page at `/login`
- a logout route at `/logout`
- protected pages at `/dashboard` and `/reports`

If a user tries to directly browse to `/reports` or `/dashboard` without logging in, they are redirected to `/login`.

## Tech Stack
- Node.js
- Express
- EJS
- express-session
- MySQL
- Chart.js
- PM2
- Nginx reverse proxy

## Repository
- GitHub Repo: https://github.com/scottinp/cse135-site

## Deployed URLs
- Backend Login: https://scottin.info/backend/login
- Reports: https://scottin.info/backend/reports
- Test Website: https://test.scottin.info/

## Core Features
### Authentication / Authorization

Roles:
- super_admin
- analyst
- viewer

### Analytics
The tracked website includes the collector script on all main pages sending analytic events into the backend datastore. Event data is stored in the `collector_events` table in MySQL.

### Reports
1. **Interactions**  
   Shows event type counts while excluding `mousemove` noise.

2. **Page Engagement**  
   Shows tracked activity counts by `page_url`.

3. **Exit Distribution**  
   Shows `page_exit` counts by `page_url`.

## 4. Export System
The dashboard includes an export feature that generates a PDF of the current report view, allowing users to save the data visualization locally.


## AI Usage & Observations
For this project, AI was utilized strictly for troubleshooting and environment configuration. It proved valuable for navigating server setups e.g., managing Linux file ownership/permissions, restarting Nginx. Using it as a debugging assistant saved time, allowing us to focus on the core MVC architecture, authentication logic, and data visualization.

## Future Roadmap
If time permitted, or for future iterations, we would like to:
- Expand dynamic filtering (by date range or specific `event_type`) on visualizations.
- Collect different types of data
- Add robust `<noscript>` handling to gracefully degrade the UI for users navigating with JavaScript disabled.


## Grader Credentials
Here are the accounts to test the three distinct authorization levels.

**1. Super Admin (Full Access)**
- Username: `superadmin`
- Password: `superpass123`

**2. Analyst (Report Access)**
- Username: `analyst1`
- Password: `analystpass123`

**3. Viewer (Read-Only Reports)**
- Username: `viewer1`
- Password: `viewerpass123`


### Basic Login / Access Flow
1. Go to the login page: `https://scottin.info/backend/login`
2. Log in as **superadmin** using the credentials above.
3. Confirm that the dashboard loads correctly.
4. Visit the reports page: `https://scottin.info/backend/reports`

### Report Testing
5. On `/backend/reports`, confirm the **Intentional Interactions** report loads:

6. Visit `https://scottin.info/backend/reports/pages`
   - this is the **Page Engagement** report

7. Visit `https://scottin.info/backend/reports/exits`
   - this is the **Exit Distribution** report

### Export Testing
8. Return to `/backend/reports`
9. Click **Export PDF**
10. Confirm that a PDF is generated and opens successfully

### Role Testing
11. Log out
12. Log back in as **analyst1**
13. Confirm analyst access works for dashboard and reports

14. Log out
15. Log back in as **viewer1**
16. Confirm viewer can access the reports pages and export, but does not have elevated administrative functionality

## Known Bugs & Architecture Concerns

### 1. PDF export is basic
The PDF export works, but is not a polished formatted report generator and does not yet mirror the full styled HTML presentation of the report pages.

### 2. Reports are fixed
The reporting system uses three fixed report categories rather than a flexible report builder:
- Intentional Interactions
- Page Engagement
- Exit Distribution

### 3. Dataset is limited
The current analytics data comes from testing on a limited set of tracked pages, so some results may be skewed toward the homepage or whichever pages were tested most often. The reports are functional, but the dataset is still relatively small.

### 4. Simple role/account system
Authentication and authorization are intentionally lightweight.


## Notes for Grading
The core project flow should work end-to-end:
- login
- protected backend access
- role-based access behavior
- collector-backed analytics data
- report viewing
- PDF export


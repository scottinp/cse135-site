# CSE 135 – Homework 1

## Team Members
- **Scottin Pham**
- **Tri**

### Grader Account
- **Username:** `grader`
- **Password:** `grader123`

SSH keys are not used for the grader account.

## Website Links

- **Websites:**  
  https://scottin.info
  https://reporting.scottin.info
  https://collector.scottin.info

## GitHub Auto-Deploy Setup

### Repository Structure
- **Source repository:**  
  `~/site-src`
- **Bare deployment repository:**  
  `/var/repo/cse135-site.git`
- **Live site directory:**  
  `/var/www/yourdomain.site/public_html`

### Deployment Flow
1. Changes are made in each user's `~/site-src`
'~/home/scottin/site-src/`
2. Code is committed locally
3. Code is pushed to GitHub (`origin`)
4. Code is pushed to the production remote (`prod`)
5. When code pushed to the prod, the server updates website by copying the latest version of the files into the Apache directory

# CSE 135 – Homework 1

## Team Members
- **Scottin Pham**
- **Tri Nguyen**

### Grader Account
- **Username:** `grader`
- **Password:** `grader123`

SSH keys are not used for the grader account.

## Website Links

- **Websites:**  
  https://scottin.info
  https://reporting.scottin.info
  https://collector.scottin.info

## Site Authentication
- **Protected Area:** https://scottin.info
- **Username:** `cse135`
- **Password:** `$scottinP`

## GitHub Auto-Deploy Setup

### Repository Structure
- **Source repository:**  
  `~/site-src`
- **Bare deployment repository:**  
  `/var/repo/cse135-site.git`
- **Live site directory:**  
  `/var/www/scottin.info/public_html`

### Deployment Flow
1. Changes are made in each user's `~/site-src`
2. Code is committed locally
3. Code is pushed to GitHub (`origin`)
4. Code is pushed to the production remote (`prod`)
5. When code pushed to the prod, the server updates website by copying the latest version of the files into the Apache directory

## Text Compression Summary

After enabling text compression, the HTML file is served with gzip compression. In Chrome DevTools, the Network tab shows that the response header is `Content-Encoding: gzip`, and the  size of the HTML file is smaller than its size.

## Server Header Obfuscation 

To change the `Server` response header, Nginx was placed in front of Apache as a reverse proxy, so it forwards requests to Apache. At first, the site showed an old page because Apache still had HTTPS redirect rules from a previous setup, which caused conflicts. After removing those redirect rules and letting Nginx handle HTTPS by itself, the site loaded correctly again. The response header was updated to `Server: CSE135 Server`.

# node-oauth-proxy

Simple example of proxy server at Node.js with pre-authorisation like Cloudflare Access

## Stack

- Node.js
- Passport.js
- Express.js
- TypeScript

# Configuration by environment or docker variables

```shell
# URL - local url of service
# PORT - local port of service
# PUBLIC_URL - public url that will be used for redirect by OAuth
# TARGET - url for endpoint that will be proxied
URL="localhost"
PORT="8080"
PUBLIC_URL="domain.name"
TARGET="http://127.0.0.1:9000"

# Name, time of life in ms, secret to sign for cookie that will respond for session
SESSION_COOKIE
SESSION_MAX_AGE
SESSION_SECRET

# Client ID and Client Secret for Google OAuth
# Link to Google Cloud Plaftorm - https://console.developers.google.com/
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# Lists of users that can be applied or declined by auth
# separate emails by ;
# empty ALLOWED_USERS means that all users that in not BLOCKED_USERS will be accepted
# empty BLOCKED_USERS means that no users will be blocked
ALLOWED_USERS="user1@mail.com;some@mail.com"
BLOCKED_USERS="user2@mail.com;nosome@mail.com"
```

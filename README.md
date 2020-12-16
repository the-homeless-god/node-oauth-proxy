# node-oauth-proxy

Simple example of proxy server at Node.js with pre-authorisation like Cloudflare Access

## Stack

- Node.js
- Passport.js
- Express.js
- TypeScript

# Configuration by environment or docker variables

```shell
# Url and port for your proxy-server, can be simply 'localhost'
URL
PORT

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
ALLOWED_USERS="user2@mail.com;nosome@mail.com"
BLOCKED_USERS="user2@mail.com;nosome@mail.com"

# Endpoint that will be proxied
TARGET="http://127.0.0.1:9000"
```

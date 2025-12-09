## REST API for premium project

## BASE_URL=https://rest-api-for-premium.onrender.com

1. **User Signup**

   - **Endpoint:** `POST /users/loginOrSignup`
   - **Description:** Register a new user or login user.
   - **Request Body:**
     ```json
     { "userId": "string" }
     ```
   - **Response:**
     {
     "message": "...",
     "user": {
     "\_id": "...",
     "userId": "...",
     "premium": boolean,
     "premiumExpires": null or "...",
     "createdAt": "...",
     "updatedAt": "..."
     }
     }.

2. **User UpdatePremium**

   - **Endpoint:** `POST /users/updatePremium`
   - **Description:** Update user`s premium for 30 days.
   - **Request Body:**
     ```json
     { "userId": "string" }
     ```
   - **Response:**
     {
     "exists": boolean,
     "premium": boolean,
     "premiumExpires": null or "...",
     }.

3. **User CheckPremium**

   - **Endpoint:** `GET /users/checkPremium`
   - **Description:** Check user`s premium.
   - **Request query:**
     ```json
     { "userId": "string" }
     ```
   - **Response:**
     {
     "exists": boolean,
     "premium": boolean,
     "premiumExpires": null or "...",
     }.

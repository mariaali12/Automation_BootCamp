# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user.spec.js >> User API CRUD Test
- Location: tests\user.spec.js:12:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL = 'https://api-testing-postman.vercel.app/api/v1/users';
  4   | 
  5   | // Use the REAL user credentials from your API/Postman.
  6   | const userData = {
  7   |   email: 'YOUR_REAL_EMAIL',
  8   |   username: 'YOUR_REAL_USERNAME',
  9   |   password: 'YOUR_REAL_PASSWORD'
  10  | };
  11  | 
  12  | test('User API CRUD Test', async ({ request }) => {
  13  | 
  14  |   // =========================================================
  15  |   // 1. LOGIN
  16  |   // =========================================================
  17  | 
  18  |   const loginResponse = await request.post(
  19  |     `${BASE_URL}/login`,
  20  |     {
  21  |       data: userData
  22  |     }
  23  |   );
  24  | 
  25  |   console.log('LOGIN STATUS:', loginResponse.status());
  26  | 
  27  |   const loginBody = await loginResponse.text();
  28  |   console.log('LOGIN RESPONSE:', loginBody);
  29  | 
> 30  |   expect(loginResponse.status()).toBe(200);
      |                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  31  | 
  32  |   const loginData = JSON.parse(loginBody);
  33  | 
  34  |   // Get token
  35  |   const token = loginData.token;
  36  | 
  37  |   expect(token).toBeTruthy();
  38  | 
  39  |   console.log('TOKEN RECEIVED:', !!token);
  40  | 
  41  | 
  42  |   // =========================================================
  43  |   // AUTHORIZATION HEADER
  44  |   // =========================================================
  45  | 
  46  |   const headers = {
  47  |     Authorization: `Bearer ${token}`,
  48  |     'Content-Type': 'application/json'
  49  |   };
  50  | 
  51  | 
  52  |   // =========================================================
  53  |   // 2. GET CURRENT USER
  54  |   // =========================================================
  55  | 
  56  |   const getUserResponse = await request.get(
  57  |     `${BASE_URL}/current-user`,
  58  |     {
  59  |       headers
  60  |     }
  61  |   );
  62  | 
  63  |   console.log('GET USER STATUS:', getUserResponse.status());
  64  | 
  65  |   const getUserBody = await getUserResponse.text();
  66  |   console.log('CURRENT USER:', getUserBody);
  67  | 
  68  |   expect(getUserResponse.status()).toBe(200);
  69  | 
  70  |   const originalUser = JSON.parse(getUserBody);
  71  | 
  72  |   console.log('Original User:', originalUser);
  73  | 
  74  | 
  75  |   // =========================================================
  76  |   // 3. UPDATE USER
  77  |   // =========================================================
  78  |   //
  79  |   // IMPORTANT:
  80  |   // Replace this URL with the ACTUAL PUT endpoint
  81  |   // from your Swagger documentation.
  82  |   //
  83  |   // =========================================================
  84  | 
  85  |   const updatedUsername = 'Maria_updated';
  86  | 
  87  |   const updateUserResponse = await request.put(
  88  |     'PUT_ENDPOINT_FROM_SWAGGER',
  89  |     {
  90  |       headers,
  91  |       data: {
  92  |         username: updatedUsername
  93  |       }
  94  |     }
  95  |   );
  96  | 
  97  |   console.log('PUT STATUS:', updateUserResponse.status());
  98  | 
  99  |   const updateBody = await updateUserResponse.text();
  100 |   console.log('PUT RESPONSE:', updateBody);
  101 | 
  102 |   expect(updateUserResponse.status()).toBe(200);
  103 | 
  104 | 
  105 |   // =========================================================
  106 |   // 4. GET USER AFTER UPDATE
  107 |   // =========================================================
  108 | 
  109 |   const getAfterUpdateResponse = await request.get(
  110 |     `${BASE_URL}/current-user`,
  111 |     {
  112 |       headers
  113 |     }
  114 |   );
  115 | 
  116 |   console.log(
  117 |     'GET AFTER UPDATE STATUS:',
  118 |     getAfterUpdateResponse.status()
  119 |   );
  120 | 
  121 |   const getAfterUpdateBody = await getAfterUpdateResponse.text();
  122 | 
  123 |   console.log(
  124 |     'USER AFTER UPDATE:',
  125 |     getAfterUpdateBody
  126 |   );
  127 | 
  128 |   expect(getAfterUpdateResponse.status()).toBe(200);
  129 | 
  130 |   const updatedUser = JSON.parse(getAfterUpdateBody);
```
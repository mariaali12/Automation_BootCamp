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
  3   | const BASE_URL =
  4   |   'https://api-testing-postman.vercel.app/api/v1/users';
  5   | 
  6   | const userData = {
  7   |   email: 'mariaalimurtaz123@gmail.com',
  8   |   username: 'maria_ali123',
  9   |   password: 'maria123'
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
  28  | 
  29  |   console.log('LOGIN RESPONSE:', loginBody);
  30  | 
> 31  |   expect(loginResponse.status()).toBe(200);
      |                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  32  | 
  33  |   const loginData = JSON.parse(loginBody);
  34  | 
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
  63  |   console.log(
  64  |     'GET USER STATUS:',
  65  |     getUserResponse.status()
  66  |   );
  67  | 
  68  |   const getUserBody = await getUserResponse.text();
  69  | 
  70  |   console.log(
  71  |     'CURRENT USER:',
  72  |     getUserBody
  73  |   );
  74  | 
  75  |   expect(getUserResponse.status()).toBe(200);
  76  | 
  77  |   const originalUser = JSON.parse(getUserBody);
  78  | 
  79  |   console.log(
  80  |     'Original User:',
  81  |     originalUser
  82  |   );
  83  | 
  84  | 
  85  |   // =========================================================
  86  |   // 3. UPDATE USER
  87  |   // PUT /users/replace-account
  88  |   // =========================================================
  89  | 
  90  |   const updatedUsername = 'Maria_updated';
  91  | 
  92  |   const updateUserResponse = await request.put(
  93  |     `${BASE_URL}/replace-account`,
  94  |     {
  95  |       headers,
  96  |       data: {
  97  |         email: userData.email,
  98  |         username: updatedUsername,
  99  |         password: userData.password
  100 |       }
  101 |     }
  102 |   );
  103 | 
  104 |   console.log(
  105 |     'PUT STATUS:',
  106 |     updateUserResponse.status()
  107 |   );
  108 | 
  109 |   const updateBody = await updateUserResponse.text();
  110 | 
  111 |   console.log(
  112 |     'PUT RESPONSE:',
  113 |     updateBody
  114 |   );
  115 | 
  116 |   expect(updateUserResponse.status()).toBe(200);
  117 | 
  118 | 
  119 |   // =========================================================
  120 |   // 4. GET USER AFTER UPDATE
  121 |   // =========================================================
  122 | 
  123 |   const getAfterUpdateResponse = await request.get(
  124 |     `${BASE_URL}/current-user`,
  125 |     {
  126 |       headers
  127 |     }
  128 |   );
  129 | 
  130 |   console.log(
  131 |     'GET AFTER UPDATE STATUS:',
```
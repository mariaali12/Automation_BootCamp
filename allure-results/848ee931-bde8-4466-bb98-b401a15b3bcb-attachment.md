# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user.spec.js >> User API CRUD Test
- Location: tests\user.spec.js:5:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 400
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL = 'https://api-testing-postman.vercel.app/api/v1';
  4   | 
  5   | test('User API CRUD Test', async ({ request }) => {
  6   | 
  7   |   // ==========================================
  8   |   // 1. REGISTER NEW USER
  9   |   // ==========================================
  10  | 
  11  |   const timestamp = Date.now();
  12  | 
  13  |   const userData = {
  14  |     email: `maria${timestamp}@gmail.com`,
  15  |     username: `maria_${timestamp}`,
  16  |     password: 'maria123'
  17  |   };
  18  | 
  19  |   const registerResponse = await request.post(
  20  |     `${BASE_URL}/users/register`,
  21  |     {
  22  |       data: userData
  23  |     }
  24  |   );
  25  | 
  26  |   console.log('REGISTER STATUS:', registerResponse.status());
  27  | 
  28  |   const registerBody = await registerResponse.text();
  29  | 
  30  |   console.log('REGISTER RESPONSE:', registerBody);
  31  | 
> 32  |   expect(registerResponse.status()).toBe(201);
      |                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  33  | 
  34  | 
  35  |   // ==========================================
  36  |   // 2. LOGIN
  37  |   // ==========================================
  38  | 
  39  |   const loginResponse = await request.post(
  40  |     `${BASE_URL}/users/login`,
  41  |     {
  42  |       data: userData
  43  |     }
  44  |   );
  45  | 
  46  |   console.log('LOGIN STATUS:', loginResponse.status());
  47  | 
  48  |   const loginBody = await loginResponse.text();
  49  | 
  50  |   console.log('LOGIN RESPONSE:', loginBody);
  51  | 
  52  |   expect(loginResponse.status()).toBe(200);
  53  | 
  54  |   const loginData = JSON.parse(loginBody);
  55  | 
  56  |   console.log('LOGIN DATA:', loginData);
  57  | 
  58  |   const token = loginData.token;
  59  | 
  60  |   expect(token).toBeTruthy();
  61  | 
  62  | 
  63  |   // ==========================================
  64  |   // 3. AUTHORIZATION
  65  |   // ==========================================
  66  | 
  67  |   const headers = {
  68  |     Authorization: `Bearer ${token}`
  69  |   };
  70  | 
  71  | 
  72  |   // ==========================================
  73  |   // 4. GET CURRENT USER
  74  |   // ==========================================
  75  | 
  76  |   const GETResponse = await request.get(
  77  |     `${BASE_URL}/users/current-user`,
  78  |     {
  79  |       headers
  80  |     }
  81  |   );
  82  | 
  83  |   console.log('GET STATUS:', GETResponse.status());
  84  | 
  85  |   expect(GETResponse.status()).toBe(200);
  86  | 
  87  |   const user = await GETResponse.json();
  88  | 
  89  |   console.log('ORIGINAL USER:', user);
  90  | 
  91  | 
  92  |   // ==========================================
  93  |   // 5. PUT / REPLACE ACCOUNT
  94  |   // ==========================================
  95  | 
  96  |   const PUTResponse = await request.put(
  97  |     `${BASE_URL}/users/replace-account`,
  98  |     {
  99  |       headers,
  100 |       data: {
  101 |         username: `updated_${timestamp}`,
  102 |         email: userData.email,
  103 |         password: userData.password
  104 |       }
  105 |     }
  106 |   );
  107 | 
  108 |   console.log('PUT STATUS:', PUTResponse.status());
  109 | 
  110 |   const putBody = await PUTResponse.text();
  111 | 
  112 |   console.log('PUT RESPONSE:', putBody);
  113 | 
  114 |   expect(PUTResponse.status()).toBe(200);
  115 | 
  116 | 
  117 |   // ==========================================
  118 |   // 6. GET AFTER PUT
  119 |   // ==========================================
  120 | 
  121 |   const GETAfterPut = await request.get(
  122 |     `${BASE_URL}/users/current-user`,
  123 |     {
  124 |       headers
  125 |     }
  126 |   );
  127 | 
  128 |   console.log('GET AFTER PUT STATUS:', GETAfterPut.status());
  129 | 
  130 |   expect(GETAfterPut.status()).toBe(200);
  131 | 
  132 |   const updatedUser = await GETAfterPut.json();
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user.spec.js >> User API CRUD Test
- Location: tests\user.spec.js:9:5

# Error details

```
TypeError: apiRequestContext.put: Invalid URL
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   |  
  3   | const data = {
  4   |   email: "mariaalimurtaz123@gmail.com",
  5   |   username: "mariaali2",
  6   |   password: "mariaali123"
  7   | };
  8   |  
  9   | test('User API CRUD Test', async ({ request }) => {
  10  |  
  11  |   // ==========================================
  12  |   // 1. LOGIN
  13  |   // ==========================================
  14  |  
  15  |   const loginResponse = await request.post(
  16  |     'https://api-testing-postman.vercel.app/api/v1/users/login',
  17  |     {
  18  |       data
  19  |     }
  20  |   );
  21  |  
  22  |   expect(loginResponse.status()).toBe(200);
  23  |  
  24  |   const tokenData = await loginResponse.json();
  25  |  
  26  |   console.log('Login:', tokenData);
  27  |  
  28  |   const token = tokenData.token;
  29  |  
  30  |  
  31  |   // ==========================================
  32  |   // 2. AUTHORIZATION HEADER
  33  |   // ==========================================
  34  |  
  35  |   const headers = {
  36  |     Authorization: `Bearer ${token}`
  37  |   };
  38  |  
  39  |  
  40  |   // ==========================================
  41  |   // 3. GET USER
  42  |   // ==========================================
  43  |  
  44  |   const GETResponse = await request.get(
  45  |     'https://api-testing-postman.vercel.app/api/v1/users/current-user',
  46  |     {
  47  |       headers
  48  |     }
  49  |   );
  50  |  
  51  |   expect(GETResponse.status()).toBe(200);
  52  |  
  53  |   const user = await GETResponse.json();
  54  |  
  55  |   console.log('Original User:', user);
  56  |  
  57  |  
  58  |   // ==========================================
  59  |   // 4. PUT / UPDATE USER
  60  |   // ==========================================
  61  |  
> 62  |   const PUTResponse = await request.put(
      |                                     ^ TypeError: apiRequestContext.put: Invalid URL
  63  |     'PUT_URL_FROM_SWAGGER',
  64  |     {
  65  |       headers,
  66  |       data: {
  67  |         username: 'john_updated'
  68  |       }
  69  |     }
  70  |   );
  71  |  
  72  |   console.log('PUT Status:', PUTResponse.status());
  73  |  
  74  |   expect(PUTResponse.status()).toBe(200);
  75  |  
  76  |  
  77  |   // ==========================================
  78  |   // 5. GET AFTER PUT
  79  |   // ==========================================
  80  |  
  81  |   const GETAfterPut = await request.get(
  82  |     'https://api-testing-postman.vercel.app/api/v1/users/current-user',
  83  |     {
  84  |       headers
  85  |     }
  86  |   );
  87  |  
  88  |   expect(GETAfterPut.status()).toBe(200);
  89  |  
  90  |   const updatedUser = await GETAfterPut.json();
  91  |  
  92  |   console.log('Updated User:', updatedUser);
  93  |  
  94  |   expect(updatedUser.username).toBe('john_updated');
  95  |  
  96  |  
  97  |   // ==========================================
  98  |   // 6. DELETE USER
  99  |   // ==========================================
  100 |  
  101 |   const DELETEResponse = await request.delete(
  102 |     'DELETE_URL_FROM_SWAGGER',
  103 |     {
  104 |       headers
  105 |     }
  106 |   );
  107 |  
  108 |   console.log('DELETE Status:', DELETEResponse.status());
  109 |  
  110 |   expect(DELETEResponse.status()).toBe(200);
  111 |  
  112 |  
  113 |   // ==========================================
  114 |   // 7. GET AFTER DELETE
  115 |   // ==========================================
  116 |  
  117 |   const GETAfterDelete = await request.get(
  118 |     'https://api-testing-postman.vercel.app/api/v1/users/current-user',
  119 |     {
  120 |       headers
  121 |     }
  122 |   );
  123 |  
  124 |   console.log(
  125 |     'GET After Delete Status:',
  126 |     GETAfterDelete.status()
  127 |   );
  128 |  
  129 |   expect(GETAfterDelete.status()).toBe(404);
  130 |  
  131 | });
  132 | 
  133 |  
```
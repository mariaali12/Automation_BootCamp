import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api-testing-postman.vercel.app/api/v1/users';

const userData = {
  email: 'mariaalimurtaz123@gmail.com',
  username: 'mariaali2',
  password: 'mariaali123'
};

test('User API CRUD Test', async ({ request }) => {

  // ==========================================
  // 1. LOGIN
  // ==========================================

  const loginResponse = await request.post(
    `${BASE_URL}/login`,
    {
      data: userData
    }
  );

  console.log('LOGIN STATUS:', loginResponse.status());

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  console.log('LOGIN RESPONSE:', loginBody);

  // accessToken is inside data
  const token = loginBody.data.accessToken;

  expect(token).toBeTruthy();


  // ==========================================
  // 2. AUTHORIZATION HEADER
  // ==========================================

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };


  // ==========================================
  // 3. GET CURRENT USER
  // ==========================================

  const getResponse = await request.get(
    `${BASE_URL}/current-user`,
    {
      headers
    }
  );

  console.log('GET STATUS:', getResponse.status());

  expect(getResponse.status()).toBe(200);

  const userBody = await getResponse.json();

  console.log('CURRENT USER:', userBody);


  // ==========================================
  // 4. PUT / REPLACE ACCOUNT
  // ==========================================

  const putResponse = await request.put(
    `${BASE_URL}/replace-account`,
    {
      headers,
      data: {
        username: 'john_updated',
        email: userData.email,
        fullname: 'mariaali updated'
      }
    }
  );

  console.log('PUT STATUS:', putResponse.status());

  const putBody = await putResponse.text();

  console.log('PUT RESPONSE:', putBody);

  expect(putResponse.status()).toBe(200);


  // ==========================================
  // 5. GET AFTER PUT
  // ==========================================

  const getAfterPutResponse = await request.get(
    `${BASE_URL}/current-user`,
    {
      headers
    }
  );

  console.log(
    'GET AFTER PUT STATUS:',
    getAfterPutResponse.status()
  );

  expect(getAfterPutResponse.status()).toBe(200);

  const updatedUserBody = await getAfterPutResponse.json();

  console.log('UPDATED USER:', updatedUserBody);

  expect(updatedUserBody.data.username).toBe('john_updated');

});
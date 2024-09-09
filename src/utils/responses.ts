
export const BASE_URL = "https://norma.nomoreparties.space/api/";
// Function to check the HTTP response
const checkResponse = (res: Response): Promise<any> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка ${res.status}`));
};


const checkSuccess = <T>(res: T & { success: boolean }): Promise<T> => {
  if (res && res.success) {
    return Promise.resolve(res);
  }
  return Promise.reject(new Error(`Ответ не success: ${JSON.stringify(res)}`));
};

// Generic request function
export const request = <T>(endpoint: string, options: object): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};


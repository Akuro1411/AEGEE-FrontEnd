const URL='https://aegeeapp2-eabxfecshjbacmau.westeurope-01.azurewebsites.net'

export const API_ENDPOINTS = {
  AUTH: {
   REGISTER: `${URL}/api/v1/auth/register`,
   LOGIN: `${URL}/api/v1/auth/login`,
  },
  PROFILE: {
    GETUSER: `${URL}/api/v1/user-profile`,
    CHANGEUSER: `${URL}/api/v1/user-profile`,
    CHANGEPASSWORD: `${URL}/api/v1/user-profile/change-password`
  }
}
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  LANGUAGE: 'language'
};
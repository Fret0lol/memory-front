import { defineStore } from 'pinia';
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    authToken: null
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', { email, password })
        console.log(response)
        if (response.status == 200) {
          this.isAuthenticated = true;
          this.authToken = response.data.token;
          return true
        } else {
          this.isAuthenticated = false;
        }
      } catch (error) {
        console.error('Erreur lors de la connexion ', error);
      }
      return false
    },
    logout() {
      this.isAuthenticated = false;
      this.authToken = null;
    },
  },
});

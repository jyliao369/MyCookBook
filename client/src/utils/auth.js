import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    try {
      const auth = decode(this.getToken())
      return auth;
    } catch (e) {
      console.error(e);
    } return {};
  }

  loggedIn() {
    try {
      const token = this.getToken();
      return token && !this.isTokenExpired(token) ? true : false;
    } catch (e) {
      console.error(e);
    } return false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();

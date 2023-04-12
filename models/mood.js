import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

class Mood {
  static all() {
    return axios.get(`${BASE_URL}/moods`, { withCredentials: true });
  }

  static create(data) {
    return axios.post(`${BASE_URL}/moods`, data, { withCredentials: true });
  }

  static update(id, data) {
    return axios.put(`${BASE_URL}/moods/${id}`, data, { withCredentials: true });
  }

  static delete(id) {
    return axios.delete(`${BASE_URL}/moods/${id}`, { withCredentials: true });
  }
}

export default Mood;

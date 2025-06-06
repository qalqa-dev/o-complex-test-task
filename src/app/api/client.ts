const API_URL = process.env.API_URL || 'http://o-complex.com:1337/';

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  },
};

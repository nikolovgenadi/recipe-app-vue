import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchRecipes(query: string) {
  const res = await axios.get(`${API_BASE}search.php?s=${query}`);
  return res.data.meals;
}

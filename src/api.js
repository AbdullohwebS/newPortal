import axios from 'axios';

const API_ROOT = 'https://json-api.uz/api/project/fn37-exam';

const client = axios.create({
  baseURL: API_ROOT,
});

// Fetch articles with optional pagination & category
export async function getArticles({ skip = 0, limit = 10, category } = {}) {
  const params = { skip, limit };
  if (category) params.category = category;
  const { data } = await client.get('/news', { params });
  return data;
}

// Fetch single article by ID
export async function getArticleById(id) {
  const { data } = await client.get(`/news/${id}`);
  return data;
}

// Create a new article (auth required)
export async function createArticle(article, token) {
  const { data } = await client.post('/news', article, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
}

// Delete an article (auth required)
export async function deleteArticle(id, token) {
  const { data } = await client.delete(`/news/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data;
}

// Upload image file
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await client.post('/upload', formData);
  return data;
}

import { useState } from 'react';
import { uploadFile } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function ArticleForm({ onSubmit }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let image;
    try {
      if (imageFile) {
        const up = await uploadFile(imageFile);
        image = up.path || up.url || up.location;
      }
      await onSubmit({ title, text, category, image });
      setTitle('');
      setText('');
      setCategory('');
      setImageFile(null);
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 space-y-3 mt-6">
      <h3 className="font-semibold text-lg">Add Article</h3>
      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Text"
        className="w-full border p-2 rounded"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        className="w-full border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving…' : 'Create'}
      </button>
    </form>
  );
}

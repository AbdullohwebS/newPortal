import { useEffect, useState } from 'react';
import { getArticles, deleteArticle, createArticle } from '../api';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';
import ArticleForm from '../components/ArticleForm';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState();
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchArticles();
  }, [skip, category]);

  async function fetchArticles() {
    const res = await getArticles({ skip, limit, category });
    const list = res.data ?? res;
    setArticles(list);
    setTotal(res.total ?? list.length);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this article?')) return;
    await deleteArticle(id, user?.token);
    fetchArticles();
  }

  async function handleCreate(newArticle) {
    await createArticle(newArticle, user?.token);
    fetchArticles();
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = skip / limit + 1;

  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];

  function openDetails(article) {
    alert(article.text ?? 'No details');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={(val) => {
            setCategory(val);
            setSkip(0);
          }}
        />
        <div>{total} articles</div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            onDelete={handleDelete}
            onOpen={openDetails}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setSkip((p - 1) * limit)}
      />

      {user && <ArticleForm onSubmit={handleCreate} />}
    </div>
  );
}

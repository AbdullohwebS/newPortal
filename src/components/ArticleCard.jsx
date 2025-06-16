import { useAuth } from '../contexts/AuthContext';

export default function ArticleCard({ article, onDelete, onOpen }) {
  const { user } = useAuth();
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="h-40 w-full object-cover rounded"
        />
      )}
      <h3 className="text-lg font-semibold mt-2 flex-1">{article.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{article.category}</p>
      <div className="mt-auto flex justify-between items-center">
        <button onClick={() => onOpen(article)} className="text-blue-600">
          Read more
        </button>
        {user && (
          <button onClick={() => onDelete(article._id)} className="text-red-600">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

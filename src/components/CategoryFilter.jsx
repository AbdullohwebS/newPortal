export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <select
      value={selected || ''}
      onChange={(e) => onChange(e.target.value || undefined)}
      className="border p-2 rounded"
    >
      <option value="">All categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}

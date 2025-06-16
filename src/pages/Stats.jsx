import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { getArticles } from '../api'

// Chart ranglari
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57']

export default function Stats() {
  const [data, setData] = useState([])

  // Maʼlumotlarni yuklash
  useEffect(() => {
    ; (async () => {
      const res = await getArticles({ skip: 0, limit: 1000 })
      const list = res.data ?? res                 // API turiga qarab moslash
      const counts = list.reduce((acc, cur) => {
        const key = cur.category || 'Unknown'
        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {})
      setData(
        Object.entries(counts).map(([name, value]) => ({
          name,
          value,
        }))
      )
    })()
  }, [])

  if (!data.length) return <p className="text-center">Loading…</p>

  return (
    <div className="flex justify-center">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../redux/actions/leaderBoardActions.js';
import { Link } from 'react-router-dom';

export default function LeaderBoard({ limit = 5 }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.leaderboard);
  const numericLimit = Number(limit);
  
  useEffect(() => {
    dispatch(fetchLeaderboard(limit));
  }, [dispatch, limit]);

  if (loading) return <p>Carregando ranking...</p>;
  if (error) return <p>Erro ao carregar ranking: {error}</p>;
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-blue-600">
            <th className="p-2 border">Posição</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Localidade</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(data) ? data : []).map((user, index) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.location}</td>
              <td className="p-2 border">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {numericLimit<6 ? (
        <div className="mt-4">
          <Link to="/leaderboard" className="text-blue-600 hover:underline">
            Ver ranking completo
          </Link>
        </div>
      ): ''}
    </div>
  );
}

import LeaderBoard from '../components/LeaderBoard';

export default function LeaderboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ranking</h1>
      <LeaderBoard limit={1000} />
    </div>
  );
}
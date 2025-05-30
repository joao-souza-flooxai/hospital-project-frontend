import LeaderBoard from '../components/LeaderBoard';

export default function LeaderboardPage() {
  return (
    <div className="p-6">
      <LeaderBoard limit={1000} />
    </div>
  );
}
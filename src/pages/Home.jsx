import PositionFetcher from '../components/PositionFetcher'
import LeaderBoard from '../components/LeaderBoard'
import Collapse from '../components/Collapse'

export default function Home() {
  return (
    <div className="p-6">
      <Collapse title="Trabalhos Voluntários Disponíveis">
        <PositionFetcher />
      </Collapse>
      <Collapse title="LeaderBoard">
        <LeaderBoard limit={5} />
      </Collapse>
    </div>
  )
}

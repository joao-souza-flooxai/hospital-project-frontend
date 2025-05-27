import PositionList from "../components/PositionList"
import LeaderBoard from "../components/LeaderBoard"

export default function Home() {
  return (
    <>
      <PositionList title="Trabalhos Voluntários Disponíveis" />
      <LeaderBoard limit={5} />
    </>
  )
}
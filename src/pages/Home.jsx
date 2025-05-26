import PositionList from "../components/PositionList"
import LeaderBoard from "../components/LeaderBoard"

export default function Home() {
  return (
    <>
      <PositionList />
      <LeaderBoard limit={5} />
    </>
  )
}
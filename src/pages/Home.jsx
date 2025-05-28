import PositionList from "../components/PositionList"
import LeaderBoard from "../components/LeaderBoard"
import Collapse from "../components/Collapse"
export default function Home() {
  return (
    <div className="p-6">
      <Collapse title="Trabalhos Voluntários Disponíveis">
              <PositionList/>
      </Collapse>
      <Collapse title="Gerenciar Aplicações">
            <LeaderBoard limit={5} />
      </Collapse>
        
    </div>
  )
}
import PositionList from '../components/PositionList'
import ManageApplications from '../components/ManageApplications'
import Collapse from '../components/Collapse'

export default function DashboardAdmin() {
  return (
    <div className="p-6">
      <Collapse title="Vagas Abertas do seu Hospital">
        <PositionList isAdmin={true} />
      </Collapse>

      <Collapse title="Gerenciar Aplicações">
        <ManageApplications />
      </Collapse>
    </div>
  )
}

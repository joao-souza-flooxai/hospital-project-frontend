import PositionFetcher from '../components/PositionFetcher'
import ManageApplications from '../components/ManageApplications'
import Collapse from '../components/Collapse'

export default function DashboardAdmin() {
  return (
    <div className="p-6">
      <PositionFetcher isAdmin={true} />
      <Collapse title="Gerenciar Aplicações" isItToBeOpen={false}>
        <ManageApplications />
      </Collapse>
    </div>
  )
}

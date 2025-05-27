import PositionList from "../components/PositionList";
import ManageApplications from "../components/ManageApplications";

export default function DashboardAdmin() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard do Admin</h1>
      <p className="mt-2">Aqui você gerencia as posições do seu hospital.</p>
      <PositionList title="Vagas Abertas do seu Hospital" isAdmin={true}/>
      <ManageApplications/>
    </div>
  )
}

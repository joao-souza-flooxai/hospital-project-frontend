import ManagePositions from "../components/ManagePositions";
import PositionsToApprove from "../components/PostionsToApprove";

export default function DashboardAdmin() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard do Admin</h1>
      <p className="mt-2">Aqui você gerencia as posições do seu hospital.</p>
      <PositionsToApprove/>
      <ManagePositions/>
    </div>
  )
}

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApplicationsAdmin, updateApplicationStatus } from '../redux/actions/adminApplicationsActions'

export default function ManageApplications() {
  const dispatch = useDispatch()
  const { applications, loading, error } = useSelector(state => state.adminApplications)

  useEffect(() => {
    dispatch(fetchApplicationsAdmin())
  }, [dispatch])

  const handleAction = (applicationId, status) => {
    const confirmMsg = status === 'ACTIVE'
      ? 'Deseja aprovar essa aplicação?'
      : 'Deseja reprovar essa aplicação?'

    if (window.confirm(confirmMsg)) {
      dispatch(updateApplicationStatus(applicationId, status))
    }
  }

  if (loading) return <p>Carregando aplicações...</p>
  if (error) return <p className="text-red-500">Erro: {error}</p>

  if (applications.length === 0) {
    return <p>Nenhuma aplicação encontrada para este hospital.</p>
  }

  return (
    <div className="p-4">

      <div className="grid gap-4">
        {applications.map(app => (
          <div key={app.id} className="border rounded shadow p-4 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{app.position.title}</h2>
                <p>{app.position.description}</p>
              </div>
              <span className={`px-2 py-1 rounded text-white ${
                app.status === 'ACTIVE' ? 'bg-green-600' :
                app.status === 'CLOSED' ? 'bg-red-600' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {app.status}
              </span>
            </div>
              
            <div className="mt-4">
              <h2 className="text-xl font-bold">Candidato:</h2>
              <p><strong>Nome:</strong> {app.user.name || "Erro ao carregador o nome."} </p>
              <p><strong>Documento:</strong> {app.user.document || "Erro ao carregador o Documento."}</p>
              <p><strong>Idade:</strong> {app.user.age|| "Erro ao carregador o Idade."}</p>
              <p><strong>Gênero:</strong> {app.user.gender|| "Erro ao carregador o Gênero."}</p>
              <p><strong>Email:</strong> {app.user.email|| "Erro ao carregador o Email."}</p>
              <p><strong>Localidade:</strong> {app.user.location|| "Erro ao carregador o Localidade."}</p>
              <p><strong>Score atual:</strong> {app.user.score|| 0}</p>
            </div>

            {app.status === 'PENDING' && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleAction(app.id, 'ACTIVE')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => handleAction(app.id, 'CLOSED')}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reprovar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

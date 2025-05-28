import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserApplications } from '../redux/actions/applicationActions.js'

export default function MySubscriptions() {
  const dispatch = useDispatch()
  const { applications, loading, error } = useSelector(
    (state) => state.application
  )

  useEffect(() => {
    dispatch(fetchUserApplications())
  }, [dispatch])

  if (loading) return <p className="mt-4">Carregando inscrições...</p>
  if (error)
    return <p className="mt-4 text-red-500">Erro: {error}</p>
  if (!applications.length)
    return <p className="mt-4">Você ainda não se inscreveu em nenhum trabalho voluntário.</p>

  return (
    <div className="mt-10 max-w-3xl w-full">
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="border rounded p-4 flex flex-col md:flex-row justify-between"
          >
            <div>
              <p className="font-medium">
                 <strong>{app.title || 'Título não informado'}</strong>
              </p>
              <p className="text-sm"> {app.hospitalName || 'Hospital não informado'}</p>
              <p className="text-sm"> {app.hospitalLocation || 'Local não informado'}</p>
              <p className="text-sm mt-1">{app.description || 'Descrição não informada'}</p>
            </div>
            <div className="mt-2 md:mt-0 md:text-right">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  app.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : app.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {app.status === 'PENDING' && 'Pendente'}
                {app.status === 'ACTIVE' && 'Aprovado'}
                {app.status === 'CLOSED' && 'Recusado'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

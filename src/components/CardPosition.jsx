import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { applyToPosition } from '../redux/actions/applicationActions'
import { deletePosition } from '../redux/actions/adminPositionsActions'
import { useState } from 'react';
import CreateOrEditPositionModal from './CreateOrEditPositionModal';
import ErrorModal from './ErrorOrSucessModal.jsx';

export default function CardPosition({ position, isAdmin = false }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
  error: applicationError,
  success: applicationSuccess,
} = useSelector((state) => state.application);

const {
  error: adminPositionsError,
  success: adminPositionsSuccess,
} = useSelector((state) => state.adminPositions);


  const handleEdit = () => {
    setIsEditOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditOpen(false)
  }
  const { user } = useSelector((state) => state.auth)

  const handleApply = () => {
    if (!user) {
      navigate('/login')
      return
    }
    if(user.role=='admin'){
       alert("Administradores não podem se candidatar.");
       return;
    }
     
    const confirmApply = window.confirm(
      `Deseja realmente se inscrever para a posição "${position.title}"?`
    )

    if (!confirmApply) return

    dispatch(applyToPosition(position.id))
   
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Deseja realmente remover a posição "${position.title}"?`
    )
    if (confirmDelete) {
      dispatch(deletePosition(position.id))
    }
  }


  return (
    <div className="border rounded shadow hover:shadow-md transition bg-white">
      <div className="flex justify-between items-center bg-blue-600 text-white rounded-t px-4 py-3 font-semibold">
        <h2 className="text-xl">
          {position.title} - {position.spots ? 
                            ` Vagas: ${position.spots}` : 
                              <span className="bg-red-600 px-2 py-0.5 rounded">
                             Vagas encerradas
                              </span>}
        </h2>
        <span className="bg-blue-400 border border-blue-600 px-2 py-0.5 rounded">
          {position.type}
        </span>
      </div>

      <div className="p-4">
       <div className="flex justify-between items-center mt-2">
          <p className="font-medium">
            Hospital: {position?.hospital?.name}
            {!isAdmin && position?.hospital?.location ? `, ${position.hospital.location}` : ''}
          </p>
          {position.finished_at && (
            <p className="text-sm text-gray-600">
              Expira em:{' '}
              {new Date(position.finished_at).toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
              })}
            </p>
          )}
        </div>
        <p className="mb-2 text-gray-700">{position.description || "Sem descrição."}</p>

        {isAdmin && (
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Criado por: <span className="font-medium">{position.admin?.name}</span>
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remover
                </button>
              </div>
            </div>
          )}

          {!isAdmin && (
            <button
              onClick={handleApply}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Inscrever-se
            </button>
          )}

          {<CreateOrEditPositionModal
              isOpen={isEditOpen}
              onClose={handleCloseModal}
              position={position}
            />}

            {(adminPositionsError || applicationError) && (
              <ErrorModal
                title="Falha" 
                message={adminPositionsError || applicationError }
                onClose={() => dispatch(
                 adminPositionsError ?  { type: 'CLEAR_ADMIN_POSITIONS_ERRORS' } :  
                 { type: 'CLEAR_APPLICATION_ERRORS' } 
                )}
              />
            )}

            {(adminPositionsSuccess || applicationSuccess) && (
              <ErrorModal
                title="Sucesso"
                message= {adminPositionsSuccess ? "Operação realizada com sucesso!": "Inscrição realizada! Verfique o menu 'Preferências'."}
                onClose={() => dispatch(
                   adminPositionsSuccess ? { type: 'CLEAR_ADMIN_POSITIONS_SUCCESS' }:
                   { type: 'CLEAR_APPLICATION_SUCCESS' })}
              />
            )}


        </div>
    </div>
  )
}

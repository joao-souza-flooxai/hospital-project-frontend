import UpdatePreferences from '../components/UpdatePreferences'
import MySubscriptions from '../components/MySubscriptions'

export default function Preferences() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Preferências</h1>
      <p className="mt-2">Configurações da sua conta.</p>

      <UpdatePreferences />
      <MySubscriptions />
    </div>
  )
}

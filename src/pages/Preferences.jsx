import UpdatePreferences from '../components/UpdatePreferences'
import MySubscriptions from '../components/MySubscriptions'
import Collapse from '../components/Collapse'
export default function Preferences() {
  return (
    <div className="p-6">
    <Collapse title="Configurações da sua conta.">
        <div className="flex justify-center">
          <UpdatePreferences />
        </div>
      </Collapse>
      
      <Collapse title="Suas Aplicações">
        <div className="flex justify-center">
          <MySubscriptions />
        </div>
      </Collapse>
    </div>

  )
}

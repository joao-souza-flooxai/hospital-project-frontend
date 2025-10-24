import UpdatePreferences from '../components/UpdatePreferences'
import MySubscriptions from '../components/MySubscriptions'
import Collapse from '../components/Collapse'
export default function Preferences({openConfig = false, openApplication = false}) {
  return (
    <div className="p-6">
    <Collapse title="Configurações da sua conta." isItToBeOpen={openConfig}>
        <div className="flex justify-center">
          <UpdatePreferences />
        </div>
      </Collapse>
      
      <Collapse title="Suas Aplicações" isItToBeOpen={openApplication}>
        <div className="flex justify-center" >
          <MySubscriptions />
        </div>
      </Collapse>
    </div>

  )
}

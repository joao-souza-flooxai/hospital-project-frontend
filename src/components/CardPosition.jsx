export default function CardPosition({ position }) {
  return (
    <div className="border rounded shadow hover:shadow-md transition bg-white">
      <div className="flex justify-between items-center bg-blue-600 text-white rounded-t px-4 py-3 font-semibold">
        <h2 className="text-xl">{position.title}</h2>
        <span className="bg-blue-400 border border-blue-600 px-2 py-0.5 rounded">
          {position.type}
        </span>
      </div>

      <div className="p-4">
        <p className="mt-2 font-medium">{position.hospital.name}</p>
        <p className="mt-2">{position.description}</p>
      </div>
    </div>
  )
}
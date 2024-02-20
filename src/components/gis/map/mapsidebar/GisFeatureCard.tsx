import { IoMdEye } from "react-icons/io"
import { TiLocation } from "react-icons/ti";

interface GisFeatureCardProps {
  [key: string]: any;
}
const GisFeatureCard = (props: GisFeatureCardProps) => {
  console.log(props)
  return (
    <div className="border-b border-slate-700 p-5 flex items-start justify-between">
      <div>
        <h1 className="text-lg font-bold text-slate-100">Fid-[10]</h1>
        <p className="text-sm text-slate-200">Feature Description</p>
      </div>
      <div className="flex gap-2">
        <button className="p-1 bg-primary-blue-400 rounded-sm hover:bg-primary-blue-600">
          <IoMdEye size={30} />
        </button>
        <button className="p-1 bg-primary-blue-400 rounded-sm hover:bg-primary-blue-600">
          <TiLocation size={30} />
        </button>
      </div>
    </div>
  )
}

export default GisFeatureCard
import { FetchAttributeWithValuesResponse } from "@/redux/features/gis-data/gisApi";
import { useEffect, useState } from "react"

// utils function for unique color generation 
function generateUniqueHexColors(n: number): string[] {
    const colors: string[] = [];
    const characters: string = '0123456789ABCDEF';

    while (colors.length < n) {
        let color: string = '#';
        for (let i = 0; i < 6; i++) {
            color += characters[Math.floor(Math.random() * 16)];
        }
        if (!colors.includes(color)) {
            colors.push(color);
        }
    }
    return colors;
}


interface MapAttributeLegendsProps {
    attributes: FetchAttributeWithValuesResponse[]
}

const MapAttributeLegends = ({attributes: attributesData}: MapAttributeLegendsProps) => {
    const [attributes, setAttributes] = useState<{ name: string, color: string }[]>([]);

    useEffect(() => {
        if (attributesData && attributesData.length > 0) {
            const colors = generateUniqueHexColors(attributesData.length);
            setAttributes(attributesData.map((att,i) => ({
                name: att.attribute,
                color: colors[i]
            })))
        }
    }, [attributesData])

    const handleChangeAttributeColor = (attributeName: string, newColor: string) => {
        setAttributes(prev => prev.map((att) => {
            if (att.name === attributeName) {
                return {
                    ...att,
                    color: newColor
                }
            }
            return att
        }))
    }
    return (
        <div className='flex flex-col gap-4 bg-white p-5 text-primary-blue-900'>
            <h1 className='font-bold text-xl'>Legends</h1>
            <div className="flex flex-col gap-3">
                {attributes.map((att, i) => (
                    <div key={i} className='flex items-center gap-3'>
                        <input
                            type="color"
                            value={att.color}
                            className='h-[20px] w-[20px] cursor-pointer'
                            onChange={(e) => handleChangeAttributeColor(att.name,e.target.value)}
                        />
                        <span>{att.name}</span>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default MapAttributeLegends
import { ScrollArea } from "@/components/ui/scroll-area";
import { AttributeValue, initAttributeColorConfig } from "@/redux/features/gis-data/gisDataSlice";
import { useAppDispatch } from "@/redux/store";
import { generateUniqueHexColors } from "@/utils/map/uniqueColorsGenerator";
import { useEffect, useState } from "react"


interface Statistics {
    min?: number | null;
    max?: number | null;
    mean?: number | null;
    st_dev?: number | null;
}

interface GisConfigLegendProps {
    attribute: string;
    uniqueValues: string[];
    dataType: string;
    statistics: Statistics
}



const GisConfigLegend = ({ uniqueValues, attribute, dataType, statistics }: GisConfigLegendProps) => {
    // state for attributes
    const [attributes, setAttributes] = useState<{ label?: string; name: string, color: string, min?: number, max?: number }[]>([]);
    const dispatch = useAppDispatch();

    // handle change color for attribute
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

    // handle clip for color config by legend
    const handleClip = () => {
        const newAttributesValueConfigs: AttributeValue = {};
        attributes.forEach((att) => {
            newAttributesValueConfigs[att.name] = {
                attributeName: att.name,
                color: att.color,
                min: att?.min,
                max: att?.max
            };
        })


        dispatch(initAttributeColorConfig({
            attribute,
            values: newAttributesValueConfigs,
            dataType,
        }));

    }

    // generate unique colors for attribute values 
    useEffect(() => {
        if ((attribute && uniqueValues) && uniqueValues.length > 0) {
            if (typeof uniqueValues[0] === "string" || null) {
                const colors = generateUniqueHexColors(uniqueValues.length);
                setAttributes(uniqueValues.map((val, i) => ({
                    name: val,
                    color: colors[i]
                })))
            }
        }
    }, [])


    useEffect(() => {
        if ((attribute && uniqueValues) && uniqueValues.length > 0) {
            const colors = generateUniqueHexColors(4);
            // less than mean-sd, mean-sd to mean, mean to mean+sd, greater than mean+sd
            if (statistics.min && statistics.max && statistics.mean && statistics.st_dev) {
                
                setAttributes([
                    {
                        name: `< ${Math.floor(statistics.mean - statistics.st_dev)}`,
                        color: colors[0],
                        max: Math.floor(statistics.mean - statistics.st_dev),
                        min: Number.MIN_VALUE
                    },
                    {
                        name: `${Math.floor(statistics.mean - statistics.st_dev)} - ${Math.floor(statistics.mean)}`,
                        color: colors[1],
                        max: statistics.mean,
                        min: Math.floor(statistics.mean - statistics.st_dev)
                    },
                    {
                        name: `${statistics.mean} - ${Math.floor(statistics.mean + statistics.st_dev)}`,
                        color: colors[2],
                        max: Math.floor(statistics.mean + statistics.st_dev),
                        min: statistics.mean
                    },
                    {
                        name: `> ${Math.floor(statistics.mean + statistics.st_dev)}`,
                        color: colors[3],
                        max: Number.MAX_VALUE,
                        min: Math.floor(statistics.mean + statistics.st_dev)
                    }
                ])
            }
        }
    }, [attribute])

    return (
        <div className='flex flex-col gap-4 bg-white p-5 text-primary-blue-900'>
            <h1 className='font-bold text-xl'>Legends</h1>
            <button onClick={handleClip} className="p-2 bg-green-500 text-white hover:bg-green-600">Clip</button>
            <ScrollArea className="flex flex-col gap-3 h-fit max-h-[340px]">
                {attributes.map((att, i) => (
                    <div key={i} className='flex items-center gap-3'>
                        <input
                            type="color"
                            value={att.color}
                            className='h-[20px] w-[20px] cursor-pointer'
                            onChange={(e) => handleChangeAttributeColor(att.name, e.target.value)}
                        />
                        <span>{att.name}</span>
                    </div>
                ))}

            </ScrollArea>
        </div>
    )
}

export default GisConfigLegend
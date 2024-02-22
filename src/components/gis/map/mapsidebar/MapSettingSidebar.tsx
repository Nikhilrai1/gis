import { SelectInput } from '@/components/ui/SelectInput';
import { changeColor, changeFill, changeOutline, changeProvider } from '@/redux/features/gis-setting/gisSettingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { gisMapProviders } from '@/utils/mapConstants';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from "react-colorful";


interface MapSettingSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}




const MapSettingSidebar = ({ isOpen }: MapSettingSidebarProps) => {
    const { color, fill, outline } = useAppSelector(state => state.gisSetting);
    const dispatch = useAppDispatch();
    const changeGisColor = (newColor: string) => {
        dispatch(changeColor(newColor))
    }


    return (
        <div className="absolute z-[20] right-0 top-0 h-full flex overflow-hidden ">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="inset-y-0 left-0 z-50 shadow-lg max-w-[450px] min-w-64 p-5 bg-[#03031d]"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={`h-full  flex flex-col gap-5`}>
                            <h1 className='text-xl font-bold text-slate-200 border-b border-slate-800 pb-1'>Map Setting</h1>
                            {/* map provider */}
                            <SelectInput
                                onSelect={(option) => dispatch(changeProvider(option.value))}
                                placeholder='Select Map Provider'
                                defaultValue={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                                options={gisMapProviders}
                                className='text-black'
                            />

                            {/* color for fill or outline */}
                            <div className='flex items-center gap-5 '>
                                <div className='flex items-center gap-2'>
                                    <input name="fill" checked={fill} type="checkbox" className='w-[20px] h-[20px]'
                                        onChange={(e) => dispatch(changeFill(e.target.checked))}
                                    />
                                    <label htmlFor="fill">Fill</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input name="outline" checked={outline} type="checkbox" className='w-[20px] h-[20px]'
                                        onChange={(e) => dispatch(changeOutline(e.target.checked))}
                                    />
                                    <label htmlFor="outline">Outline</label>
                                </div>
                            </div>


                            {/* color change */}
                            <div className='flex flex-col gap-3'>
                                <h1 className='text-lg text-slate-200   border-slate-600'>Change Color</h1>
                                <HexColorPicker
                                    className='mx-auto'
                                    color={color}
                                    onChange={changeGisColor}
                                />
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MapSettingSidebar;

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EmptyFormTemplate = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[url('/world-sketch-layer.png')] h-fit overflow-y-hidden bg-contain  relative text-white flex items-center">
            <img src="/world-sketch.png" className="w-full z-[-99] h-full" />
            <div className="absolute  left-[25%] top-[25%] text-center">
                <p className="font-semibold text-[55px] leading-[76px] text-primary-gray-700 mb-8">
                    Unlock Insights <br /> Swiftly with GIS Forms
                </p>
                <p className="text-primary-gray-200 text-xl font-medium leading-3xl mb-6 ">
                    Effortlessly Craft and Share Online Forms and Surveys,
                    <br /> Then Analyze Real-Time Responses with Data Fields at Your
                    Fingertips
                </p>
                <Button
                    className="bg-blue-500"
                    onClick={() => navigate("/forms/create")}
                >
                    Create Forms
                </Button>
            </div>
        </div>
    );
};

export default EmptyFormTemplate;

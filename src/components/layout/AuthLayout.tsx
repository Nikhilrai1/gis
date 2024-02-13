import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface PropsI {
  children: React.ReactNode;
  title: string;
}

const AuthLayout = ({ title, children }: PropsI) => {
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] w-full flex items-center justify-center  ">
      <div className=" w-full flex items-center justify-center">
        <div className="relative  bg-primary-blue-600 text-white py-8 rounded-md">
          <FaArrowLeft
            onClick={() => {
              navigate("/home");
            }}
            size={20}
            className="absolute top-6 left-8 cursor-pointer hover:text-primary-blue-900 transition-all duration-200 ease-in"
          />

          <img src="/nep-gis-logo.png" className="mx-auto" />
          <p className="text-center text-[32px] leading-3xl mb-16 mt-[-2rem] ">
            {title}
          </p>
          <>{children}</>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

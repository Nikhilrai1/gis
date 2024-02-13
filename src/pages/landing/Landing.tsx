import { TbWorld } from "react-icons/tb";
import { LuWrench } from "react-icons/lu";
import { SlMap } from "react-icons/sl";
import LandingNavbar from "@/components/landing/navbar/LandingNavbar";
import LandingContentCard from "@/components/landing/content/LandingContentCard";
import LandingForm from "@/components/landing/form/LandingForm";

const LandingPage = () => {
  return (
    <main className="relative min-h-screen max-w-[1920px] mx-auto overflow-hidden">
      <LandingNavbar />
      <div className="bg-[url('/hero-image-layer.png')] bg-cover h-[800px] relative text-white flex items-center">
        <img
          src="/hero-image.png"
          className="h-[800px] w-full z-[-99] object-cover"
        />
        <div className="ml-40 absolute">
          <h1 className="font-semibold text-6xl leading-[88px]">NepGIS</h1>
          <p className="font-light text-2xl leading-[33px]">
            Unearthing opportunities, pinpointing prosperity.
          </p>
        </div>
      </div>
      <div
        className="h-[300px] flex gap-10 justify-center items-center"
        id="Overview"
      >
        <LandingContentCard icon={TbWorld} title="Expore">
          Bether understand a location by gathering Information about its key
          features and how they interact. Visualize data through map PyITPois,
          themes and iabeis, You con even overiay muitipie dorasets on a singie
          mep redistingvisn partems that would nototherwise be visible
        </LandingContentCard>{" "}
        <LandingContentCard icon={SlMap} title="Model">
          Integrate your corporate data with moos and demegrephics. Combine
          thisInformation with our powerul spanigSvereng ans modeing roois. Run
          differentscenanen ter en sccurete. sp-to-dorerepresentation of a
          locations possichines
        </LandingContentCard>{" "}
        <LandingContentCard icon={LuWrench} title="Act">
          Build models that ane easty understood oy nom technologists. Enabie
          corporcie secsion maker to fully understand me arnbutes and drawbacks
          cregch she. in poch scanano. neip them toke the type of action thar
          propeis business
        </LandingContentCard>
      </div>
      <div className="h-[900px] bg-primary-gray-100 flex justify-around items-center">
        <div>
          <p className="text-primary-blue-200 text-xl font-bold leading-3xl uppercase mb-4">
            Contact us
          </p>
          <p className="text-primary-blue-400 text-5xl font-semibold leading-[54px] mb-5">
            Let&apos;s Talk About <br />
            Your Information
          </p>
          <p className="text-primary-blue-400 text-xl font-medium leading-3xl">
            Call us for immediate support to this number
            <br />
            +977-014883232
          </p>
        </div>
        <LandingForm />
      </div>
    </main>
  );
};

export default LandingPage;

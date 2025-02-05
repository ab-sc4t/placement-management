import Button from "@/components/Button";
import CircularButton from "@/components/CircularButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Line from "@/components/Line";
import { TopRightArrow } from "@/icons/TopRightArrow";

export default function Home() {
  return (
    <div className="h-screen">
      <Header/>
      <div className="bg-[url('/HomePage.png')] bg-cover h-screen">
        <div className="w-full h-screen bg-gradient-to-r from-black to-transparent via-black/30">
          <div className="text-white flex-col-reverse justify-end pl-32">
            <div className="py-64"></div>
            <div className="text-xl pb-6 flex">
              <div className="pr-2 pt-3">
                <Line />
              </div>
              <div>
                Find the right opportunities, stay updated on key dates, and track your career path seamlessly.
              </div>
            </div>
            <div className="text-7xl md:text-6xl lg:text-9xl">
              Simplify your
            </div>
            <div className="flex items-center">
              <div className="text-5xl md:text-6xl lg:text-8xl font-thin">
                placement journey
              </div>
              <div className="ml-4">
                <CircularButton
                  href="/signin"
                  logo={<TopRightArrow size="42" />}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="p-32">
        <div className="text-xl font-semibold text-yellow-500">
          ABOUT PLACEMENT-PRO
        </div>
        <div className="pt-2 text-6xl font-bold text-black">
          Your Pathway to Placements-
        </div>
        <div className="pt-2 text-6xl font-bold text-black">
          Stay Informed, Stay Ahead
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="pt-16 w-full lg:w-1/2">
            <img src="/HomePage2.png" className="w-full" />
          </div>
          <div className="flex-col items-center justify-center pl-4 lg:pl-16 w-full lg:w-1/2">
            <div>
              <div className="pt-24 text-xl">
                Welcome to PlacementPro, your ultimate placement companion!
              </div>
              <div>
                <p className="whitespace-pre-line text-xl pt-4">
                  Designed to simplify your placement journey,
                  our portal helps you stay informed about the latest companies,
                  job opportunities, and key placement dates.
                  Whether you're tracking interviews or exploring top employers,
                  we make it easy to plan and prepare for your future.
                </p>
              </div>
              <div className="text-xl pl-8 pt-4">
                <ul className="list-disc">
                  <li>Easy Registration</li>
                  <li>Explore Companies</li>
                  <li>Track Deadlines</li>
                </ul>
              </div>
              <div className="pt-4 w-fit">
                <Button text="Get Started" href="/signin" endingLogo={<TopRightArrow size="24" />} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}



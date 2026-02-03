import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-white min-h-[44vh] flex flex-col justify-center items-center">
        <div className="text-3xl md:text-5xl mb-2  font-bold flex">By me a chai <span><img className="w-[40] md:w-[60]" src="/tea.gif"  alt="" /></span></div>
        <p className="text-center mx-4 ">
          A crowdfunding platform for creators to get funds for their
          projects.
        </p>
        <div className="mt-4 flex gap-4">
        <Link href="/login"><button
            className="
    relative inline-flex items-center justify-center
    px-6 py-3
    text-sm font-semibold text-white
    rounded-xl
    bg-linear-to-r from-slate-950 via-blue-800 to-indigo-900
    bg-size-[200%_200%]
    animate-gradient
    shadow-[0_0_20px_rgba(56,189,248,0.45)]
    hover:shadow-[0_0_35px_rgba(59,130,246,0.7)]
    hover:scale-[1.03]
    transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-cyan-400/40
  "
          >
            Start Now
          </button></Link>
    <Link href="/about">
       <button
            className="
    relative inline-flex items-center justify-center
    px-6 py-3
    text-sm font-semibold text-white
    rounded-xl
    bg-linear-to-r from-slate-950 via-blue-800 to-indigo-900
    bg-size-[200%_200%]
    animate-gradient
    shadow-[0_0_20px_rgba(56,189,248,0.45)]
    hover:shadow-[0_0_35px_rgba(59,130,246,0.7)]
    hover:scale-[1.03]
    transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-cyan-400/40
  "
          >
            Read More
          </button> </Link>  
        </div>

      </div>

      <div className="text-white mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Your Fans can buy you a chai.</h2>
        <div className="flex justify-around flex-col md:flex-row">
          <div className="item flex flex-col justify-center items-center mb-8">
            <img src="/man.gif" className="bg-white rounded-full" width={80} alt="" />
            <p className="font-bold">Fund Yourself</p>
            <p>Your fans are available to support you</p>
          </div>
          <div className="item flex flex-col justify-center items-center mb-8">
            <img src="/coin.gif" className="bg-white rounded-full" width={80} alt="" />
            <p className="font-bold">Fans want to contribute</p>
            <p>Your fans are willing to contribute financially</p>
          </div>
          <div className="item flex flex-col justify-center items-center mb-8">
            <img src="/group.gif" className="bg-white rounded-full" width={80} alt="" />
            <p className="font-bold">Fans want to help</p>
            <p>Your fans are ready to collaborate with you </p>
          </div>
        </div>
      </div>
    </>
  );
}

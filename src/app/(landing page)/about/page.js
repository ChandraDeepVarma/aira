import Image from "next/image";
import localFont from "next/font/local";

export const metadata = {
  title: "About Page",
  description: "You are watching about page",
};

const cormorant = localFont({
  src: "../../../../public/fonts/CormorantGaramond-VariableFont_wght.ttf",
  variable: "--font-cormorant",
});

const bebas = localFont({
  src: "../../../../public/fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
});

export default function About() {
  return (
    <div className="bg-zinc-50 font-sans">
      <div className="flex min-h-screen">
        <div className="h-full w-full  p-10 bg-gray-100">
          <div className="text-center text-2xl text-black flex flex-col items-center justify-center">
            <h1
              className={`${cormorant.className} font-bold mt-7 mb-5 text-5xl`}
            >
              About Page
            </h1>
            <Image
              src="/assets/6.jpg"
              alt="About Image"
              width={600}
              height={200}
              className="border-2 border-black mb-5"
            />
            <p className={`${bebas.className} text-xl mb-5`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <br />
            <p className={`${bebas.className} text-xl mb-5`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <br />
            <p className={`${bebas.className} text-xl mb-5`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";

const bebas = localFont({
  src: "../../public/fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
});

const bodoni = localFont({
  src: "../../public/fonts/BodoniModa-variableFont_opsz,wght.ttf",
  variable: "--font-bodoni",
});

export default function Home() {
  <Head>
    <title>Home Page</title>

    <meta
      name="Best Places in Vizag to See"
      content="Vizag has 10 plus hidden beaches and hills to visit"
    />
    <meta property="og:title" content="My Page Title" />
    <meta
      property="og:description"
      content="Vizag has 10 plus hidden beaches and hills to visit"
    />
    <meta property="og:type" content="website" />
  </Head>;
  return (
    <div className="bg-zinc-50 font-sans">
      {/* =====================================1st page===================================== */}
      <div className="flex min-h-screen flex-wrap items-center justify-center bg-white">
        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/3.jpg"
              alt="Home Image"
              width={300}
              height={300}
              className="border-2 border-black  rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10">
          <div className="text-center text-2xl text-black">
            <h1 className={`${bebas.className} font-bold text-4xl mb-5`}>
              Welcome to the Website
            </h1>
            <p className={`${bodoni.className} text-xl mb-5`}>
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

      {/* =====================================2nd page===================================== */}

      <div className="flex min-h-screen flex-wrap items-center justify-center bg-white">
        <div className="w-full md:w-1/2 p-10">
          <div className="text-center text-2xl text-black">
            <h1 className={`${bebas.className} font-bold text-4xl mb-5`}>
              Sceneries
            </h1>
            <p className={`${bodoni.className} text-xl mb-5`}>
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

        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/4.jpg"
              alt="Home Image"
              width={300}
              height={300}
              className="border-2 border-black  rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* =====================================3rd page===================================== */}

      <div className="flex min-h-screen flex-wrap items-center justify-center bg-white">
        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/6.jpg"
              alt="Home Image"
              width={500}
              height={300}
              className="border-2 border-black  rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10">
          <div className="text-center text-2xl text-black">
            <h1 className={`${bebas.className} font-bold text-4xl mb-5`}>
              Welcome to the Website
            </h1>
            <p className={`${bodoni.className} text-xl mb-5`}>
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

      {/* =====================================4th page===================================== */}

      <div className="flex min-h-screen flex-wrap items-center justify-center bg-white">
        <div className="w-full md:w-1/2 p-10">
          <div className="text-center text-2xl text-black">
            <h1 className={`${bebas.className} font-bold text-4xl mb-5`}>
              Sceneries
            </h1>
            <p className={`${bodoni.className} text-xl mb-5`}>
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

        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/5.jpg"
              alt="Home Image"
              width={300}
              height={300}
              className="border-2 border-black  rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* =====================================5th page===================================== */}

      <div className="flex min-h-screen flex-wrap items-center justify-center bg-white">
        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/2.jpg"
              alt="Home Image"
              width={300}
              height={300}
              className="border-2 border-black  rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10">
          <div className="text-center text-2xl text-black">
            <h1 className={`${bebas.className} font-bold text-4xl mb-5`}>
              Welcome to the Website
            </h1>
            <p className={`${bodoni.className} text-xl mb-5`}>
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

      {/* =====================================6th page===================================== */}

      <div className="flex min-h-screen flex-wrap items-center justify-center bg-white">
        <div className="w-full md:w-1/2 p-10">
          <div className="text-center text-2xl text-black">
            <h1 className={`${bebas.className} font-bold text-4xl mb-5`}>
              Sceneries
            </h1>
            <p className={`${bodoni.className} text-xl mb-5`}>
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

        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/1.jpg"
              alt="Home Image"
              width={300}
              height={300}
              className="border-2 border-black  rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* =========================================== 7th and 8th page Row=========================================== */}

      <div className="flex min-h-screen">
        <div className="h-full w-full  p-10 bg-gray-100">
          <div className="text-center text-2xl text-black flex flex-col items-center justify-center">
            <h1 className={`${bebas.className} font-bold mt-7 mb-5 text-5xl`}>
              More Content
            </h1>
            <Image
              src="/assets/6.jpg"
              alt="About Image"
              width={600}
              height={200}
              className="border-2 border-black mb-5  rounded-lg shadow-lg"
            />
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p className={`${bodoni.className} text-xl mb-5`}>
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

            <Image
              src="/assets/5.jpg"
              alt="About Image"
              width={600}
              height={200}
              className="border-2 border-black mb-5  rounded-lg shadow-lg"
            />
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p></p>
          </div>
        </div>
      </div>

      {/* =====================================9th page===================================== */}

      <div className="flex min-h-screen flex-wrap items-center justify-center bg-white">
        <div className="w-full md:w-1/2 p-10">
          <div className="text-center text-2xl text-black">
            <h1 className={`${bebas.className} font-bold mb-5`}>Sceneries</h1>
            <p className={`${bodoni.className} text-xl mb-5`}>
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

        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/7.jpg"
              alt="Home Image"
              width={500}
              height={500}
              className="border-2 border-black  rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* =====================================10th page===================================== */}

      <div className="flex min-h-screen flex-wrap items-center justify-center bg-white">
        <div className="w-full md:w-1/2 p-10">
          <div className="text-center text-2xl text-black">
            <h1 className={`${bebas.className} font-bold mb-5`}>Sceneries</h1>
            <p className={`${bodoni.className} text-xl mb-5`}>
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

        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/8.jpg"
              alt="Home Image"
              width={500}
              height={500}
              className="border-2 border-black rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* =========================================== 11th and 12th page Row=========================================== */}

      <div className="flex min-h-screen">
        <div className="h-full w-full  p-10 bg-gray-100">
          <div className="text-center text-2xl text-black flex flex-col items-center justify-center">
            <h1 className={`${bebas.className} font-bold mt-7 mb-5 text-5xl`}>
              More Content
            </h1>
            <Image
              src="/assets/9.jpg"
              alt="About Image"
              width={600}
              height={200}
              className="border-2 border-black mb-5  rounded-lg shadow-lg"
            />
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p className={`${bodoni.className} text-xl mb-5`}>
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

            <Image
              src="/assets/10.jpg"
              alt="About Image"
              width={600}
              height={200}
              className="border-2 border-black mb-5  rounded-lg shadow-lg"
            />
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p className={`${bodoni.className} text-xl mb-5`}>
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
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

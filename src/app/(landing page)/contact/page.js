import Image from "next/image";

export const metadata = {
  title: "Contact Page",
  description: "You are watching Contact page",
};

export default function contact() {
  return (
    <header>
      <div className="bg-zinc-50 font-sans">
        <div className="flex min-h-screen flex-wrap items-center justify-center bg-white">
          <div className="w-full md:w-1/2 p-10">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/1.jpg"
                alt="Home Image"
                width={300}
                height={300}
                className="border-2 border-black"
              />
            </div>
          </div>

          <div className=" w-full md:w-1/2 p-10 border-2 border-black ">
            <div className=" flex flex-col text-center text-2xl text-black">
              <h1 className="font-bold mb-5">Contact Us</h1>
              <form className=" flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  className="border-2 border-black"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border-2 border-black"
                />
                <input
                  type="text"
                  placeholder="Message"
                  className="border-2 border-black"
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

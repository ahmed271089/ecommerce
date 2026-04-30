

export default function Home() {

 
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-center px-6">
      
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-500">
        Welcome to My Website
      </h1>

      <p className="mt-4 text-gray-600 max-w-xl">
        Discover amazing products and enjoy a simple shopping experience.
      </p>

      <div className="mt-6 flex gap-4">
        <a
          href="/product"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Shop Now
        </a>

        <a
          href="/about"
          className="border bg-blue-300 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          Learn More
        </a>
      </div>
      

    </div>
  );
}

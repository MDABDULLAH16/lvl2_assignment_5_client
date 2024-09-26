import { useGetAllServicesQuery } from "@/redux/api/baseApi";
// import { useNavigate } from "react-router-dom";
import FeaturedCard from "./FeaturedCard";
import { TService } from "@/types/TServices";

const FeaturedServices: React.FC = () => {
  const { data: products, isLoading, isError } = useGetAllServicesQuery({});
  //   const navigate = useNavigate();
  console.log(products);

  const shuffleArray = (array: TService[]) => {
    const copy = [...array];
    return copy.sort(() => Math.random() - 0.5);
  };

  const featuredProducts = products?.data
    ? shuffleArray(products.data).slice(0, 6)
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Services...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-red-50">
        <div className="text-2xl font-semibold text-red-600">
          Error: Failed to load Featured Services
        </div>
      </div>
    );
  }

  //   const handleShowMore = () => {
  //     navigate("/products");
  //   };

  return (
    <div className="bg-gray-100 py-4">
      <div className="container bg-gray-100 mx-auto px-6">
        <h1 className="md:text-5xl lg:text-5xl md:font-extrabold lg:font-extrabold text-center md:mb-12  mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-text shadow-lg p-4 rounded-lg">
          Featured Services
        </h1>

        {/* Featured Products Grid */}
        <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
          {featuredProducts.map((product: TService) => (
            <FeaturedCard {...product} key={product.description} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-10">
          {/* <button
            onClick={handleShowMore}
            className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Show More
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;

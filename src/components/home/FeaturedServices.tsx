import { useGetAllServicesQuery } from "@/redux/api/baseApi";
import FeaturedCard from "./FeaturedCard";
import { TService } from "@/types/TServices";

const FeaturedServices: React.FC = () => {
  const { data: products, isLoading, isError } = useGetAllServicesQuery({});

  const shuffleArray = (array: TService[]) => {
    const copy = [...array];
    return copy.sort(() => Math.random() - 0.5);
  };

  const featuredProducts = products?.data
    ? shuffleArray(products.data).slice(0, 6)
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
          Loading Services...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-red-50 dark:bg-red-900">
        <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
          Error: Failed to load Featured Services
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-4">
      <div className="container bg-gray-100 dark:bg-gray-800 mx-auto px-6">
        <h1 className="md:text-5xl lg:text-5xl md:font-extrabold lg:font-extrabold text-center md:mb-12 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-text shadow-lg p-4 rounded-lg">
          Featured Services
        </h1>

        {/* Featured Products Grid */}
        <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
          {featuredProducts.map((product: TService) => (
            <FeaturedCard {...product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;

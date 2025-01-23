import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to SparkWave</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Simplify your car wash booking process with SparkWave, your one-stop
            solution for all car care needs. Explore, book, and manage your
            services effortlessly.
          </p>
        </div>
      </header>

      {/* About Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">
            About SparkWave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p>
                At SparkWave, we bring technology and convenience together to
                redefine car wash booking experiences. Our intuitive platform
                allows users to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browse and compare various car wash services.</li>
                <li>
                  Securely book time slots for services that suit your schedule.
                </li>
                <li>
                  Manage bookings with a personalized user dashboard, featuring
                  past and upcoming services.
                </li>
                <li>Leave reviews to share your experience with others.</li>
              </ul>
            </div>
            <img
              src="https://i.ibb.co/7YBfbSQ/istockphoto-1398554452-612x612-1.png"
              alt="Car Wash"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Why Choose SparkWave?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                User-Friendly
              </h3>
              <p>
                Enjoy a seamless booking process with an intuitive interface
                designed for convenience.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Flexible Scheduling
              </h3>
              <p>
                Book your car wash at a time that fits your busy lifestyle with
                real-time slot availability.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Personalized Dashboard
              </h3>
              <p>
                Access past bookings, upcoming slots, and profile management all
                in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <p>
                "Booking a car wash has never been easier. SparkWave's
                flexibility and features are unmatched!"
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-600">
                - John Doe
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <p>
                "The best car wash experience I've ever had. Highly recommend
                SparkWave!"
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-600">
                - Jane Smith
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <p>
                "The personalized dashboard is a game changer. I love being able
                to manage all my bookings in one place."
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-600">
                - Alex Johnson
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2025 SparkWave. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-200 hover:text-white">
              Facebook
            </a>
            <a href="#" className="text-gray-200 hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-200 hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;

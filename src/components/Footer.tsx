import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About SparkWave</h3>
            <p className="text-sm text-gray-200">
              SparkWave is your go-to solution for seamless car wash booking. We
              simplify the process, ensuring top-notch service and convenience
              for all our users.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/services"
                  className="text-gray-200 hover:text-white transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-200 hover:text-white transition"
                >
                  User Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="text-gray-200 hover:text-white transition"
                >
                  Admin Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-200 hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:info@SparkWave.com"
                  className="text-gray-200 hover:text-white transition"
                >
                  info@SparkWave.com
                </a>
              </li>
              <li>
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  href="tel:+1234567890"
                  className="text-gray-200 hover:text-white transition"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span className="font-semibold">Address:</span> 123 Car Wash
                Lane, Clean City, CW 45678
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 mt-8 pt-6">
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition"
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-300">
            © {new Date().getFullYear()} SparkWave. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

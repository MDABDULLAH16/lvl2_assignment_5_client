import React from "react";

const OfferedSection: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-[url('https://i.ibb.co.com/7YBfbSQ/istockphoto-1398554452-612x612-1.png')]">
      <div className="hero-overlay bg-black bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Are you looking for washing car? we are providing best services for
            you. you can check our services.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default OfferedSection;

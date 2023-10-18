import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaData  from "../layout/MetaData";

const product = {
  name: "Blue short",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "3000",
  _id: "abhishek",
};

const Home = () => {
  return (
    <Fragment>
      <MetaData title="Ishaan and Co." />
      <div className="banner">
        <p>Welcome to Ishaan & Co.</p>
        <h1>Find Amazing Product below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Product</h2>
      <div className="container" id="container">
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;

import { useState, useEffect } from "react";
import Loader from "./Loader";

import axiosInstance from "../utils/axiosInstance";
import ForYouProduct from "./ForYouProduct";

function ForYouSection() {
  const [loding, setLoading] = useState(false);
  const [laptops, addLaptops] = useState([]);
  const [homeAppliances, addHomeAppliance] = useState([]);
  const [mobiles, addMobiles] = useState([]);
  const [smartWatch, addSmartWatch] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/products/for-you");
        const productHP = response?.data?.homeApplianceForYou.map(
          (product) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            discount: product.discountPercentage,
            rating: product.rating,
            images: product.images,
          }),
        );

        addHomeAppliance(productHP);

        const productLap = response?.data?.laptopForYou.map((product) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          discount: product.discountPercentage,
          rating: product.rating,
          images: product.images,
        }));

        addLaptops(productLap);

        const productMob = response?.data?.mobilesForYou.map((product) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          discount: product.discountPercentage,
          rating: product.rating,
          images: product.images,
        }));

        addMobiles(productMob);

        const productSW = response?.data?.smartwatchForYou.map((product) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          discount: product.discountPercentage,
          rating: product.rating,
          images: product.images,
        }));

        addSmartWatch(productSW);
      } catch (err) {
        console.log(err);
        console.log(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  return loding ? (
    <Loader />
  ) : (
    <div className="px-4 md:px-32 py-4 mt-4">
      <ForYouProduct
        title="Suggested for you"
        products={laptops}
        c1="blue"
        c2="purple"
      />

      <ForYouProduct
        title="Product for your Home"
        products={homeAppliances}
        c1="yellow"
        c2="purple"
      />

      <ForYouProduct
        title="Get your best Mobiles"
        products={mobiles}
        c1="green"
        c2="sky"
      />

      <ForYouProduct
        title="Explore the Fashion"
        products={smartWatch}
        c1="green"
        c2="sky"
      />
    </div>
  );
}

export default ForYouSection;

import { useState, useEffect } from "react";
import CategoryTab from "./CategoryTab";
import axiosInstance from "../utils/axiosInstance";

function Categories({ selectedCat }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hideImage, setHideImage] = useState(false);

  const setSelectedCategoryHandler = (categoryId) => {
    setSelectedCategory(categoryId);
    const category = categories.find((cat) => cat.id === categoryId);
    selectedCat(category);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");
        const data = await response.json();

        const newData = data.map((category) => ({
          id: category._id,
          name: category.name,
          image: category.image,
        }));

        newData.sort((a, b) => {
          if (a.name.toLowerCase() === "for you") return -1;
          if (b.name.toLowerCase() === "for you") return 1;
          return 0;
        });

        setCategories(newData);

        const forYouCategory = newData.find(
          (category) => category.name.toLowerCase() === "for you",
        );

        if (forYouCategory) {
          setSelectedCategory(forYouCategory.id);
        } else if (newData.length > 0) {
          setSelectedCategory(newData[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();

    const handleScroll = () => {
      setHideImage(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // ✅ Empty dependency array

  return (
    <div
      className={`border-y border-gray-300 bg-white/80 backdrop-blur-md transition-all duration-300 ${
        hideImage ? "py-2" : "py-4"
      }`}>
      <div className="overflow-x-auto md:overflow-visible scrollbar-hide">
        <ul className="flex gap-8 md:justify-between min-w-max md:min-w-0">
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              category={category}
              isActive={selectedCategory === category.id}
              hideImage={hideImage}
              setSelectedCategoryHandler={setSelectedCategoryHandler}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;

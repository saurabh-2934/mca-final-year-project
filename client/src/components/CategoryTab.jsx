function CategoryTab({
  category,
  isActive,
  setSelectedCategoryHandler,
  hideImage,
}) {
  return (
    <li
      onClick={() => setSelectedCategoryHandler(category.id)}
      className={`flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300 ${
        isActive
          ? "border-b-4 border-blue-500"
          : "border-b-4 border-transparent"
      }`}>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          hideImage ? "h-0 opacity-0" : "h-10 md:h-14 opacity-100"
        }`}>
        <div
          className={`w-10 h-10 md:w-14 md:h-14 rounded-t-lg flex items-center justify-center ${
            isActive ? "bg-gradient-to-b from-cyan-100" : ""
          }`}>
          <img
            src={category.image}
            alt={category.name}
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
          />
        </div>
      </div>

      <span
        className={`text-sm md:text-base text-center text-gray-700 transition-all duration-300 ${
          hideImage ? "mt-0" : "mt-2"
        } ${isActive ? "font-bold" : ""}`}>
        {category.name}
      </span>
    </li>
  );
}

export default CategoryTab;

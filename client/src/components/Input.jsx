function Input({ type = "text", name, required = false, onChangeName, value }) {
  return (
    <div className="relative pl-4 pr-4 pt-2 w-full lg:w-1/2">
      <input
        id={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChangeName(e.target.value)}
        placeholder=" "
        className="peer w-full border-[1px] border-gray-300 px-5 pt-6 pb-1 outline-none focus:border-blue-400"
      />
      <label
        htmlFor={name}
        className="absolute left-8 top-6 bg-white px-1 text-sm text-gray-600 transition-all duration-200
                    peer-focus:top-3
                    peer-focus:text-md
                    peer-[:not(:placeholder-shown)]:top-3
                    peer-[:not(:placeholder-shown)]:text-md">
        {name}
      </label>
    </div>
  );
}

export default Input;

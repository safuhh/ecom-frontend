const CategoryFilter = ({ selected, onChange }) => {
  const categories = [
    { label: "All", value: "" },
    { label: "Analog", value: "analog" },
    { label: "Timer", value: "timer" },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-6 py-2 rounded-full uppercase text-xs tracking-widest border transition
            ${
              selected === cat.value
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

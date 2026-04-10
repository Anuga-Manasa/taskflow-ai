function Loader() {
  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-6 h-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-[2px] h-[6px] bg-gray-600 rounded"
              style={{
                transform: `rotate(${i * 30}deg) translate(-50%, -150%)`,
                transformOrigin: "center",
                opacity: (i + 1) / 12,
                animation: "fade 1.2s linear infinite",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <p className="text-gray-600 text-sm">Loading...</p>
      </div>

      <style>
        {`
          @keyframes fade {
            0% { opacity: 1; }
            100% { opacity: 0.2; }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;

const RunningTaskCard = () => {
    return (
      <div
        className="bg-black text-white rounded-lg p-5 w-48.5 h-53.5 flex flex-col justify-between"
      >
        <div className="jakarta font-semibold text-base">Running Task</div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="jakarta text-[32px] font-semibold">65</div>
          </div>
        </div>
  
        <div className="flex justify-center items-center py-2">
          <div className="relative w-20 h-20 flex gap-3 p-3 flex-row justify-center items-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className="flex-shrink-0"
            >
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="transparent"
                stroke="#374151"
                strokeWidth="4"
              />
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeDasharray="239"
                strokeDashoffset="131"
                transform="rotate(-90 40 40)"
              />
            </svg>
  
            <div className="jakarta absolute inset-0 flex justify-start items-center text-lg font-medium">
              45%
            </div>
            <div className="flex flex-col items-end">
              <div className="jakarta text-xl font-semibold">100</div>
              <div className="jakarta text-sm text-medium text-[#8E92BC]">Task</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RunningTaskCard;
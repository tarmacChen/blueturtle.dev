const FlipCard = () => {
  return (
    <div className="w-64 h-32">
      <div className="relative flex w-full h-full box-border border-black rounded-xl border-2 justify-center items-center">
        <div className="absolute flex w-full h-full justify-center items-center z-10 hover:z-0 bg-white">
          <div>front</div>
        </div>
        <div className="absolute flex w-full h-full justify-center items-center bg-white transition ease-in-out delay-100 hover:bg-gray-300 z-0 hover:z-10 duration-300">
          <div>back</div>
        </div>
      </div>
    </div>
  );
};

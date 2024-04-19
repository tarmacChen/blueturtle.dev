const FlipCard = () => {
  return (
    <div className="h-32 w-64">
      <div className="relative box-border flex h-full w-full items-center justify-center rounded-xl border-2 border-black">
        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white hover:z-0">
          <div>front</div>
        </div>
        <div className="absolute z-0 flex h-full w-full items-center justify-center bg-white transition delay-100 duration-300 ease-in-out hover:z-10 hover:bg-gray-300">
          <div>back</div>
        </div>
      </div>
    </div>
  );
};

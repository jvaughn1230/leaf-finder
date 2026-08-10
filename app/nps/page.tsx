import SelectState from "@/components/parks/nps/SelectState";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-npsBg bg-cover">
      <div>
        <h1 className="page-header text-black">Explore National Parks</h1>
        <div className="flex justify-center mt-4">
          <SelectState />
        </div>
      </div>
    </div>
  );
};

export default Page;

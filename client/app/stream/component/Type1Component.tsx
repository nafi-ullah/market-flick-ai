const Type1Component = ({ data }: { data: string[] }) => {
    return (
      <div className="bg-blue-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Type 1 Data</h2>
        <ul className="list-disc ml-5">
          {data.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Type1Component;
  
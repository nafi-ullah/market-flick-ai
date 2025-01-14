const Type3Component = ({ data }: { data: string[] }) => {
    return (
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Type 3 Data</h2>
        <ul className="list-disc ml-5">
          {data.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Type3Component;
  
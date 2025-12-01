import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = searchParams.get("sortBy") || "";

  function handleChange(event) {
    const value = event.target.value;
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={currentValue}
      onChange={handleChange}
    />
  );
}

export default SortBy;

import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function ServiceTableOprations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name A-Z" },
          { value: "name-desc", label: "Sort by name Z-A" },
          { value: "price-asc", label: "Sort by price low to high" },
          { value: "price-desc", label: "Sort by price high to low" },
        ]}
      />
    </TableOperations>
  );
}

export default ServiceTableOprations;

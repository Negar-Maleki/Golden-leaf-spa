import { useServices } from "./useServices";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import ServiceRow from "./ServiceRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function ServiceTable() {
  const { isLoading, error, services } = useServices();
  if (services?.length === 0) {
    return <Empty resourceName="services" />;
  }

  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const statusFilter = searchParams.get("status") || "all";
  let filteredServices;
  if (statusFilter === "all") {
    filteredServices = services;
  } else if (statusFilter === "active") {
    filteredServices = services.filter((service) => service.isActive);
  } else if (statusFilter === "inactive") {
    filteredServices = services.filter((service) => !service.isActive);
  }

  const sortBy = searchParams.get("sortBy") || "";
  if (sortBy === "price-asc") {
    filteredServices.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredServices.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    filteredServices.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    filteredServices.sort((a, b) => b.name.localeCompare(a.name));
  }
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div role="columnheader">Image</div>
          <div role="columnheader">Name</div>
          <div role="columnheader">Description</div>
          <div role="columnheader">Price</div>
          <div role="columnheader">Duration</div>
        </Table.Header>
        <Table.Body
          data={filteredServices}
          render={(service) => (
            <ServiceRow key={service.id} service={service} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ServiceTable;

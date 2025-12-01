import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ServiceTable from "../features/sevices/ServiceTable";
import AddService from "../features/sevices/AddService";
import ServiceTableOprations from "../features/sevices/ServiceTableOPrations";

function Services() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Services</Heading>
        <ServiceTableOprations />
      </Row>
      <Row>
        <ServiceTable />
        <AddService />
      </Row>
    </>
  );
}

export default Services;

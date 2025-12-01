import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateServiceForm from "./CreateServiceForm";

function AddService() {
  return (
    <Modal>
      <Modal.Open opens="content">
        <Button>Add New Service</Button>
      </Modal.Open>
      <Modal.Content name="content">
        <CreateServiceForm />
      </Modal.Content>
    </Modal>
  );
}

export default AddService;

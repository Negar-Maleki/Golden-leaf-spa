/* eslint-disable react/prop-types */
// import PropTypes from "prop-types";

import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { useService } from "./useService";
import { useCreateService } from "./useCreateService";
import CreateServiceForm from "./CreateServiceForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;

  aspect-ratio: 2 / 2.4;
  object-fit: cover;
  object-position: center;
  transform: scale(1.8) translateX(-7px);
`;

const Service = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

function ServiceRow({ service }) {
  const { isDeleting, deleteService } = useService();
  const { isCreating, createService } = useCreateService();

  const { id, name, description, price, duration, imageUrl } = service;

  function handleDuplicate() {
    createService({
      name: `Copy of ${name}`,
      description,
      price,
      duration,
      imageUrl,
    });
  }

  return (
    <Table.Row>
      <Img src={`/src/data/services/${imageUrl}`} alt={name} />
      <Service>{name}</Service>
      <div>{description}</div>
      <Price>{formatCurrency(price)}</Price>
      <div>{duration} mins</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button
                onClick={handleDuplicate}
                disabled={isCreating}
                icon={<HiSquare2Stack />}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Content name="edit">
              <CreateServiceForm editService={service} />
            </Modal.Content>

            <Modal.Content name="delete">
              <ConfirmDelete
                resourceName="service"
                disabled={isDeleting}
                onConfirm={() => deleteService(id)}
              />
            </Modal.Content>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ServiceRow;

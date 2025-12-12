/* eslint-disable react/prop-types */
import styled from "styled-components";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import { useServices } from "../sevices/useServices";
import { useCustomers } from "./useCustomers";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    date,
    duration,
    notes,
    totalPrice,
    status,
    customerId,
    serviceId,
  },
}) {
  const { services } = useServices();
  const { customers } = useCustomers();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();

  const statusToTagName = {
    PENDING: "blue",
    CONFIRMED: "green",
    COMPLETED: "silver",
    CANCELLED: "red",
  };

  const serviceName = services?.filter((service) => service.id === serviceId)[0]
    .name;

  const customer = customers?.filter((c) => c.id === customerId)[0];

  const isTodayDate = (date) => {
    const bookingDate = new Date(date);
    const today = new Date();

    return (
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    );
  };

  const hour = date.split("T")[1].split(":")[0];
  const minutes = date.split("T")[1].split(":")[1];
  const minuteEnd = ((Number(minutes) * 1 + duration) % 60)
    .toString()
    .padStart(2, "0");
  const hourEnd =
    Number(hour) * 1 + Math.floor((Number(minutes) * 1 + duration) / 60);

  return (
    <Table.Row>
      <Cabin>{serviceName}</Cabin>

      <Stacked>
        <span>{customer?.name}</span>
        <span>{customer?.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isTodayDate(date) ? "Today" : formatDistanceFromNow(date)}{" "}
        </span>
        <span>
          {new Date(date).getFullYear()}-{new Date(date).getMonth() + 1}-
          {new Date(date).getDate()}&rarr; {hour}:{minutes}- {hourEnd}:
          {minuteEnd}
        </span>

        <span>{duration} minutes booking</span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Stacked>{notes}</Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {status === "PENDING" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === "CONFIRMED" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Content name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Content>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;

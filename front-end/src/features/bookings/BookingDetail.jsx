import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { HiArrowUpOnSquare } from "react-icons/hi2";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckOut } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    PENDING: "blue",
    CONFIRMED: "green",
    CANCELLED: "red",
    COMPLETED: "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "PENDING" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === "CONFIRMED" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Content name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: moveBack,
                })
              }
            />
          </Modal.Content>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

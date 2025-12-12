import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 8rem 6fr 7fr 2fr 8rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.3rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { customer, service, totalPrice, notes, duration, status, id } =
    activity;

  return (
    <StyledTodayItem>
      {status === "PENDING" && <Tag type="green">Arriving</Tag>}
      {status === "CONFIRMED" && <Tag type="blue">Departing</Tag>}

      <Guest>{customer?.name}</Guest>
      <div>{service?.name}</div>
      <div>{duration} mins</div>

      {status === "PENDING" && (
        <Button size="small" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === "CONFIRMED" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;

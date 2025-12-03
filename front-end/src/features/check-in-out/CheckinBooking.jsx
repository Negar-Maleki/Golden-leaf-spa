import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckin();
  const [addFood, setAddFood] = useState(false);
  const [addDrink, setAddDrink] = useState(false);
  const { settings, isLoading: settingsLoading } = useSetting();

  useEffect(() => setConfirmPaid(booking?.paid ?? false), [booking]);

  if (isLoading || settingsLoading) {
    return <Spinner />;
  }
  console.log(1, booking);

  const { id: bookingId, customer, totalPrice } = booking;
  const baseTotal = Number(totalPrice) || 0;

  function handleCheckin() {
    if (!confirmPaid) return;

    const foodPrice = Number(settings?.[0]?.foodPrice) || 0;
    const drinkPrice = Number(settings?.[0]?.drinkPrice) || 0;

    const extraCost = (addFood ? foodPrice : 0) + (addDrink ? drinkPrice : 0);

    const newTotalPrice = baseTotal + extraCost;

    checkIn({
      bookingId,
      food: !!addFood,
      drink: !!addDrink,
      totalPrice: newTotalPrice,
      extraCost,
    });
  }

  console.log(booking);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {booking.food && booking.drink ? null : (
        <Box>
          {!booking.food && (
            <CheckBox
              checked={addFood}
              onChange={() => {
                setAddFood((add) => !add);
                setConfirmPaid(false);
              }}
              id="add-food-service"
            >
              Want to add food service for{" "}
              {formatCurrency(settings[0]?.foodPrice)}?
            </CheckBox>
          )}

          {!booking.drink && (
            <CheckBox
              checked={addDrink}
              onChange={() => {
                setAddDrink((add) => !add);
                setConfirmPaid(false);
              }}
              id="add-drink-service"
            >
              Want to add drink service for{" "}
              {formatCurrency(settings[0]?.drinkPrice)}?
            </CheckBox>
          )}
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm-paid"
          disabled={isCheckingIn || confirmPaid}
        >
          I confirm that {customer?.name} has been paid the total amount of{" "}
          {addDrink || addFood
            ? `${formatCurrency(
                Number(totalPrice) +
                  (addFood ? Number(settings[0]?.foodPrice) : 0) +
                  (addDrink ? Number(settings[0]?.drinkPrice) : 0)
              )}(${
                addFood && addDrink
                  ? `${formatCurrency(
                      Number(settings[0]?.foodPrice) +
                        Number(settings[0]?.drinkPrice)
                    )} food and drink`
                  : (addFood
                      ? ` ${formatCurrency(
                          Number(settings[0]?.foodPrice)
                        )} food`
                      : "") +
                    (addDrink
                      ? ` ${formatCurrency(
                          Number(settings[0]?.drinkPrice)
                        )} drink`
                      : "")
              }) `
            : formatCurrency(totalPrice)}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

/*ESLint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { useSetting } from "./useSetting";
import { useUpdatingSetting } from "./useUpdatingSetting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import CheckboxList from "../../ui/CheckboxList";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSetting();
  const { isUpdating, updatingSetting } = useUpdatingSetting();

  const { foodPrice, drinkPrice, workingDays, openingHour, closingHour } =
    settings?.[0] || {};

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (workingDays) {
      setSelected(workingDays);
    }
  }, [workingDays]);

  function handleWorkingDaysChange(updatedArray) {
    updatingSetting({ workingDays: updatedArray });
  }

  function handleUpdate(e, fieldName, previousValue) {
    const newValue = e.target.value;
    if (newValue === "" || Number(newValue) === Number(previousValue)) return;
    updatingSetting({ [fieldName]: Number(newValue) });
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form>
      <FormRow label="Food price">
        <Input
          type="number"
          id="foodPrice"
          defaultValue={foodPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "foodPrice", foodPrice)}
        />
      </FormRow>
      <FormRow label="Drink price">
        <Input
          type="number"
          id="drinkPrice"
          defaultValue={drinkPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "drinkPrice", drinkPrice)}
        />
      </FormRow>
      <FormRow label="Working days">
        <CheckboxList
          id="workingDays"
          disabled={isUpdating}
          selected={selected}
          setSelected={setSelected}
          onChange={handleWorkingDaysChange}
        />
      </FormRow>

      <FormRow label="Opening hour">
        <select
          id="openingHour"
          defaultValue={openingHour}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "openingHour", openingHour)}
        >
          {Array.from({ length: 13 }, (_, i) => (
            <option key={i} value={i}>
              {i}:00
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Closing hour">
        <select
          id="closingHour"
          defaultValue={closingHour}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "closingHour", closingHour)}
        >
          {Array.from({ length: 13 }, (_, i) => (
            <option key={i} value={i + 12}>
              {i + 12}:00
            </option>
          ))}
        </select>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

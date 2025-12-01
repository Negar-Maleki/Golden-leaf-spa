/*eslint-disable react/prop-types */

import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;
const options = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CheckboxList({
  id,
  disabled = false,
  selected,
  setSelected,
  onChange, // optional callback receiving updated array
}) {
  const handleToggle = (option) => {
    let updated;
    if (selected?.includes(option)) {
      updated = selected.filter((day) => day !== option);
    } else {
      updated = [...(selected || []), option];
    }
    setSelected(updated);
    if (onChange) onChange(updated);
  };

  return (
    <StyledCheckbox id={id}>
      {options.map((option) => (
        <label key={option} style={{ display: "block" }}>
          <input
            type="checkbox"
            value={option}
            checked={selected?.includes(option) || false}
            disabled={disabled}
            onChange={() => handleToggle(option)}
          />
          {option}
        </label>
      ))}
    </StyledCheckbox>
  );
}

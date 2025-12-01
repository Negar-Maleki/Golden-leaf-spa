/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import { useCreateService } from "./useCreateService";
import { useEditService } from "./useEditService";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateServiceForm({ editService = {}, onCloseModal }) {
  const { id: editId, ...editFields } = editService;

  const isEditingSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditingSession ? editFields : {},
  });
  const { errors } = formState;

  const { isCreating, createService } = useCreateService();
  const { isEditing, editingService } = useEditService();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const formattedData = {
      ...data,
      duration: Number(data.duration),
      price: Number(data.price),
    };
    if (isEditingSession) {
      editingService(
        { id: editId, data: formattedData },
        {
          onSuccess: () => {
            reset();
            if (onCloseModal) onCloseModal();
          },
        }
      );
    } else {
      createService(formattedData, {
        onSuccess: (data) => {
          reset();
          if (onCloseModal) onCloseModal();
        },
      });
    }
  }

  function onError(errors) {
    console.log("Form errors:", errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Service name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum duration" error={errors?.duration?.message}>
        <Input
          type="number"
          id="duration"
          disabled={isWorking}
          {...register("duration", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        id="isActive"
        label="Is Active"
        error={errors?.isActive?.message}
      >
        <select
          id="isActive"
          disabled={isWorking}
          {...register("isActive", {
            setValueAs: (v) => v === "true",
          })}
          defaultValue="true"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </FormRow>

      <FormRow label="Service photo" error={errors?.imageUrl?.message}>
        <FileInput
          id="imageUrl"
          accept="image/*"
          disabled={isWorking}
          {...register("imageUrl")}
        />
      </FormRow>

      <FormRow>
        <Button
          type="button"
          variation="secondary"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isEditingSession ? "Edit service" : "Create new service"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateServiceForm;

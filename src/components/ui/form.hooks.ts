import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormFieldContext,
  FormItemContext,
} from "./form.internals"; // Assuming FormFieldContextValue is implicitly typed via FormFieldContext

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  // Ensure itemContext is available if id is accessed, though original code didn't check itemContext directly
  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem> for item context");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

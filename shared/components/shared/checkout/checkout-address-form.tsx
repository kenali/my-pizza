"use client";
import { Controller, useFormContext } from "react-hook-form";
import { AddressInput, ErrorText, FormTextarea, WhiteBlock } from "..";

interface Props {
  className?: string;
}

export const CheckoutAddressForm = ({ className }: Props) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Order comment"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};

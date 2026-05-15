import { FormInput } from "../form";
import { WhiteBlock } from "..";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm = ({ className }: Props) => {
  return (
    <WhiteBlock title="2. Personal details" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          name="firstName"
          className="text-base"
          placeholder="First name"
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Last name"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
      </div>
    </WhiteBlock>
  );
};

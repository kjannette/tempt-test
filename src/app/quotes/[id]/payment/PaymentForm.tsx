"use client";

import { useState } from "react";
import { Path, useForm } from "react-hook-form";
import { useTransition } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { paymentFields } from "../../../constants/paymentFields";
import TextInput from "../../../pageElements/TextInput";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styles from "../../styles/payment.module.scss";

export type InputsType = {
  cardFirstName: string;
  cardLastName: string;
  cardNumber: string;
  cardCvvCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
};

export type PaymentFormValues = {
  firstName: string;
  lastName: string;
  cardNumber: string;
  expirationMonth: string;
  expirationDay: string;
  zip: string;
};

export type PaymentFormState = {
  message: string;
  errors: Partial<Record<Path<PaymentFormValues>, string>>;
};

type PaymentFormProps = {
  formInputs: InputsType;
};

export const PaymentForm = () => {
  const [isPending, startTransition] = useTransition();
  const stripe = useStripe();
  const elements = useElements();

  const formInputs: InputsType = {
    cardFirstName: "",
    cardLastName: "",
    cardNumber: "",
    cardCvvCode: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
  };

  const [inputs, setInputs] = useState<InputsType>(formInputs);
  let userAgent: any;

  if (typeof window !== "undefined") {
    userAgent = window && window?.navigator?.userAgent;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    reValidateMode: "onChange",
  });

  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = handleSubmit((data) => {
    handleStripeAuthorization(inputs);
  });

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_DEV
      : process.env.REACT_APP_API_PROD;

  async function handleStripeAuthorization(inputs: InputsType) {
    let error: boolean = false;
    let subscriptionId = null;
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: 89 },
      });
      const clientSecret = data;

      const result = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.paymentIntent?.status == "succeeded") {
        //toast.success("Payment done successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.paymentFormContainer}>
      <form onSubmit={onSubmit}>
        <div className={styles.inputContainer}>
          {paymentFields.map((field, i) => (
            <TextInput
              key={`${field.name}-${i}`}
              className="text-input"
              name={field.name}
              label={field.label}
              placeholder={field.label}
              maessage={field.message}
              value={(inputs as InputsType)[field.name] || ""}
              onChange={handleChange}
              register={register}
            />
          ))}
        </div>
        <div className={styles.submitButtonWrapper}>
          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

"use server";

import { PaymentForm } from "./PaymentForm";

import styles from "../../styles/payment.module.scss";

export default async function PaymentPage() {
  return (
    <div className={styles.paymentPage}>
      <h2>Enter Payment Card Information</h2>
      <PaymentForm />
    </div>
  );
}

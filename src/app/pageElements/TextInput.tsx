import { Path, useForm } from "react-hook-form";
import styles from "../styles/payment.module.scss";
// add prop types
const TextInput = (props: any) => {
  const { error, message, label, name, value, onChange, id, register } = props;
  console.log("name", name);
  const inputClass =
    name === "cardCvvCode" ||
    name === "cardExpirationMonth" ||
    name === "cardExpirationYear"
      ? styles.shortInput
      : styles.textInput;
  return (
    <div className={styles.formField}>
      <input
        {...register(`${name}`, { required: "This field is required" })}
        type="text"
        className={inputClass}
        value={value || ""}
        name={name}
        onChange={(e) => onChange(e)}
        placeholder={label}
        disabled={false}
      />
      {error ? <div className="textinput-error-box">{message}</div> : <></>}
    </div>
  );
};

export default TextInput;

/*
      {label ? (
        <label htmlFor="payment-form" className="form-label">
          {label}
        </label>
      ) : (
        <></>
      )}
      */

import NewQuote from "./quotes/new/NewQuote";
import NewPayment from "./quotes/[id]/payment/NewPayment";

export default function Home() {
  return (
    <main className="main-container">
      <div>
        <NewQuote />
      </div>
      <div></div>
    </main>
  );
}

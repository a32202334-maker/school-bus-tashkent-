import { useState } from "react";
import { useActionMutation, useActionQuery } from "@agent-native/core/client/hooks";

const panel = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

type ReviewOffer = {
  id: string;
  school: string;
  approximateArea: string;
  rideDate: string;
  departureTime: string;
  arrivalTime: string;
  seatCapacity: number;
  status: string;
  createdAt: string;
};

function errorText() {
  return "The request could not be completed. Check your coordinator access and try again.";
}

export default function CoordinatorPage() {
  const offers = useActionQuery("list-coordinator-ride-offers", { limit: 50 });
  const review = useActionMutation("review-ride-offer");
  const [reason, setReason] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [pendingId, setPendingId] = useState("");

  async function decide(id: string, status: "approved" | "rejected") {
    setNotice("");
    setError("");
    const decisionReason = reason[id]?.trim() ?? "";
    if (!decisionReason) {
      setError("Enter a reason before reviewing this offer.");
      return;
    }
    setPendingId(id);
    try {
      const result = await review.mutateAsync({ id, status, reason: decisionReason });
      setNotice(`Offer ${result.status}.`);
      setReason((current) => ({ ...current, [id]: "" }));
    } catch (cause) {
      setError(errorText());
    } finally {
      setPendingId("");
    }
  }

  return (
    <main>
      <p className="text-xs font-extrabold tracking-[.16em] text-[#986700]">SCHOOLBUS TASHKENT · COORDINATOR</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-[#101a2e]">Offer review</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Only accounts assigned the SchoolBus Tashkent coordinator role can view or review these submissions. Approval does not verify the driver or guarantee safety.</p>
      {notice && <p role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}
      {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <section className="mt-6 space-y-4" aria-live="polite">
        {offers.isLoading && <p className="text-sm text-slate-600">Loading submitted offers…</p>}
        {offers.isError && <div className={panel}><h2 className="font-bold">Coordinator access required</h2><p className="mt-2 text-sm leading-6 text-slate-600">{errorText()}</p></div>}
        {offers.data?.length === 0 && <div className={panel}><h2 className="font-bold">No offers are awaiting review.</h2><p className="mt-2 text-sm text-slate-600">New ride offers will appear here when submitted.</p></div>}
        {offers.data?.map((offer: ReviewOffer) => (
          <article className={panel} key={offer.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="text-lg font-bold">{offer.school}</p><p className="mt-1 text-sm text-slate-600">{offer.rideDate} · {offer.departureTime}–{offer.arrivalTime}</p><p className="mt-1 text-sm text-slate-600">Approximate pickup area: {offer.approximateArea}</p><p className="mt-1 text-sm text-slate-600">Seats offered: {offer.seatCapacity}</p></div>
              <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900">Pending review</span>
            </div>
            <form className="mt-5 space-y-3 border-t border-slate-100 pt-4" onSubmit={(event) => { event.preventDefault(); void decide(offer.id, "approved"); }}>
              <label className="block text-sm font-semibold" htmlFor={`review-${offer.id}`}>Review reason (required)
                <textarea id={`review-${offer.id}`} value={reason[offer.id] ?? ""} onChange={(event) => setReason((current) => ({ ...current, [offer.id]: event.target.value }))} maxLength={2000} required rows={2} className="mt-2 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#ffb900]" />
              </label>
              <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={pendingId === offer.id} className="min-h-10 rounded-full bg-[#ffb900] px-4 py-2 text-sm font-bold text-[#101a2e] transition hover:bg-[#ffd15c] disabled:opacity-60">{pendingId === offer.id ? "Saving…" : "Approve offer"}</button>
                <button type="button" disabled={pendingId === offer.id} onClick={() => void decide(offer.id, "rejected")} className="min-h-10 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60">Reject offer</button>
              </div>
            </form>
          </article>
        ))}
      </section>
    </main>
  );
}

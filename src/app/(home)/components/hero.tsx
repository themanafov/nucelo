import PublicBetaBadge from "@/components/shared/public-beta-badge";

export default function Hero() {
  return (
    <section className="section-container pt-16">
      <div className="flex items-center gap-3">
        <h3 className="font-medium text-2xl section-title">Nucelo</h3>
        <PublicBetaBadge className="mt-0" />
      </div>
      <p className="text-gray-4 text-base">
        Open source minimal blogging platform.
      </p>
    </section>
  );
}

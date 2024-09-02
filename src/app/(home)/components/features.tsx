import { Icons } from "@/components/shared/icons";
import { marketingConfig } from "@/config/marketing";

export default function Features() {
  return (
    <section className="section-container">
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1 section-content">
        {marketingConfig.features.map((f) => {
          const Icon = Icons[f.icon];
          return (
            <div
              className="text-gray-4  flex flex-col border border-gray-2  px-3 py-4 items-center text-center  text-sm rounded-md gap-3 cursor-default"
              key={f.title}
            >
              <Icon size={20} className="text-secondary" />
              <p className="max-w-64">{f.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

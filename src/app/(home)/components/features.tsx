import { Icons } from "@/components/shared/icons";
import { marketingConfig } from "@/config/marketing";

export default function Features() {
  return (
    <section className="section-container">
      <h3 className="font-medium section-title">Features</h3>
      <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1 section-content">
        {marketingConfig.features.map((f) => {
          const Icon = Icons[f.icon];
          return (
            <div
              className="text-gray-4 flex flex-col border border-gray-2 text-sm rounded-md gap-2 p-4 cursor-default"
              key={f.title}
            >
              <Icon size={18} className="text-secondary" />
              {f.description}
            </div>
          );
        })}
      </div>
    </section>
  );
}

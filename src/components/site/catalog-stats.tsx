type CatalogStatsProps = {
  house: number;
  partners: number;
  collections: number;
  makers: number;
};

export function CatalogStats({
  house,
  partners,
  collections,
  makers,
}: CatalogStatsProps) {
  const items = [
    { label: "House weaves", value: String(house) },
    { label: "Partner pieces", value: String(partners) },
    { label: "Collections", value: String(collections) },
    { label: "Makers", value: String(makers) },
  ];

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 pb-2 md:grid-cols-4 md:px-8">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4"
        >
          <p className="font-display text-3xl font-bold text-matcha">
            {item.value}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-mist/50">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

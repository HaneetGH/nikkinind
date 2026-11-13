"use client";

type FormatDateProps = {
  value: string;
  style?: "short" | "long";
};

export function FormatDate({ value, style = "short" }: FormatDateProps) {
  const date = new Date(value);
  const formatted = date.toLocaleDateString("en-IN", {
    month: style === "long" ? "long" : "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Calcutta",
  });
  return <time dateTime={value}>{formatted}</time>;
}

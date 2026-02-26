"use client";

import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

export function T({ id }: { id: string }) {
  const { language } = useLanguage();
  return <>{t(language, id)}</>;
}

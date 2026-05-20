import { CheckCircle2, Circle } from "lucide-react";
import { useMemo, useState } from "react";
import type { GuideSection, Locale } from "../content/types";

interface Props {
  sections: GuideSection[];
  locale: Locale;
}

export default function GuideChecklist({ sections, locale }: Props) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => new Set());
  const totalCount = useMemo(() => sections.reduce((sum, section) => sum + section.items.length, 0), [sections]);
  const completedCount = checkedItems.size;
  const copy = {
    ko: {
      progress: "체크 완료",
      reset: "초기화"
    },
    en: {
      progress: "checked",
      reset: "Reset"
    }
  }[locale];

  function toggleItem(id: string) {
    setCheckedItems((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  return (
    <div className="guide-checklist">
      <div className="guide-progress">
        <strong>
          {completedCount}/{totalCount}
        </strong>
        <span>{copy.progress}</span>
        <button type="button" onClick={() => setCheckedItems(new Set())}>
          {copy.reset}
        </button>
      </div>

      {sections.map((section) => (
        <section className="guide-section-card" id={section.id} key={section.id}>
          <h2>{section.title}</h2>
          <p>{section.summary}</p>
          <ul>
            {section.items.map((item, index) => {
              const itemId = `${section.id}-${index}`;
              const isChecked = checkedItems.has(itemId);

              return (
                <li key={itemId}>
                  <button type="button" aria-pressed={isChecked} onClick={() => toggleItem(itemId)}>
                    {isChecked ? <CheckCircle2 aria-hidden="true" size={20} /> : <Circle aria-hidden="true" size={20} />}
                    <span>{item}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {section.media.length > 0 ? (
            <div className="guide-media-grid" aria-label={`${section.title} media`}>
              {section.media.map((asset) => (
                <figure key={`${section.id}-${asset.src}`}>
                  <img src={asset.src} alt={asset.alt} loading="lazy" decoding="async" />
                  {asset.caption ? <figcaption>{asset.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}

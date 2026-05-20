import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FaqItem } from "../content/types";

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article className="faq-item" key={item.question}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              <span>{item.question}</span>
              <ChevronDown aria-hidden="true" className={isOpen ? "is-open" : ""} size={20} />
            </button>
            {isOpen ? <p>{item.answer}</p> : null}
          </article>
        );
      })}
    </div>
  );
}

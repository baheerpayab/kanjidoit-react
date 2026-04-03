import type { ObjectPageHeader } from "../ObjectPageHeader/objectPageHeader";
import {
  ObjectPageSection,
  type ObjectPageSectionProps,
} from "../ObjectPageSection/objectPageSection";
import "./objectPage.css";
import { IconTabHeaderProvider } from "./objectPageContexts";
import React, { useEffect, useRef } from "react";

export function ObjectPage({
  content,
  objectPageHeader,
}: {
  content: React.ReactElement<ObjectPageSectionProps>[];
  objectPageHeader: React.ReactElement<typeof ObjectPageHeader>;
}) {

  // Collect section names for shared context
  const sectionNames: string[] = [];

  if (
    content.every((section) => {
      if (React.isValidElement(section))
        return section.type === ObjectPageSection;
    })
  ) {
    content.forEach((section) => {
      sectionNames.push(section.props.heading);
    });
  }

  // Add bottom spacing to allow section scrollIntoView with IconTabHeader
  const contentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.clientHeight;
      const lastSectionHeight =
        contentRef.current.lastElementChild?.clientHeight;

      if (lastSectionHeight) {
        contentRef.current.style.paddingBottom = `${height - lastSectionHeight}px`;
      }
    }
  });

  return (
    <div className="object-page">
      <IconTabHeaderProvider value={sectionNames}>
        {objectPageHeader}
      </IconTabHeaderProvider>
      <main
        ref={contentRef}
        className="object-page__content responsive-padding"
      >
        {content?.map((section) => section)}
      </main>
    </div>
  );
}

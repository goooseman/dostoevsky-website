import React, { PureComponent } from "react";
import classes from "./ClausesPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";

interface ClauseText {
  ru: string;
}

interface ClausesPageProps {
  parts: {
    text: ClauseText;
    sections: {
      text: ClauseText;
      chapters: {
        text: ClauseText;
        url: string;
      }[];
    }[];
  };
}

class ClausesPage extends PureComponent<ClausesPageProps> {
  render(): React.ReactNode {
    const { parts } = this.props;
    return (
      <main className={cn(classes.container)}>
        <Container>
          <Accordion>
            <AccordionNode title={parts.text.ru} variant="primary">
              {parts.sections.map((section) => (
                <Accordion key={section.text.ru}>
                  <AccordionNode title={section.text.ru} variant="secondary">
                    {section.chapters.map((chapter) => (
                      <a key={chapter.text.ru}>{chapter.text.ru}</a>
                    ))}
                  </AccordionNode>
                </Accordion>
              ))}
            </AccordionNode>
          </Accordion>
        </Container>
      </main>
    );
  }
}

export default ClausesPage;

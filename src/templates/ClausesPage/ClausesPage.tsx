import React, { PureComponent } from "react";
import classes from "./ClausesPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import Typography from "src/components/ui-kit/Typography";

interface ClauseText {
  ru: string;
}

interface ClausesPageProps {
  parts: {
    text: ClauseText;
    children: {
      text: ClauseText;
      children: {
        text: ClauseText;
        key: string;
      }[];
    }[];
  }[];
  actualYear: string;
}

class ClausesPage extends PureComponent<ClausesPageProps> {
  render(): React.ReactNode {
    const { parts, actualYear } = this.props;
    return (
      <main className={cn(classes.container)}>
        <Container>
          <Accordion>
            {parts.map((part) => (
              <AccordionNode
                key={part.text.ru}
                title={part.text.ru}
                variant="primary"
              >
                {part.children.map((section) => (
                  <Accordion key={section.text.ru}>
                    <AccordionNode title={section.text.ru} variant="secondary">
                      {section.children.map((chapter) => (
                        <Typography key={chapter.key}>
                          <a href={`/${chapter.key}/${actualYear}`}>
                            {chapter.text.ru}
                          </a>
                        </Typography>
                      ))}
                    </AccordionNode>
                  </Accordion>
                ))}
              </AccordionNode>
            ))}
          </Accordion>
        </Container>
      </main>
    );
  }
}

export default ClausesPage;

import React, { PureComponent } from "react";
import classes from "./ClausesPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import Typography from "src/components/ui-kit/Typography";
import { getClauseLink } from "src/config/routes";
import type { I18nText } from "src/types";

interface ClausesPageProps {
  parts: {
    text: I18nText;
    key: number;
    children: {
      text: I18nText;
      key: number;
      children: {
        text: I18nText;
        key: number;
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
                key={part.key}
                title={part.text.ru}
                variant="primary"
              >
                {part.children.map((section) => (
                  <Accordion key={section.key}>
                    <AccordionNode title={section.text.ru} variant="secondary">
                      {section.children.map((chapter) => (
                        <Typography key={chapter.key}>
                          <a
                            href={getClauseLink(
                              chapter.key.toString(),
                              actualYear
                            )}
                          >
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

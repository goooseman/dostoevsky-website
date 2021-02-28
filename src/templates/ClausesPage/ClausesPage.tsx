import React, { PureComponent } from "react";
import classes from "./ClausesPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import Typography from "src/components/ui-kit/Typography";
import { getClauseLink } from "src/config/routes";
import type { I18nText } from "src/types";
import { withLocale, WithLocale } from "react-targem";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { Helmet } from "react-helmet";

interface ClausesPageProps extends WithLocale {
  parts: {
    text: I18nText;
    id: number;
    children: {
      text: I18nText;
      id: number;
      children: {
        text: I18nText;
        id: number;
      }[];
    }[];
  }[];
  actualYear: number;
}

class ClausesPage extends PureComponent<ClausesPageProps> {
  render(): React.ReactNode {
    const { parts, actualYear, locale, t } = this.props;
    return (
      <main className={cn(classes.container)}>
        <Helmet defer={false}>
          <title>{t("Каталог статей УК РФ")}</title>
          <meta
            name="description"
            content={t(
              "Полный перечень всех статей УК РФ, выберите статью для получения полной информации."
            )}
          />
        </Helmet>
        <Container>
          <Accordion>
            {parts.map((part) => (
              <AccordionNode
                key={part.id}
                title={part.text.ru}
                slug={`chapter-${part.id}`}
                variant="primary"
              >
                <Accordion>
                  {part.children.map((section) => (
                    <AccordionNode
                      key={section.id}
                      slug={`chapter-${part.id}-section-${section.id}`}
                      title={section.text.ru}
                      variant="secondary"
                    >
                      {section.children.map((chapter) => (
                        <Typography key={chapter.id}>
                          <OutboundLink
                            href={getClauseLink(
                              locale,
                              chapter.id.toString(),
                              actualYear.toString(),
                              "main"
                            )}
                          >
                            <b>Статья {chapter.id}. </b>
                            {chapter.text.ru}
                          </OutboundLink>
                        </Typography>
                      ))}
                    </AccordionNode>
                  ))}
                </Accordion>
              </AccordionNode>
            ))}
          </Accordion>
        </Container>
      </main>
    );
  }
}

export default withLocale(ClausesPage);

import React, { PureComponent } from "react";
import classes from "./ClausePageLayout.module.css";
import cn from "clsx";
import { Link } from "gatsby";
import Typography from "src/components/ui-kit/Typography";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Container from "src/components/ui-kit/Container";
import ClausePageCatalogue from "src/components/ClausePageCatalogue";
import type { I18nText } from "src/types";

interface ClausePageLayoutProps {
  clauseNumber: number;
  clauseText: I18nText;
  clauseOutsideLink: string;
  clauseLink: string;
  year: number;
  children: React.ReactNode;
  isCatalogueOpened: boolean;
  onCatalogueSwitch: () => void;
}

class ClausePageLayout extends PureComponent<ClausePageLayoutProps> {
  render(): React.ReactNode {
    const {
      clauseLink,
      clauseNumber,
      clauseOutsideLink,
      clauseText,
      children,
      year,
      isCatalogueOpened,
      onCatalogueSwitch,
    } = this.props;

    return (
      <main>
        <Container className={cn(classes.container)}>
          <div className={cn(classes.sidebar)}>
            <button onClick={onCatalogueSwitch}>
              <Typography color="inverted" variant="span">
                статья в каталоге
              </Typography>
            </button>

            <Link to={clauseLink} activeClassName={cn(classes.itemActive)}>
              <Typography variant="span">
                основной и дополнительный составы
              </Typography>
            </Link>
            <Link to={`${clauseLink}/parts`}>
              <Typography variant="span">части</Typography>
            </Link>
            <Link to={`${clauseLink}/chronology`}>
              <Typography variant="span">хронология</Typography>
            </Link>
            <Link to={`${clauseLink}/full`}>
              <Typography variant="span">полная статистика</Typography>
            </Link>
          </div>
          <div className={cn(classes.pageContainer)}>
            {isCatalogueOpened ? (
              <div className={cn(classes.floatingCatalogueContainer)}>
                <ClausePageCatalogue
                  onClose={onCatalogueSwitch}
                  year={year}
                  clauseId={clauseNumber}
                />
              </div>
            ) : null}
            <div className={cn(classes.header)}>
              <Typography
                isLineHeightDisabled
                variant="h1"
                className={cn(classes.title)}
              >
                статья{" "}
                <Typography
                  isLineHeightDisabled
                  component="span"
                  className={cn(classes.clauseNumber)}
                >
                  {clauseNumber}
                </Typography>
              </Typography>

              <Typography variant="h3" component="h2">
                {clauseText.ru}
              </Typography>

              <Typography className={cn(classes.docLink)}>
                <OutboundLink target="_blank" href={clauseOutsideLink}>
                  КонсультантПлюс
                </OutboundLink>
              </Typography>
            </div>
            <div>{children}</div>
          </div>
        </Container>
      </main>
    );
  }
}

export default ClausePageLayout;

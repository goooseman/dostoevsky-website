import React, { PureComponent } from "react";
import classes from "./ClausePageLayout.module.css";
import cn from "clsx";
import { Link } from "gatsby";
import Typography from "src/components/ui-kit/Typography";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Container from "src/components/ui-kit/Container";
import ClausePageCatalogue from "src/components/ClausePageCatalogue";
import type { I18nText } from "src/types";
import { getClauseLink } from "src/config/routes";
import ClausePageHeader from "src/components/ClausePageHeader";
import { Menu, MenuLink } from "src/components/Menu";

interface ClausePageLayoutProps {
  clauseNumber: number;
  clauseText: I18nText;
  hasParts?: boolean;
  clauseOutsideLink: string;
  year?: number;
  children: React.ReactNode;
  isCatalogueOpened: boolean;
  onCatalogueSwitch: () => void;
  title: React.ReactNode;
  headerChildren?: React.ReactNode;
  pageType: "main" | "parts" | "chronology" | "full";
}

class ClausePageLayout extends PureComponent<ClausePageLayoutProps> {
  render(): React.ReactNode {
    const {
      clauseNumber,
      clauseOutsideLink,
      clauseText,
      children,
      year,
      isCatalogueOpened,
      onCatalogueSwitch,
      title,
      headerChildren,
      pageType,
      hasParts,
    } = this.props;

    return (
      <main>
        <Container className={cn(classes.container)}>
          <div className={cn(classes.sidebar)}>
            <button
              onClick={onCatalogueSwitch}
              className={cn({ [classes.active]: isCatalogueOpened })}
            >
              <Typography size="small" color="inverted" variant="span">
                статья в каталоге
              </Typography>
              <img src={require("./assets/arrow-right.svg")} />
            </button>

            <Link
              to={getClauseLink(clauseNumber, year, "main")}
              partiallyActive
              activeClassName={cn(classes.itemActive)}
            >
              <Typography size="small" variant="span">
                основной и дополнительный составы
              </Typography>
            </Link>
            {hasParts ? (
              <Link
                to={getClauseLink(clauseNumber, year, "parts")}
                partiallyActive
                activeClassName={cn(classes.itemActive)}
              >
                <Typography size="small" variant="span">
                  части
                </Typography>
              </Link>
            ) : null}

            <Link
              to={getClauseLink(clauseNumber, year, "chronology")}
              partiallyActive
              activeClassName={cn(classes.itemActive)}
            >
              <Typography size="small" variant="span">
                хронология
              </Typography>
            </Link>
            <Link
              to={getClauseLink(clauseNumber, year, "full")}
              activeClassName={cn(classes.itemActive)}
            >
              <Typography size="small" variant="span">
                полная статистика
              </Typography>
            </Link>
          </div>
          <div className={cn(classes.pageContainer)}>
            {isCatalogueOpened ? (
              <div className={cn(classes.floatingCatalogueContainer)}>
                <ClausePageCatalogue
                  onClose={onCatalogueSwitch}
                  year={year || 2019}
                  clauseId={clauseNumber}
                />
              </div>
            ) : null}
            <div className={cn(classes.headerContainer)}>
              <div className={cn(classes.header)}>
                <Typography
                  isLineHeightDisabled
                  variant="h1"
                  font="serif"
                  className={cn(classes.title)}
                >
                  статья{" "}
                  <Typography
                    isLineHeightDisabled
                    component="span"
                    font="serif"
                    className={cn(classes.clauseNumber)}
                  >
                    {clauseNumber}
                  </Typography>
                </Typography>

                <Typography
                  variant="h3"
                  component="h2"
                  className={cn(classes.subtitle)}
                >
                  {clauseText.ru}
                </Typography>

                <Typography className={cn(classes.docLink)}>
                  <OutboundLink target="_blank" href={clauseOutsideLink}>
                    КонсультантПлюс
                  </OutboundLink>
                </Typography>
              </div>
            </div>
            <ClausePageHeader
              title={title}
              year={year}
              clauseNumber={clauseNumber}
              pageType={pageType}
            >
              {headerChildren}
            </ClausePageHeader>
            <Menu variant="activeBorderBottom" className={cn(classes.menu)}>
              <MenuLink to={getClauseLink(clauseNumber, year, pageType)}>
                ЧАРТЫ
              </MenuLink>
              <MenuLink
                to={getClauseLink(clauseNumber, year, pageType, "table")}
              >
                ТАБЛИЦА
              </MenuLink>
            </Menu>
            <div>{children}</div>
          </div>
        </Container>
      </main>
    );
  }
}

export default ClausePageLayout;

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
import Promo from "src/components/Promo";
import { LinkGetProps } from "@reach/router";
import { T, withLocale, WithLocale } from "react-targem";

interface ClausePageLayoutProps extends WithLocale {
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
  chartsLink?: string;
  tableLink?: string;
  isWithoutChartsTablesTabs?: boolean;
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
      chartsLink,
      tableLink,
      isWithoutChartsTablesTabs,
      locale,
    } = this.props;

    return (
      <main>
        <Container className={cn(classes.container)}>
          <div className={cn(classes.innerContainer)}>
            <div className={cn(classes.sidebar)}>
              <div className={cn(classes.sticky)}>
                <button
                  onClick={onCatalogueSwitch}
                  className={cn({ [classes.active]: isCatalogueOpened })}
                >
                  <Typography
                    size="small"
                    color="inverted"
                    variant="span"
                    isUpperCased
                  >
                    статья в каталоге
                  </Typography>
                  <img src={require("./assets/arrow-right.svg")} />
                </button>

                <Link
                  to={getClauseLink(locale, clauseNumber, year, "main")}
                  getProps={this.getMainLinkProps}
                >
                  <Typography size="small" variant="span" isUpperCased>
                    основной и дополнительный составы
                  </Typography>
                </Link>
                {hasParts ? (
                  <Link
                    to={getClauseLink(locale, clauseNumber, year, "parts")}
                    partiallyActive
                    activeClassName={cn(classes.itemActive)}
                  >
                    <Typography size="small" variant="span" isUpperCased>
                      части
                    </Typography>
                  </Link>
                ) : null}

                <Link
                  to={getClauseLink(locale, clauseNumber, year, "chronology")}
                  partiallyActive
                  activeClassName={cn(classes.itemActive)}
                >
                  <Typography size="small" variant="span" isUpperCased>
                    хронология
                  </Typography>
                </Link>
                <Link
                  to={getClauseLink(locale, clauseNumber, year, "full")}
                  activeClassName={cn(classes.itemActive)}
                >
                  <Typography size="small" variant="span" isUpperCased>
                    полная статистика
                  </Typography>
                </Link>
              </div>
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
                  <div className={cn(classes.numberWrapper)}>
                    <div>
                      <Typography
                        isUpperCased
                        variant="span"
                        color="inverted"
                        className={cn(classes.title)}
                      >
                        статья УК РФ
                      </Typography>
                    </div>
                    <Typography
                      isLineHeightDisabled
                      component="span"
                      font="serif"
                      className={cn(classes.clauseNumber)}
                    >
                      {clauseNumber}
                    </Typography>
                  </div>
                  <Typography component="h2" className={cn(classes.subtitle)}>
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
              {!isWithoutChartsTablesTabs ? (
                <Menu
                  id="view-selector"
                  variant="activeBorderBottom"
                  className={cn(classes.menu)}
                >
                  <MenuLink
                    to={
                      chartsLink
                        ? chartsLink + "#view-selector"
                        : getClauseLink(
                            locale,
                            clauseNumber,
                            year,
                            pageType,
                            undefined,
                            "view-selector"
                          )
                    }
                    activeUrls={[
                      new RegExp(
                        `${getClauseLink(
                          locale,
                          clauseNumber,
                          year,
                          pageType,
                          undefined
                        )}$`
                      ),
                      chartsLink,
                    ]}
                  >
                    <T message="Чарты" />
                  </MenuLink>
                  <MenuLink
                    to={
                      tableLink
                        ? tableLink + "#view-selector"
                        : getClauseLink(
                            locale,
                            clauseNumber,
                            year,
                            pageType,
                            "table",
                            "view-selector"
                          )
                    }
                    activeUrls={[
                      getClauseLink(
                        locale,
                        clauseNumber,
                        year,
                        pageType,
                        "table"
                      ),
                      tableLink,
                    ]}
                  >
                    <T message="Таблица" />
                  </MenuLink>
                </Menu>
              ) : null}
              <div>{children}</div>
            </div>
          </div>
        </Container>
        <Promo />
      </main>
    );
  }

  private getMainLinkProps = (props: LinkGetProps) => {
    const notActivePathnames = ["chronology", "parts", "full"];
    for (const notActivePathname of notActivePathnames) {
      if (props.location.pathname.includes(notActivePathname)) {
        return {};
      }
    }
    return {
      className: classes.itemActive,
    };
  };
}

export default withLocale(ClausePageLayout);

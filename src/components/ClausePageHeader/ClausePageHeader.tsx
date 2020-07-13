import React, { PureComponent } from "react";
import classes from "./ClausePageHeader.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { withLocale, WithLocale } from "react-targem";
// TODO: aria-label for div with role="rolebox"; forward props to Dropdown
import Dropdown, { Option } from "react-dropdown-aria";
import { getClauseLink } from "src/config/routes";

interface ClausePageHeaderProps extends WithLocale {
  title: React.ReactNode;
  year: number;
  years: number[];
  clauseNumber: number;
  pageType: "main" | "parts" | "chronology" | "full";
}

class ClausePageHeader extends PureComponent<ClausePageHeaderProps> {
  render(): React.ReactNode {
    const { title, t, year } = this.props;
    return (
      <div className={cn(classes.container)}>
        <div className={cn(classes.textContainer)}>
          <Typography component="h3" variant="h1" font="serif">
            {title}
          </Typography>
        </div>
        <div>
          <Dropdown
            ariaLabel={t("Select year")}
            className={cn(classes.dropdown)}
            contentClassName={cn(classes.dropdownList)}
            options={this.getDropdownOptions()}
            optionItemRenderer={this.renderOption}
            onChange={this.handleChange}
            value={year.toString()}
            searchable={false}
            arrowRenderer={this.renderArrow}
          />
        </div>
      </div>
    );
  }

  private getDropdownOptions = (): { value: string }[] => {
    return this.props.years.map((y) => ({
      value: y.toString(),
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private handleChange = () => {};

  private renderOption = (props: { option: Option }): React.ReactElement => {
    const { option } = props;
    const { clauseNumber, year, pageType } = this.props;
    return (
      <Typography>
        <a
          href={getClauseLink(
            clauseNumber.toString(),
            year.toString(),
            pageType
          )}
        >
          {option.value}
        </a>
      </Typography>
    );
  };

  private renderArrow = () => {
    const { t } = this.props;
    return <img src={require("./assets/down.svg")} alt={t("Down arrow")} />;
  };
}

export default withLocale(ClausePageHeader);

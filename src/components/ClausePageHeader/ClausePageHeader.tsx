import React, { PureComponent } from "react";
import classes from "./ClausePageHeader.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { withLocale, WithLocale, T } from "react-targem";
import Select, { components } from "react-select";
import { getClauseLink } from "src/config/routes";

interface ClausePageHeaderProps extends WithLocale {
  title: React.ReactNode;
  year?: number;
  years: number[];
  clauseNumber: number;
  pageType: "main" | "parts" | "chronology" | "full";
  children?: React.ReactNode;
}

class ClausePageHeader extends PureComponent<ClausePageHeaderProps> {
  render(): React.ReactNode {
    const { title, year, children } = this.props;
    const yearOptions = this.getDropdownOptions();
    return (
      <div className={classes.header}>
        <div className={cn(classes.container)}>
          <div className={cn(classes.textContainer)}>
            <Typography component="h3" variant="h1" font="serif">
              {title}
            </Typography>
          </div>
          {year ? (
            <Select
              className={cn(classes.yearSelect)}
              components={{
                Control: this.renderControl,
                ValueContainer: this.renderValueContainer,
                IndicatorsContainer: this.renderIndicatorsContainer,
                DropdownIndicator: this.renderDropdownIndicator,
                SingleValue: this.renderSingleValue,
                Menu: this.renderMenu,
                MenuList: this.renderMenuList,
                Option: this.renderOption,
                IndicatorSeparator: null,
              }}
              isSearchable={false}
              options={this.getDropdownOptions()}
              value={yearOptions.find((y) => y.value === year.toString())}
              onChange={this.handleChange}
            />
          ) : null}
        </div>
        {children}
      </div>
    );
  }

  private getDropdownOptions = (): { value: string }[] => {
    return this.props.years.map((y) => ({
      value: y.toString(),
      label: y.toString(),
    }));
  };

  private renderControl = (props: object) => {
    return (
      <components.Control
        {...props}
        className={cn(classes.yearSelectControl)}
      />
    );
  };

  private renderValueContainer = (props: { children: React.ReactNode }) => {
    return (
      <components.ValueContainer
        {...props}
        className={cn(classes.yearSelectValueContainer)}
      >
        <div className={cn(classes.yearSelectValueContainerLabel)}>
          <Typography>
            <T message="год" />
          </Typography>
        </div>
        {props.children}
      </components.ValueContainer>
    );
  };

  private renderIndicatorsContainer = (props: object) => {
    return (
      <components.IndicatorsContainer
        {...props}
        className={cn(classes.yearSelectIndicatorsContainer)}
      />
    );
  };

  private renderDropdownIndicator = (props: object) => {
    const { t } = this.props;
    return (
      <components.DropdownIndicator {...props}>
        <img src={require("./assets/down.svg")} alt={t("Down arrow")} />
      </components.DropdownIndicator>
    );
  };

  private renderSingleValue = (props: { children: React.ReactNode }) => (
    <components.SingleValue
      {...props}
      className={cn(classes.yearSelectSingleValue)}
    >
      {props.children}
    </components.SingleValue>
  );

  private renderMenu = (props: { children: React.ReactNode }) => {
    return (
      <components.Menu {...props} className={cn(classes.yearSelectMenu)}>
        {props.children}
      </components.Menu>
    );
  };

  private renderMenuList = (props: { children: React.ReactNode }) => {
    return (
      <components.MenuList
        {...props}
        className={cn(classes.yearSelectMenuList)}
      >
        {props.children}
      </components.MenuList>
    );
  };

  private renderOption = (props: { value: string }) => {
    const { clauseNumber, pageType } = this.props;
    return (
      <components.Option {...props} className={cn(classes.yearSelectOption)}>
        <Typography component="span">
          <a
            href={getClauseLink(clauseNumber.toString(), props.value, pageType)}
          >
            {props.value}
          </a>
        </Typography>
      </components.Option>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private handleChange = () => {};
  // private handleChange = (data: { value: string }) => {};
}
export default withLocale(ClausePageHeader);

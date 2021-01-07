import React, { PureComponent } from "react";
import classes from "./ClausePageHeader.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { withLocale, WithLocale, T } from "react-targem";
import Select, {
  components,
  ControlProps,
  IndicatorContainerProps,
  IndicatorProps,
  MenuProps,
  OptionTypeBase,
  SingleValueProps,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import { getClauseLink } from "src/config/routes";
import { MenuListComponentProps } from "react-select/src/components/Menu";

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

  private renderControl = (props: ControlProps<OptionTypeBase>) => {
    return (
      <components.Control
        {...props}
        className={cn(classes.yearSelectControl)}
      />
    );
  };

  private renderValueContainer = (
    props: ValueContainerProps<OptionTypeBase>
  ) => {
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

  private renderIndicatorsContainer = (
    props: IndicatorContainerProps<OptionTypeBase>
  ) => {
    return (
      <components.IndicatorsContainer
        {...props}
        className={cn(classes.yearSelectIndicatorsContainer)}
      />
    );
  };

  private renderDropdownIndicator = (props: IndicatorProps<OptionTypeBase>) => {
    const { t } = this.props;
    return (
      <components.DropdownIndicator {...props}>
        <>
          <div className={cn(classes.yearSelectIndicatorOverlay)}></div>
          <img src={require("./assets/down.svg")} alt={t("Down arrow")} />
        </>
      </components.DropdownIndicator>
    );
  };

  private renderSingleValue = (props: SingleValueProps<OptionTypeBase>) => (
    <components.SingleValue
      {...props}
      className={cn(classes.yearSelectSingleValue)}
    >
      {props.children}
    </components.SingleValue>
  );

  private renderMenu = (props: MenuProps<OptionTypeBase>) => {
    return (
      <components.Menu {...props} className={cn(classes.yearSelectMenu)}>
        {props.children}
      </components.Menu>
    );
  };

  private renderMenuList = (props: MenuListComponentProps<OptionTypeBase>) => {
    return (
      <components.MenuList
        {...props}
        className={cn(classes.yearSelectMenuList)}
      >
        {props.children}
      </components.MenuList>
    );
  };

  private renderOption = (props: OptionProps<OptionTypeBase>) => {
    const { clauseNumber, pageType } = this.props;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = props.value;
    return (
      <components.Option {...props} className={cn(classes.yearSelectOption)}>
        <Typography component="span">
          <a
            className={cn(classes.yearSelectOptionLink)}
            href={getClauseLink(clauseNumber.toString(), value, pageType)}
          >
            {value}
          </a>
        </Typography>
      </components.Option>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private handleChange = () => {};
}
export default withLocale(ClausePageHeader);

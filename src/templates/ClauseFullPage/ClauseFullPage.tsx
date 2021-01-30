import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import Checkbox from "src/components/ui-kit/Checkbox";
import classes from "./ClauseFullPage.module.css";
import cn from "clsx";
import { getCsv } from "src/utils/csv";
import { saveAs } from "file-saver";

const accordionData = [
  {
    title: "Основные параметры",
    id: "mainParameters",
    children: [
      { title: "Всего осуждено", id: "totalConvicted" },
      { title: "Оправдано", id: "acquittal" },
      {
        title: "Доп. квалификация: осуждено",
        id: "addTotal",
        children: [
          { title: "по числу лиц", id: "addTotalPersons" },
          {
            title: "по количеству составов преступлений",
            id: "addTotalOffences",
          },
        ],
      },
      {
        title: "Доп. квалификация: оправдано",
        id: "addAcquittal",
        children: [
          { title: "по числу лиц", id: "addAcquittalPersons" },
          {
            title: "по количеству составов преступлений",
            id: "addAcquittalOffences",
          },
        ],
      },
      {
        title:
          "Прекращено за отсутствием события, состава, непричастности к преступлению (число лиц)",
        id: "dismissalAbsenceOfEvent",
      },
      {
        title: "Доп. квалификация: прекращено",
        id: "addDismissal",
        children: [
          { title: "по числу лиц", id: "addDismissalPersons" },
          {
            title: "по количеству составов преступлений",
            id: "addDismissalOffences",
          },
        ],
      },
      { title: "Прекращено по иным основаниям", id: "dismissalOther" },
      {
        title: "Доп. квалификация: прекращено по иным основаниям",
        id: "addDismissalOther",
        children: [
          { title: "по числу лиц", id: "addDismissalOtherPersons" },
          {
            title: "по количеству составов преступлений",
            id: "addDismissalOtherOffences",
          },
        ],
      },
      {
        title: "Прекращено в связи с деятельным раскаянием",
        id: "dismissalRepentance",
      },
      { title: "Судебный штраф", id: "dismissalCourtFine" },
      {
        title:
          "Принудительные меры медицинского характера в отношении невменяемого (число лиц)",
        id: "coerciveMeasures",
      },
      {
        title:
          "Доп. квалификация: признано невменяемыми по количеству составов преступлений",
        id: "addUnfitToPleadOffences",
      },
      {
        title: "Преступление не является оконченным (приготовление, покушение)",
        id: "unfinishedOffence",
      },
    ],
  },
  { title: "Виды основного наказания", id: "typesOfBasicPunishment" },
  {
    title: "Освобождено от наказания или наказание не назначалось (число лиц)",
    id: "noPunishment",
  },
  { title: "Прекращено", id: "terminated" },
  { title: "Дополнительное наказание", id: "additionalPunishment" },
  {
    title: "Деяние совершено при обстоятельствах, исключающих преступность",
    id: "precludingCriminality",
  },
  { title: "Общая сумма штрафов (руб.)", id: "fineAmount" },
];

const getValueFromEdges = (id: string, data: any) => {
  return data.parts.edges.reduce((a: string | number, c: any) => {
    if (id in c.node.parameters) {
      a = a === "-" ? c.node.parameters[id] : a + c.node.parameters[id];
    }
    return a;
  }, "-");
};

interface ClauseFullPageProps {
  clauseNumber: number;
  year: number;
  partsCount: number;
  data: any;
}

interface ClauseFullPageState {
  selected: {
    [id: string]: boolean;
  };
  allSelected: boolean;
  splitByArticle: boolean;
}

class ClauseFullPage extends PureComponent<
  ClauseFullPageProps,
  ClauseFullPageState
> {
  constructor(props: ClauseFullPageProps) {
    super(props);
    this.state = {
      selected: {},
      allSelected: false,
      splitByArticle: false,
    };
  }

  private handleToggleAllSelected(e: any) {
    const { checked } = e.target;

    const newSelected: any = {};

    accordionData.forEach((a) => {
      newSelected[a.id] = checked;
      if (a.children) {
        a.children.map((ac) => {
          newSelected[ac.id] = checked;
          if (ac.children) {
            ac.children.forEach((acc) => {
              newSelected[acc.id] = checked;
            });
          }
        });
      }
    });

    this.setState({ selected: newSelected, allSelected: checked });
  }

  private handleToggleSplitByArticle(e: any) {
    const { checked } = e.target;

    this.setState({ splitByArticle: checked });
  }

  private handleToggleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;
    const { selected } = this.state;

    const newSelected = { ...selected };

    accordionData.forEach((a) => {
      if (a.id === id) {
        newSelected[a.id] = checked;
        if (a.children) {
          a.children.forEach((ac) => {
            newSelected[ac.id] = checked;
            if (ac.children) {
              ac.children.forEach((acc) => {
                newSelected[acc.id] = checked;
              });
            }
          });
        }
      } else {
        if (a.children) {
          a.children.forEach((ac) => {
            if (ac.id === id) {
              newSelected[ac.id] = checked;
              if (ac.children) {
                ac.children.forEach((acc) => {
                  newSelected[acc.id] = checked;
                });
              }
            } else {
              if (ac.children) {
                ac.children.forEach((acc) => {
                  if (acc.id === id) {
                    newSelected[acc.id] = checked;
                  }
                });
              }
            }
          });
        }
      }
    });

    this.setState({ selected: newSelected });
  }

  private handleGetCsv() {
    const { data, year, clauseNumber, partsCount } = this.props;
    const { selected, splitByArticle } = this.state;

    const table: {
      columns: { key: string; title: string }[];
      rows: {
        key: string | number;
        values: { key: string; value: string | number }[];
      }[];
    } = {
      columns: [],
      rows: [
        {
          key:
            partsCount > 0 ? `${data.parts.edges[0].node.part}-${year}` : year,
          values: [],
        },
      ],
    };

    accordionData.forEach((a) => {
      if (a.children) {
        a.children.forEach((ac) => {
          if (!ac.children) {
            if (selected[ac.id]) {
              table.columns.push({ title: ac.title, key: ac.id });
              if (partsCount > 0 && splitByArticle) {
                data.parts.edges.forEach((e: any, i: number) => {
                  if (table.rows.length - 1 < i) {
                    table.rows.push({
                      key: `${e.node.part}-${year}`,
                      values: [],
                    });
                  }
                  table.rows[i].values.push({
                    key: ac.id,
                    value: e.node.parameters[ac.id],
                  });
                });
              } else {
                table.rows[0].values.push({
                  key: ac.id,
                  value: getValueFromEdges(ac.id, data),
                });
              }
            }
          } else {
            ac.children.forEach((acc) => {
              if (selected[acc.id]) {
                table.columns.push({
                  title: `${ac.title} ${acc.title}`,
                  key: acc.id,
                });
                if (partsCount > 0 && splitByArticle) {
                  data.parts.edges.forEach((e: any, i: number) => {
                    if (table.rows.length - 1 < i) {
                      table.rows.push({
                        key: `${e.node.part}-${year}`,
                        values: [],
                      });
                    }
                    table.rows[i].values.push({
                      key: acc.id,
                      value: e.node.parameters[acc.id],
                    });
                  });
                } else {
                  table.rows[0].values.push({
                    key: acc.id,
                    value: getValueFromEdges(acc.id, data),
                  });
                }
              }
            });
          }
        });
      }
    });

    if (partsCount > 0 && splitByArticle) {
      table.columns.unshift({ title: "Статья", key: "clause" });
      data.parts.edges.forEach((e: any, i: number) => {
        table.rows[i].values.unshift({ value: e.node.part, key: "clause" });
      });
    }

    const csvContent = getCsv([table], 0);
    saveAs(
      csvContent,
      `Полная статистика по статье №${clauseNumber} за ${year}.csv`
    );
  }

  render(): React.ReactNode {
    const { clauseNumber, year, partsCount } = this.props;
    const { selected, allSelected, splitByArticle } = this.state;

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Полная статистика"
        pageType="full"
        isWithoutChartsTablesTabs
        hasParts={partsCount > 0}
      >
        <div className={cn(classes.clauseFullPageWrapper)}>
          <div>
            <Typography>
              <T message="Вы можете выбрать интересующие вас параметры и скачать данные в формате .csv: " />
            </Typography>
            <div className={cn(classes.clauseFullPageTopElementWrapper)}>
              <Checkbox
                id="allSelected"
                checked={allSelected}
                onChange={(e) => this.handleToggleAllSelected(e)}
              />
              <Typography className={cn(classes.clauseFullPageElementTitle)}>
                <T message="Выбрать все параметры" />
              </Typography>
            </div>
            {partsCount > 0 ? (
              <div className={cn(classes.clauseFullPageTopElementWrapper)}>
                <Checkbox
                  id="splitByArticle"
                  checked={splitByArticle}
                  onChange={(e) => this.handleToggleSplitByArticle(e)}
                />
                <Typography className={cn(classes.clauseFullPageElementTitle)}>
                  <T message="Разбить по частям" />
                </Typography>
              </div>
            ) : null}
            <Accordion>
              {accordionData.map((a) => (
                <AccordionNode
                  key={a.id}
                  title={
                    <div
                      className={cn(
                        classes.clauseFullPageElementPrimaryWrapper
                      )}
                    >
                      <Checkbox
                        id={a.id}
                        checked={selected[a.id]}
                        onChange={this.handleToggleCheckbox}
                      />
                      <Typography
                        className={cn(classes.clauseFullPageElementTitle)}
                      >
                        <b>
                          <T message={a.title} />
                        </b>
                      </Typography>
                    </div>
                  }
                  variant="primary"
                >
                  {a.children
                    ? a.children.map((ac) => (
                        <>
                          <div
                            key={ac.id}
                            className={cn(
                              classes.clauseFullPageElementSecondaryWrapper
                            )}
                          >
                            <Checkbox
                              id={ac.id}
                              checked={selected[ac.id]}
                              onChange={(e) => this.handleToggleCheckbox(e)}
                            />
                            <Typography
                              className={cn(classes.clauseFullPageElementTitle)}
                            >
                              <T message={ac.title} />
                            </Typography>
                          </div>
                          {ac.children
                            ? ac.children.map((acc) => (
                                <div
                                  key={acc.id}
                                  className={cn(
                                    classes.clauseFullPageElementSecondaryWrapper,
                                    classes.clauseFullPageElementThirdWrapper
                                  )}
                                >
                                  <Checkbox
                                    id={acc.id}
                                    checked={selected[acc.id]}
                                    onChange={(e) =>
                                      this.handleToggleCheckbox(e)
                                    }
                                  />
                                  <Typography
                                    className={cn(
                                      classes.clauseFullPageElementTitle
                                    )}
                                  >
                                    <T message={acc.title} />
                                  </Typography>
                                </div>
                              ))
                            : null}
                        </>
                      ))
                    : null}
                </AccordionNode>
              ))}
            </Accordion>
          </div>
          <div className={cn(classes.clauseFullPageDownloadWrapper)}>
            <button
              className={cn(classes.clauseFullPageDownloadButton)}
              onClick={() => this.handleGetCsv()}
            />
          </div>
        </div>
      </ClausePageLayout>
    );
  }
}
export default ClauseFullPage;

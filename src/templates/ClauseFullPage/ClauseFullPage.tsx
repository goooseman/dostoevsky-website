import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";
import { T, withLocale, WithLocale } from "react-targem";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import Checkbox from "src/components/ui-kit/Checkbox";
import classes from "./ClauseFullPage.module.css";
import cn from "clsx";
import { Helmet } from "react-helmet";
import FullDatasetDownloadModal, {
  Table,
} from "src/components/FullDatasetDownloadModal";

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
  {
    title: "Виды основного наказания",
    id: "typesOfBasicPunishment",
    children: [
      {
        title: "Пожизненное лишение свободы",
        id: "primaryLifeSentence",
      },
      {
        title: "Лишение свободы",
        id: "primaryImprisonment",
        children: [
          {
            title: "до 1 года включительно",
            id: "primaryImprisonment1",
          },
          {
            title: "от 1 до 3 лет включительно",
            id: "primaryImprisonment1_3",
          },
          {
            title: "свыше 1 до 2 лет включительно",
            id: "primaryImprisonment1_2",
          },
          {
            title: "свыше 2 до 3 лет включительно",
            id: "primaryImprisonment2_3",
          },
          {
            title: "свыше 3 до 5 лет включительно",
            id: "primaryImprisonment3_5",
          },
          {
            title: "свыше 5 до 8 лет включительно",
            id: "primaryImprisonment5_8",
          },
          {
            title: "свыше 8 до 10 лет включительно",
            id: "primaryImprisonment8_10",
          },
          {
            title: "свыше 10 до 15 лет включительно",
            id: "primaryImprisonment10_15",
          },
          {
            title: "свыше 15 до 20 лет включительно",
            id: "primaryImprisonment15_20",
          },
        ],
      },
      {
        title: "Наказание назначено ниже низшего предела",
        id: "primaryImprisonmentUnderLowerLimit",
      },
      {
        title: "Условное осуждение к лишению свободы",
        id: "primarySuspended",
      },
      {
        title: "Содержание в дисциплинарной воинской части",
        id: "primaryMilitaryDisciplinaryUnit",
      },
      {
        title: "Арест",
        id: "primaryArrest",
      },
      {
        title: "Ограничение свободы",
        id: "primaryRestrain",
      },
      {
        title: "Ограничения по воинской службе",
        id: "primaryRestrictionsInMilitaryService",
      },
      {
        title: "Работы",
        id: "labour",
        children: [
          {
            title: "исправительные работы",
            id: "primaryCorrectionalLabour",
          },
          {
            title: "обязательные работы",
            id: "primaryCommunityService",
          },
          {
            title: "принудительные работы",
            id: "primaryForcedLabour",
          },
        ],
      },
      {
        title:
          "Лишение права занимать определенные должности или заниматься определенной деятельностью",
        id: "primaryDisqualification",
      },
      {
        title: "Штраф",
        id: "primaryFine",
        children: [
          {
            title: "до 5 тыс.",
            id: "primaryFine5",
          },
          {
            title: "свыше 5 тыс. до 25 тыс.",
            id: "primaryFine5_25",
          },
          {
            title: "свыше 25 тыс. до 100 тыс.",
            id: "primaryFine25_100",
          },
          {
            title: "свыше 100 тыс. до 300 тыс.",
            id: "primaryFine100_300",
          },
          {
            title: "свыше 300 тыс. до 500 тыс.",
            id: "primaryFine300_500",
          },
          {
            title: "свыше 500 тыс. до 1 млн",
            id: "primaryFine500_1M",
          },
          {
            title: "свыше 1 млн",
            id: "primaryFine1M",
          },
        ],
      },
      {
        title: "Условное осуждение к иным мерам",
        id: "primaryOther",
      },
    ],
  },
  {
    title: "Освобождено от наказания или наказание не назначалось (число лиц)",
    id: "noPunishment",
    children: [
      {
        title:
          "В связи с зачетом срока содержания под стражей, домашнего ареста",
        id: "exemptionFromImprisonment",
      },
      {
        title: "По амнистии",
        id: "exemptionAmnesty",
      },
      {
        title: "По другим основаниям",
        id: "exemptionOther",
      },
    ],
  },
  {
    title: "Прекращено",
    id: "terminated",
    children: [
      {
        title: "Прекращено по амнистии",
        id: "dismissalAmnesty",
      },
      {
        title: "Прекращено за примирением с потерпевшим",
        id: "dismissalReconciliation",
      },
      {
        title: "Прекращено в связи с деятельным раскаянием",
        id: "dismissalRepentance",
      },
      {
        title: "Назначена мера уголовно-правового характера судебный штраф",
        id: "dismissalCourtFine",
      },
      {
        title:
          "На основании примечаний к статьям УК РФ (в том числе в связи с деятельным раскаянием ч. 2 ст. 28 УПК РФ)",
        id: "dismissalOther",
      },
    ],
  },
  {
    title: "Дополнительное наказание",
    id: "additionalPunishment",
    children: [
      {
        title:
          "Лишение права занимать определенные должности или заниматься определенной деятельностью",
        id: "addDisqualification",
      },
      {
        title: "Штраф",
        id: "addFine",
        children: [
          {
            title: "до 5 тысяч рублей",
            id: "addFine5",
          },
          {
            title: "свыше 5 тыс. до 25 тыс. рублей",
            id: "addFine5_25",
          },
          {
            title: "свыше 25 тыс. до 500 тыс. рублей",
            id: "addFine25_500",
          },
          {
            title: "свыше 100 тыс. до 300 тыс. рублей",
            id: "addFine100_300",
          },
          {
            title: "свыше 300 тыс. до 500 тыс. рублей",
            id: "addFine300_500",
          },
          {
            title: "свыше 500 тыс. до 1 млн рублей",
            id: "addFine500_1M",
          },
          {
            title: "свыше 1 млн рублей",
            id: "addFine1M",
          },
        ],
      },
      {
        title:
          "лишение специального, воинского или почетного звания, классного чина и государственных наград",
        id: "addTitlesWithdraw",
      },
      {
        title: "ограничение свободы",
        id: "addRestrain",
      },
    ],
  },
  {
    title: "Деяние совершено при обстоятельствах, исключающих преступность",
    id: "precludingCriminality",
    children: [
      {
        title: "Необходимая оборона",
        id: "noCrimeSelfDefence",
      },
      {
        title: "Крайняя необходимость",
        id: "noCrimeNecessity",
      },
      {
        title:
          "Обстоятельства, исключающие преступность, предусмотренные статьями 38, 40 - 42 УК РФ",
        id: "noCrimeOther",
      },
    ],
  },
  {
    title: "Общая сумма штрафов (руб.)",
    id: "fineAmount",
    children: [
      {
        title: "Основное наказание",
        id: "primaryFineSum",
      },
      {
        title: "Дополнительное наказание",
        id: "addFineSum",
      },
    ],
  },
];

const getValueFromEdges = (id: string, data: any) => {
  return data.parts.edges.reduce((a: string | number, c: any) => {
    if (id in c.node.parameters) {
      a = a === "-" ? c.node.parameters[id] : a + c.node.parameters[id];
    }
    return a;
  }, "-");
};

interface ClauseFullPageProps extends WithLocale {
  clauseNumber: number;
  year: number;
  partsCount: number;
  data: any;
}

interface ClauseFullPageState {
  selected: {
    [id: string]: boolean;
  };
  isModalOpened: boolean;
  allSelected: boolean;
  splitByArticle: boolean;
  tables?: Table[];
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
      isModalOpened: false,
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

  private handleDownloadButtonClick = () => {
    this.setState({
      tables: [this.getTable()],
    });
    this.handleDownloadModalToggle();
  };

  private handleDownloadModalToggle = () => {
    this.setState((s) => ({
      isModalOpened: !s.isModalOpened,
    }));
  };

  private handleToggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  private getTable(): Table {
    const { data, partsCount } = this.props;
    const { selected, splitByArticle } = this.state;

    const table: Table = {
      columns: [],
      rows: [
        {
          values: [],
        },
      ],
    };

    accordionData.forEach((a) => {
      if (a.children) {
        a.children.forEach((ac) => {
          if (!ac.children) {
            if (selected[ac.id]) {
              table.columns.push({
                title: `${a.title} / ${ac.title}`,
              });
              if (partsCount > 0 && splitByArticle) {
                data.parts.edges.forEach((e: any, i: number) => {
                  if (table.rows.length - 1 < i) {
                    table.rows.push({
                      values: [],
                    });
                  }
                  table.rows[i].values.push({
                    value: e.node.parameters[ac.id],
                  });
                });
              } else {
                table.rows[0].values.push({
                  value: getValueFromEdges(ac.id, data),
                });
              }
            }
          } else {
            ac.children.forEach((acc) => {
              if (selected[acc.id]) {
                table.columns.push({
                  title: `${a.title} / ${ac.title} / ${acc.title}`,
                });
                if (partsCount > 0 && splitByArticle) {
                  data.parts.edges.forEach((e: any, i: number) => {
                    if (table.rows.length - 1 < i) {
                      table.rows.push({
                        values: [],
                      });
                    }
                    table.rows[i].values.push({
                      value: e.node.parameters[acc.id],
                    });
                  });
                } else {
                  table.rows[0].values.push({
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
      table.columns.unshift({ title: "Статья" });
      data.parts.edges.forEach((e: any, i: number) => {
        table.rows[i].values.unshift({ value: e.node.part });
      });
    }
    return table;
  }

  render(): React.ReactNode {
    const { clauseNumber, year, partsCount, t } = this.props;
    const {
      selected,
      allSelected,
      splitByArticle,
      isModalOpened,
      tables,
    } = this.state;

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title={<T message="Полная статистика" />}
        pageType="full"
        isWithoutChartsTablesTabs
        hasParts={partsCount > 0}
      >
        <div className={cn(classes.clauseFullPageWrapper)}>
          <div>
            <Helmet defer={false}>
              <title>
                {`${t("Статья")} ${clauseNumber} | ${t("Полная статистика")}`}
              </title>
              <meta
                name="description"
                content={t(
                  "Вы можете выбрать интересующие вас параметры и скачать данные в формате .csv:"
                )}
              />
            </Helmet>
            <Typography>
              <T message="Вы можете выбрать интересующие вас параметры и скачать данные в формате .csv: " />
            </Typography>
            <div className={cn(classes.clauseFullPageTopElementWrapper)}>
              <Checkbox
                id="allSelected"
                checked={allSelected}
                onChange={(e) => this.handleToggleAllSelected(e)}
                label={<T message="Выбрать все параметры" />}
              />
            </div>
            {partsCount > 0 ? (
              <div className={cn(classes.clauseFullPageTopElementWrapper)}>
                <Checkbox
                  id="splitByArticle"
                  checked={splitByArticle}
                  label={<T message="Разбить по частям" />}
                  onChange={this.handleToggleSplitByArticle}
                />
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
                        label={
                          <b>
                            <T message={a.title} />
                          </b>
                        }
                      />
                    </div>
                  }
                  variant="primary"
                >
                  {a.children
                    ? a.children.map((ac) => (
                        <React.Fragment key={ac.id}>
                          <div
                            className={cn(
                              classes.clauseFullPageElementSecondaryWrapper
                            )}
                          >
                            <Checkbox
                              id={ac.id}
                              checked={selected[ac.id]}
                              label={<T message={ac.title} />}
                              onChange={this.handleToggleCheckbox}
                            />
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
                                    onChange={this.handleToggleCheckbox}
                                    label={<T message={acc.title} />}
                                  />
                                </div>
                              ))
                            : null}
                        </React.Fragment>
                      ))
                    : null}
                </AccordionNode>
              ))}
            </Accordion>
          </div>
          <div className={cn(classes.clauseFullPageDownloadWrapper)}>
            <button
              disabled={
                Object.values(selected).filter((v) => v === true).length === 0
              }
              className={cn(classes.clauseFullPageDownloadButton)}
              onClick={this.handleDownloadButtonClick}
            />
          </div>
        </div>
        <FullDatasetDownloadModal
          type="clause"
          filename={t(
            "Полная статистика по статье №{{ clauseNumber }} за {{ year }}",
            {
              clauseNumber,
              year,
            }
          )}
          isShowing={isModalOpened}
          toggle={this.handleDownloadModalToggle}
          loadingDataset={false}
          tables={tables}
        />
      </ClausePageLayout>
    );
  }
}
export default withLocale(ClauseFullPage);

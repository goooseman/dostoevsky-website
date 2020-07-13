import React, { PropsWithChildren } from "react";
import ClausePageHeader from "./ClausePageHeader";
import { action } from "@storybook/addon-actions";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";

export default {
  title: "components/ClausePageHeader",
  component: ClausePageHeader,
};

const defaultProps = {
  title: "Основной и дополнительный составы",
  year: 2019,
  pageType: "main",
  clauseNumber: 282,
  onYearSelected: action("onYearSelected"),
  years: [
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
  ] as number[],
} as const;

const Container: React.SFC<PropsWithChildren<{}>> = (
  props: PropsWithChildren<{}>
) => <div style={{ height: 1000 }}>{props.children}</div>;

export const withTitle = (): React.ReactNode => (
  <Container>
    <ClausePageHeader {...defaultProps} />
  </Container>
);

const partOneDescription =
  'Действия, направленные на возбуждение ненависти либо вражды, а также на унижение достоинства человека либо группы лиц по признакам пола, расы, национальности, языка, происхождения, отношения к религии, а равно принадлежности к какой-либо социальной группе, совершенные публично, в том числе с использованием средств массовой информации либо информационно-телекоммуникационных сетей, включая сеть "Интернет", лицом после его привлечения к административной ответственности за аналогичное деяние в течение одного года, – наказываются штрафом в размере от трехсот тысяч до пятисот тысяч рублей или в размере заработной платы или иного дохода осужденного за период от двух до трех лет, либо принудительными работами на срок от одного года до четырех лет с лишением права занимать определенные должности или заниматься определенной деятельностью на срок до трех лет, либо лишением свободы на срок от двух до пяти лет.';

export const withChildren = (): React.ReactNode => (
  <Container>
    <ClausePageHeader {...defaultProps} title="Части">
      <Accordion isOpened={false}>
        <AccordionNode title="Часть 1" variant="horizontal">
          {partOneDescription}
        </AccordionNode>
        <AccordionNode title="Часть 2" variant="horizontal">
          Часть два
        </AccordionNode>
      </Accordion>
    </ClausePageHeader>
  </Container>
);

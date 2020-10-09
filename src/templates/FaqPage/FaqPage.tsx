import React, { useState } from "react";
import classes from "./FaqPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import SinglePageLayout from "src/components/SinglePageLayout";
import { T } from "react-targem";
import { Menu, MenuItem } from "src/components/Menu";

const faqData = [
  {
    id: "glossary",
    title: "Глоссарий",
    data: [
      {
        title: "Штраф",
        content: (
          <Typography>
            <T message="Штрафы не рекомендует связывать, так как за штрафами скрываются разные истории: штраф как основное наказание говорит нам о ситуациях, когда человек заплатил штраф и свободен, а штраф как дополнительное – человек отбывает более строгое наказание и еще штраф платит. Если эти цифры сложить, то получится путаница. " />
          </Typography>
        ),
      },
      {
        title: "Составы преступления",
        content: (
          <Typography>
            <T message="Преступления часто совершаются в совокупности, например: убийство, ограбление и угон одновременно. В таком случае основное наказание назначается по самой тяжелой статье (в нашем примере это убийство). Грабеж и угон, в этом случае, попадут в статистику по дополнительному составу. У кого-то грабеж - основная статья, у кого-то - дополнительная, а сложив их, вы получите реальное количество грабежей." />
          </Typography>
        ),
      },
      {
        title: "Судебный штраф",
        content: (
          <Typography>
            <T message="Судебный штраф, – основание для прекращения дела – нельзя складывать с показателями «Штраф». Это достаточно новая конструкция в российском уголовном праве. Смысл в том, чтобы меньше привлекать к уголовке людей. Если человек впервые совершил преступление небольшой и средней тяжести (до 5 лет лишения свободы) и загладил ущерб, примирился и т.д., то его могут освободить от уголовной ответственности, назначив судебный штраф." />{" "}
            <b>
              <T message="И человек официально не будет судим и т.д. Если назначают обычный штраф как наказание, то человек считается судимым." />
            </b>
          </Typography>
        ),
      },
      {
        title:
          "Чем отличается «Прекращено по другим основаниям» от «Освобождено от наказания: по другим основаниям»? В обоих случая человек не признается виновным?",
        content: (
          <Typography>
            <T message="Нет, в случае прекращения человек не признается виновным," />{" "}
            <b>
              <T message="а в случае освобождения – признается виновным, но освобождается от наказания (например, из-за болезни и т.д.)." />
            </b>
          </Typography>
        ),
      },
      {
        title:
          "Что значит «Преступление не является оконченным (приготовление, покушение)» - человек не лишается свободы?",
        content: (
          <Typography>
            <T message="Нет, это значит, что человек признается виновным, допустим, не в убийстве, а в приготовлениях или в покушении на убийство. Это тоже преступление. Наш УК содержит наказания не только за оконченные действия, но и за приготовления и покушения (по некоторым видам преступлений). Судстат это отдельно отмечает." />
          </Typography>
        ),
      },
      {
        title: "Дополнительное наказание",
        content: (
          <Typography>
            <T message="Поскольку один человек мог получить несколько дополнительных статей, то цифры по разным статьям нельзя складывать. Например, в 2018 году 100 человек осудили по доп. статье за грабеж и 100 - за угон. Это не значит, что всего их было 200, т.к. один человек, как в примере, мог и ограбить, и угнать." />
          </Typography>
        ),
      },
      {
        title:
          "Чем отличается дополнительное наказание и от дополнительной квалификации?",
        content: (
          <Typography>
            <T message="Дополнительные наказания, это отдельный вид наказаний. Например, человека могут посадить и оштрафовать: лишение свободы - основное наказание, а штраф - дополнительное. Есть такие наказания, которые бывают только дополнительными. Например, лишение специального звания." />{" "}
            <b>
              <T message="Дополнительная квалификация относится к самому преступлению." />
            </b>{" "}
            <T message="Например, можно убить и ограбить. Тогда основным преступлением (квалификацией) будет убийство (более тяжкое), а дополнительным - грабеж." />
          </Typography>
        ),
      },
      {
        title:
          "Чем отличается обязательные работы от принудительных работ и исправительных работ? Это вид наказания?",
        content: null,
      },
    ],
  },
  { id: "howWasCollected", title: "Как собирались эти данные", data: [] },
];

const FaqPage: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("glossary");

  const handleClickMenuItem = (menuItemId: string) => {
    setActiveMenuItem(menuItemId);
  };

  const currentFaqItem = faqData.find((d) => d.id == activeMenuItem);

  return (
    <main className={cn(classes.container)}>
      <Container>
        <SinglePageLayout>
          <div className={cn(classes.searchButton)}>
            <img src={require("./assets/search.png")} />
          </div>
          <Menu variant="default" className={cn(classes.faqMenu)}>
            {faqData.map((f) => (
              <MenuItem
                key={f.id}
                onClick={() => handleClickMenuItem(f.id)}
                isActive={f.id === activeMenuItem}
              >
                <Typography isUpperCased>
                  <T message={f.title} />
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          {currentFaqItem &&
          currentFaqItem.data &&
          currentFaqItem.data.length ? (
            <div className={cn(classes.accordionWrapper)}>
              <Accordion>
                {currentFaqItem.data.map((f, i) => (
                  <AccordionNode key={i} variant="secondary" title={f.title}>
                    {f.content}
                  </AccordionNode>
                ))}
              </Accordion>
            </div>
          ) : null}
        </SinglePageLayout>
      </Container>
    </main>
  );
};

export default FaqPage;

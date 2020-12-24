import React, { PureComponent } from "react";
import classes from "./AboutPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";
import SinglePageLayout from "src/components/SinglePageLayout";
import { T } from "react-targem";

interface AboutPageProps {}

const teamMembers = [
  {
    name: <T message="Саша Беспалова" />,
    position: <T message="арт-директор, дизайнер" />,
    photoSrc: require("./assets/sasha_purple.png"),
    photoSrc2x: require("./assets/sasha_purple_2x.png"),
  },
  {
    name: <T message="Катя Боровикова" />,
    position: <T message="backend-разработчик аналитик" />,
    photoSrc: require("./assets/borovik.png"),
    photoSrc2x: require("./assets/borovik_2x.png"),
  },
  {
    name: <T message="Катя Голенкова" />,
    position: <T message="менеджер спецпроектов" />,
    photoSrc: require("./assets/golenkova.png"),
    photoSrc2x: require("./assets/golenkova_2x.png"),
  },
  {
    name: <T message="Александр Гусман" />,
    position: <T message="Технический директор" />,
    photoSrc: require("./assets/goooseman.png"),
    photoSrc2x: require("./assets/goooseman_2x.png"),
  },
  {
    name: <T message="Григорий Охотин" />,
    position: <T message="Консультант" />,
    photoSrc: require("./assets/okhotin.png"),
    photoSrc2x: require("./assets/okhotin_2x.png"),
  },
  {
    name: <T message="Оксана Половинкина" />,
    position: <T message="Редактор" />,
    photoSrc: require("./assets/polovonkina.png"),
    photoSrc2x: require("./assets/polovonkina_2x.png"),
  },
  {
    name: <T message="Денис Шедов" />,
    position: <T message="Юрист и аналитик ОВД-Инфо" />,
    photoSrc: require("./assets/shedov.png"),
    photoSrc2x: require("./assets/shedov_2x.png"),
  },
  {
    name: <T message="Света шуранова" />,
    position: <T message="Продюсер" />,
    photoSrc: require("./assets/shuranova.png"),
    photoSrc2x: require("./assets/shuranova_2x.png"),
  },
];

class AboutPage extends PureComponent<AboutPageProps> {
  render(): React.ReactNode {
    return (
      <main className={cn(classes.container)}>
        <Container>
          <SinglePageLayout title="О проекте">
            <>
              <Typography>
                <T
                  message="В 2018 году по статье “Возбуждение ненависти либо вражды, а равно
                    унижение человеческого достоинства” в судах рассмотрели 531 дело. В
                    461 случае суд закончился обвинительным приговором. Из них 282 (61%)
                    осужденных были приговорены к лишению свободы условно. К реальному
                    лишению свободы приговорено 50 человек, из них 27 человек получили
                    сроки от 1 до 2 лет. Оправдано 3 человека. Прекращено 67 дел, из них
                    65 по нереабилитирующим основаниям."
                />
              </Typography>
              <Typography
                variant="h2"
                font="serif"
                className={cn(classes.subTitle)}
              >
                <T message="Команда" />
              </Typography>
              <div className={cn(classes.teamContainer)}>
                {teamMembers.map((t, i) => (
                  <div key={i} className={cn(classes.teamMember)}>
                    <div className={cn(classes.teamPhotoWrapper)}>
                      {t.photoSrc && (
                        <img
                          className={cn(classes.teamPhoto)}
                          src={t.photoSrc}
                          srcSet={`${t.photoSrc2x} 2x`}
                        />
                      )}
                    </div>
                    <Typography
                      className={cn(classes.teamMemberName)}
                      variant="h3"
                      font="serif"
                    >
                      {t.name}
                    </Typography>
                    <Typography
                      className={cn(classes.teamMemberPosition)}
                      size="small"
                      isUpperCased
                    >
                      {t.position}
                    </Typography>
                  </div>
                ))}
              </div>
            </>
          </SinglePageLayout>
        </Container>
      </main>
    );
  }
}

export default AboutPage;

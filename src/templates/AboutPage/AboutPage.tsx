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
    name: "Беспалова Саша",
    position: "Дизайнер",
    photoName: "bespalova-sasha.png",
  },
  {
    name: "Боровикова Катя",
    position: "python-разработчик, дата-аналитик",
  },
  {
    name: "Голенкова Катя",
    position: "pr",
  },
  {
    name: "Гусев Саша",
    position: "разработчик, сисадмин",
  },
  {
    name: "Линделл Дада",
    position: "дата-аналитик",
  },
  {
    name: "Охотин Гриша",
    position: "куратор",
  },
  {
    name: "Шедов Денис",
    position: "юрист, дата-аналитик",
  },
  {
    name: "Шуранова Света",
    position: "куратор",
  },
  {
    name: "Чертова Аня",
    position: "дата-аналитик",
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
                    сроки от 1 до 2 лет. Оправдано 3 человекаю Прекращено 67 дел, из них
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
                {teamMembers.map((t) => (
                  <div key={t.name} className={cn(classes.teamMember)}>
                    <div className={cn(classes.teamPhotoWrapper)}>
                      {t.photoName && (
                        <img
                          className={cn(classes.teamPhoto)}
                          src={require(`./assets/${t.photoName}`)}
                        />
                      )}
                    </div>
                    <Typography
                      className={cn(classes.teamMemberName)}
                      variant="h3"
                      font="serif"
                    >
                      <T message={t.name} />
                    </Typography>
                    <Typography
                      className={cn(classes.teamMemberPosition)}
                      size="small"
                      isUpperCased
                    >
                      <T message={t.position} />
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

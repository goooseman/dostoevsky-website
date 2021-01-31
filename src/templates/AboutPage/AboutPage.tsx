import React, { PureComponent } from "react";
import classes from "./AboutPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";
import SinglePageLayout from "src/components/SinglePageLayout";
import { T, withLocale, WithLocale } from "react-targem";
import Separator from "src/components/ui-kit/Separator";
import Tooltip from "src/components/ui-kit/Tooltip";
import { Helmet } from "react-helmet";

interface AboutPageProps extends WithLocale {}

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
    name: <T message="Света Шуранова" />,
    position: <T message="Продюсер" />,
    photoSrc: require("./assets/shuranova.png"),
    photoSrc2x: require("./assets/shuranova_2x.png"),
  },
];

class AboutPage extends PureComponent<AboutPageProps> {
  render(): React.ReactNode {
    const { t } = this.props;
    return (
      <main className={cn(classes.container)}>
        <Container isThin>
          <Helmet defer={false}>
            <title>{t("О проекте")}</title>
            <meta name="description" content={t("Что такое Достоевский?")} />
          </Helmet>
          <SinglePageLayout title={<T message="О проекте" />}>
            <>
              <Typography isUpperCased variant="h3">
                <T message="Что такое Достоевский?" />
              </Typography>
              <Typography gutterBottom>
                <T message="Достоевский — это бесплатная платформа для моментального доступа к статистике уголовных дел в России с 2009 года. Мы собираем, обрабатываем и визуализируем открытые массивы данных, чтобы вы могли легко отслеживать динамику российского правосудия." />
              </Typography>
              <Typography isUpperCased gutterTop variant="h3">
                <T message="Разве я сам(-а) не могу найти эти данные?" />
              </Typography>
              <Typography>
                <T message="Можете. Все данные Достоевского генерируются на основе " />
                <a
                  href="http://www.cdep.ru/index.php?id=79"
                  target="_blank"
                  rel="noreferrer"
                >
                  <T message="официальной статистики Судебного департамента при Верховном суде РФ" />
                </a>
                {". "}
                <T message="Однако эта информация публикуется в виде десятков нечитаемых таблиц: для подробного анализа квалифицированному специалисту требуются часы, а иногда и дни работы." />
              </Typography>
              <Typography gutterTop gutterBottom>
                <T message="Мы взяли уголовную статистику, очистили от задвоений, привели к единому виду и сформировали полную базу данных, дополнив её аналитическими статьями и инфографикой. Всё это можно скачать с сайта и использовать по лицензии Creative Commons 4.0. " />
                <Tooltip
                  isInversed
                  tip={t(
                    "Это означает, что при указании авторства вы можете свободно копировать и распространять эти материалы, а также создавать производные материалы на их основе в любых целях, включая коммерческие."
                  )}
                />
              </Typography>
              <Typography gutterTop isUpperCased variant="h3">
                <T message="Зачем обрабатывать данные об уголовных делах?" />
              </Typography>
              <Typography gutterBottom>
                <T message="Чтобы лучше понимать, куда движется общество и насколько эффективно и прозрачно работает государство. Мы верим, что Достоевский поможет пользователям лучше разбираться в реалиях российской судебной системы, а объективные данные, удобный интерфейс и готовые аналитические выкладки будут способствовать гуманизации уголовного правосудия, повышению качества законодательного процесса, открытости судебной системы и созданию общественных предпосылок для реформ." />
              </Typography>
              <Typography gutterTop isUpperCased variant="h3">
                <T message="Как здесь ориентироваться? / Как это работает?" />
              </Typography>
              <Typography>
                <T message="Главное в Достоевском — простая в использовании база уголовной статистики в России" />{" "}
                <Typography variant="span">
                  <T message="с 2009 до 2019 года." />
                  <Tooltip
                    isInversed
                    tip={t(
                      "База будет пополняться ежегодно по мере публикации данных Судебным департаментом."
                    )}
                  />
                </Typography>
                <T message="В каталоге у каждой статьи Уголовного кодекса — отдельная страница с таблицами и инфографикой по хронологии применения, составам преступлений и видам приговоров. Если вам необходимы данные по другим параметрам — году, типу наказания, количеству рассмотренных дел — можно воспользоваться доступом ко всему датасету." />
              </Typography>
              <Typography gutterBottom>
                <T message="Кроме того, мы составили Глоссарий, в котором объяснили основные юридические термины простым языком, и предусмотрели всплывающие окна с подсказками при выдаче данных — достаточно навести курсор на термин, чтобы увидеть определение." />
              </Typography>
              <Typography gutterBottom>
                <T message="Чтобы вы не тратили время на подсчеты, наиболее значимые выводы из анализа всего датасета мы публикуем в разделе Аналитика, а еще у нас есть Блог, в котором мы мы публикуем колонки дата-аналитиков и рассказываем о тенденциях и особенностях российского уголовного правосудия." />
              </Typography>
              <Typography gutterTop gutterBottom isUpperCased variant="h3">
                <T message="Для кого эта платформа?" />
              </Typography>
              <Typography gutterTop>
                <b>
                  <T message="Журналисты" />
                </b>
              </Typography>
              <Typography gutterBottom>
                <T message="Наша статистика подходит как для новостей об отдельных резонансных делах, так и для глубоких аналитических материалов об общественно значимых явлениях: насилии, коррупции, наркополитике. Достоевский позволяет получить все необходимые для публикации данные оперативно и в удобном виде." />
              </Typography>
              <Typography>
                <b>
                  <T message="Исследователи и студенты" />
                </b>
              </Typography>
              <Typography gutterBottom>
                <T message="Данные судебной статистики — это неисчерпаемый источник для анализа работы судебной системы и правоприменительной практики. Объективная и официальная информация, задокументированная методология очистки и сведения данных вместе с публикацией соответствующих скриптов с открытым кодом делают Достоевский удобным инструментом для научных исследований." />
              </Typography>
              <Typography>
                <b>
                  <T message="Юридическое сообщество и правозащитники" />
                </b>
              </Typography>
              <Typography gutterBottom>
                <T message="С помощью Достоевского адвокаты могут получить блиц-анализ возможных исходов уголовного дела, а правозащитники — анализировать правоприменительную практику и использовать полученные данные в своей работе." />
              </Typography>
              <Typography gutterTop isUpperCased variant="h3">
                <T message="Кто работает над Достоевским?" />
              </Typography>
              <Typography gutterBottom>
                <T message="Идея Достоевского зародилась внутри правозащитного медиа-проекта ОВД-Инфо в 2015-ом году. Более трех лет аналитики проекта изучали судебную статистику и использовали её в своих докладах и публикациях. В 2018 году к разработке присоединился коллектив Data for Society — независимая инициатива журналистов и программистов, которые ставят своей целью укреплять правозащитные, медиа- и научные коллективы с помощью IT-решений для обработки открытых данных." />
              </Typography>
              <Typography>
                <T message="Наш проект стал возможен благодаря труду десятков людей — юристов, дата-аналитиков, разработчиков, дизайнеров, журналистов и менеджеров, а также благодаря тщательной работе Судебного департамента при Верховном суде РФ, который неустанно ведёт учёт преступлений и наказаний в России. Спасибо!" />
              </Typography>
            </>
          </SinglePageLayout>
        </Container>
        <Separator />
        <Container>
          <SinglePageLayout title={<T message="Команда" />}>
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
          </SinglePageLayout>
        </Container>
        <Container isThin>
          <SinglePageLayout>
            <Typography gutterBottom>
              <T message="Перевод сайта на английский язык" />
              {": "}
              <i>
                <T message="Роман Бондаренко" />
              </i>
              {"."}
            </Typography>
            <Typography gutterBottom>
              <T message="За помошь в работе над проектом благодарим" />{" "}
              <i>
                <T message="Бориса Бейлинсона, Алексея Куприянова, Даду Линделл, Максима Никонова, Наталью Смирнову, Анну Чертову" />
              </i>
              {"."}
            </Typography>
            <Typography gutterBottom>
              <T message="Составить обзоры изменений в уголовном-процессуальном праве и уголовно-исполнительном законодательстве за последнее десятилетие нам помогали" />
              {": "}
              <i>
                <T message="Лидия Головина, Борис Карпычев, Елена Липатова, Филипп Лучкин, Ксения Просвиркина" />
              </i>
              {"."}
            </Typography>
          </SinglePageLayout>
        </Container>
      </main>
    );
  }
}

export default withLocale(AboutPage);

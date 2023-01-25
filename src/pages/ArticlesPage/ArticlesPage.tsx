import { FC, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import RoutesEnum from '../../utils/routes';
import Navbar from '../../components/Navbar/Navbar';
import { Header2 } from '../../components/textStyles/Header2.styles';
import { ArticlesNavigation, ArticleTab, StyledArticlesPagegPage } from './ArticlesPage.styles';

interface ArticleInterface {
  title: string;
  path: string;
}

const articles: ArticleInterface[] = [
  { title: 'How to play blackjack', path: RoutesEnum.HowToPlay },
  { title: 'How to count cards', path: RoutesEnum.HowToCountCards }
];

const ArticlesPage: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const pickTab = (articlePath: string, tabNr: number) => {
    setActiveTab(tabNr);
    navigate(articlePath);
  };
  return (
    <StyledArticlesPagegPage>
      <Navbar />
      <ArticlesNavigation>
        {articles.map((article, index) => {
          return (
            <ArticleTab
              key={article.title}
              onClick={() => pickTab(article.path, index)}
              active={activeTab === index ? true : false}
            >
              <Header2>{article.title}</Header2>
            </ArticleTab>
          );
        })}
      </ArticlesNavigation>

      <Outlet />
    </StyledArticlesPagegPage>
  );
};

export default ArticlesPage;

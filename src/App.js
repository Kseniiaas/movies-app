import "antd/dist/reset.css";
import { Tabs } from "antd";
import MovieList from "./components/MoviesList/MoviesList";
import RatedMoviesList from "./components/RatedMoviesList/RatedMoviesList";
import GenreProvider from "./components/context/GenreContext";

const App = () => {
  const tabItems = [
    {
      key: "1",
      label: "Search",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Rated",
      children: <RatedMoviesList />,
    },
  ];

  return (
    <GenreProvider>
      <div
        className="tabItem-container"
        style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "20px" }}
      >
        <Tabs defaultActiveKey="1" centered items={tabItems} />
      </div>
    </GenreProvider>
  );
};

export default App;

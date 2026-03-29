import { useEffect, useState } from "react";
import "./App.css";
import { DynamicPage } from "./components/DynamicPage/dynamicPage";
import { DynamicPageHeader } from "./components/DynamicPageHeader/dynamicPageHeader";
import { Table } from "./components/Table/table";
import { Toolbar } from "./components/Toolbar/toolbar";
import { getKanji } from "./data/getKanji";
import { FlexibleColumnLayout } from "./components/FlexibleColumnLayout/flexibleColumnLayout";
import { ObjectPage } from "./components/ObjectPage/objectPage";
import { ObjectPageSection } from "./components/ObjectPageSection/objectPageSection";
import { Avatar } from "./components/Avatar/avatar";
import { SearchField } from "./components/SearchField/searchField";

function App() {
  type Kanji = {
    kanji: string;
    meaning: string;
    radicals: string[];
  };

  const [kanji, setKanji] = useState<Kanji[]>([]);
  const [selectedKanjiId, setSelectedKanjiId] = useState("");
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    getKanji().then((result) => {
      setKanji(result);
    });
  }, []);

  const tableSearch = <SearchField onChange={(e) => {setSearch(e)}}></SearchField>

  const tableToolbar = <Toolbar title="Kanji (<n>)" items={[tableSearch]}/>;

  const kanjiTable = (
    <Table
      data={search ? kanji.filter((e) => {
        console.log("e is: " + e.meaning +  " and search is:" + search);
        console.log()
        return e.meaning.toLowerCase().includes(search.toLowerCase());
      }) : kanji}
      columns={["kanji", "meaning"]}
      mode="Navigation"
      toolbar={tableToolbar}
      selectionChange={(row) => setSelectedKanjiId(row.kanji)}
      getKey={(row) => row.kanji}
    ></Table>
  );

  const dynamicPageHeader = (
    <DynamicPageHeader heading="Kanji Do It"></DynamicPageHeader>
  );

  const tabs = [
    {
      value: "kanjiTab",
      text: "Kanji",
      content: kanjiTable,
    },
    {
      value: "radicalsTab",
      text: "Radicals",
      content: radicalsTable,
    },
  ];

  const iconTabBar = <IconTabBar id="iconTabBar" tabs={tabs}></IconTabBar>;

  const dynamicPage = (
    <DynamicPage
      content={iconTabBar}
      dynamicPageHeader={dynamicPageHeader}
      subheaderProvider="iconTabBar"
    />
  );

  const objectAvatar = <Avatar text={selectedKanjiId}></Avatar>;

  const objectPageHeader = (
    <DynamicPageHeader
      heading={kanji.find((e) => e.kanji === selectedKanjiId)?.meaning ?? ""}
      subheading="Kanji"
      headerContent={objectAvatar}
    ></DynamicPageHeader>
  );

  const objectPageSections = [
    <ObjectPageSection heading="Section" content={"Hello"}></ObjectPageSection>,
  ];

  const objectPage = (
    <ObjectPage
      dynamicPageHeader={objectPageHeader}
      content={objectPageSections}
    ></ObjectPage>
  );

  return (
    <>
      <FlexibleColumnLayout
        masterColumnPage={dynamicPage}
        detailColumnPage={objectPage}
      ></FlexibleColumnLayout>
    </>
  );
}

export default App;

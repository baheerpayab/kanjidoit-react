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
import { IconTabBar } from "./components/IconTabBar/iconTabBar";
import { getRadicals } from "./data/getRadicals";

function App() {
  type Kanji = {
    kanji: string,
    meaning: string,
    radicals: string[]
  };

  type Radical = {
    radical: string;
    name: string,
    kanji: string[]
  }

  const [kanji, setKanji] = useState<Kanji[]>([]);
  const [selectedKanjiId, setSelectedKanjiId] = useState("");

  const [radicals, setRadicals] = useState<Radical[]>([]);
  // const [selectedRadicalId, setSelectedRadicalId] = useState("");
  

  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    getKanji().then((result) => {
      setKanji(result);
    });

    getRadicals().then((result) => {
      setRadicals(result);
    })
  }, []);

  const tableSearch = (
    <SearchField
      onChange={(e) => {
        setSearch(e);
      }}
    ></SearchField>
  );

  const kanjiTableToolbar = <Toolbar title="Kanji (<n>)" items={[tableSearch]} />;

  const kanjiTable = (
    <Table
      data={
        search
          ? kanji.filter((e) => {
              return e.meaning.toLowerCase().includes(search.toLowerCase());
            })
          : kanji
      }
      columns={["kanji", "meaning"]}
      mode="Navigation"
      toolbar={kanjiTableToolbar}
      selectionChange={(row) => setSelectedKanjiId(row.kanji)}
      getKey={(row) => row.kanji}
    ></Table>
  );

  const radicalsTableToolbar = <Toolbar title="Radicals (<n>)" items={[tableSearch]} />;

  const radicalsTable = (
    <Table
      data={
        search
          ? radicals.filter((e) => {
              return e.name.toLowerCase().includes(search.toLowerCase());
            })
          : radicals
      }
      columns={["radical", "name"]}
      mode="Navigation"
      toolbar={radicalsTableToolbar}
      // selectionChange={(row) => setSelectedRadicalId(row.radical)}
      getKey={(row) => row.radical}
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
    <ObjectPageSection heading="Section" content={"Hello"}></ObjectPageSection>,
    <ObjectPageSection heading="Section" content={"Hello"}></ObjectPageSection>,
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

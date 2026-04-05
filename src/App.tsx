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
import { StandardListItem } from "./components/ListItem/listItem";
import { Title } from "./components/Title/title";
import { TextArea } from "./components/TextArea/textArea";
import { ObjectPageHeader } from "./components/ObjectPageHeader/objectPageHeader";
import { Button } from "./components/Button/button";

function App() {
  type Kanji = {
    kanji: string;
    meaning: string;
    radicals: string[];
    mnemonic: string;
    readings: {
      onyomi: string[];
      kunyomi: string[];
    };
    words: [
      {
        word: string;
        meaning: string;
        pronunciation: string;
      },
    ];
  };

  type Radical = {
    radical: string;
    name: string;
    kanji: string[];
  };

  const [kanji, setKanji] = useState<Kanji[]>([]);
  const [selectedKanjiId, setSelectedKanjiId] = useState("");

  const [radicals, setRadicals] = useState<Radical[]>([]);
  // const [selectedRadicalId, setSelectedRadicalId] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    getKanji().then((result) => {
      setKanji(result);
    });

    getRadicals().then((result) => {
      setRadicals(result);
    });
  }, []);

  const tableSearch = (
    <SearchField
      onChange={(e) => {
        setSearch(e);
      }}
    ></SearchField>
  );

  const kanjiTableToolbar = (
    <Toolbar title="Kanji (<n>)" items={[tableSearch]} />
  );

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

  const radicalsTableToolbar = (
    <Toolbar title="Radicals (<n>)" items={[tableSearch]} />
  );

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

  // Object Page

  const selectedKanji = kanji.find((e) => e.kanji === selectedKanjiId);

  const objectAvatar = <Avatar text={selectedKanjiId}></Avatar>;

  const objectPageHeader = (
    <ObjectPageHeader
      heading={selectedKanji?.meaning ?? ""}
      subheading="Kanji"
      headerContent={objectAvatar}
      actions={[<Button text="Mark as Learned" type="primary" onPress={()=>{}}></Button>]}
    ></ObjectPageHeader>
  );

  const wordsList = (
    <div style={{ display: "block"}}>
      {selectedKanji?.words.map((e) => (
        <StandardListItem
          text={e.word}
          byline={`${e.meaning} — ${e.pronunciation}`}
        ></StandardListItem>
      ))}
    </div>
  );

  const radicalsList = (
    <div style={{ display: "block"}}>
      {selectedKanji?.radicals.map((e) => (
        <StandardListItem text={e}></StandardListItem>
      ))}
    </div>
  );

  const readingsSectionContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Title text="On'yomi" level="h6"></Title>
      <div style={{ display: "block", paddingBottom: "1rem"}}>
        {selectedKanji?.readings.onyomi.map((e) => (
          <StandardListItem text={e}></StandardListItem>
        ))}
      </div>
      <Title text="Kun'yomi" level="h6"></Title>
      <div style={{ display: "block"}}>
        {selectedKanji?.readings.kunyomi.map((e) => (
          <StandardListItem text={e}></StandardListItem>
        ))}
      </div>
    </div>
  );

  const textArea = (
    <TextArea
      showCharacterCount={true}
      placeholder="Write a mneumonic to memorise this Kanji"
      characterLimit={256}
      rows={5}
    ></TextArea>
  );

  const objectPageSections = [
    <ObjectPageSection
      heading="Readings"
      content={readingsSectionContent}
    ></ObjectPageSection>,
    <ObjectPageSection
      heading="Mnemonic"
      content={textArea}
      actions={[<Button text="Edit" type="tertiary" onPress={()=>{}}></Button>]}
    ></ObjectPageSection>,
    <ObjectPageSection
      heading="Radicals"
      content={radicalsList}
    ></ObjectPageSection>,
    <ObjectPageSection heading="Words" content={wordsList}></ObjectPageSection>,
  ];

  const objectPage = (
    <ObjectPage
      objectPageHeader={objectPageHeader}
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

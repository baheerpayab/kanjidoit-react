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

function App() {
  type Kanji = {
    kanji: string;
    meaning: string;
    radicals: string[];
  };

  const [kanji, setKanji] = useState<Kanji[]>([]);
  const [selectedKanjiId, setSelectedKanjiId] = useState("");

  useEffect(() => {
    getKanji().then((result) => {
      setKanji(result);
    });
  }, []);

  const tableToolbar = <Toolbar title="Kanji (<n>)" />;

  const kanjiTable = (
    <Table
      data={kanji}
      columns={["kanji", "meaning"]}
      mode="Navigation"
      toolbar={tableToolbar}
      selectionChange={(row) => setSelectedKanjiId(row.meaning)}
      getKey={(row) => row.kanji}
    ></Table>
  );

  const dynamicPageHeader = (
    <DynamicPageHeader heading="Kanji Do"></DynamicPageHeader>
  );

  const dynamicPage = <DynamicPage content={kanjiTable} dynamicPageHeader={dynamicPageHeader} />

  const objectPageHeader = (
    <DynamicPageHeader heading={selectedKanjiId}></DynamicPageHeader>
  );

  const objectPageSections = [
    <ObjectPageSection heading="Section" content={"Hello"}></ObjectPageSection>,
  ]

  const objectPage = <ObjectPage dynamicPageHeader={objectPageHeader} content={objectPageSections}></ObjectPage>

  return (
    <>
      <FlexibleColumnLayout masterColumnPage={dynamicPage} detailColumnPage={objectPage}></FlexibleColumnLayout>
    </>
  );
}

export default App;

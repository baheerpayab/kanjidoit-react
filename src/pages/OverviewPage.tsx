import { useEffect, useState } from "react";
import { DynamicPage } from "../components/DynamicPage/DynamicPage";
import { DynamicPageHeader } from "../components/DynamicPageHeader/DynamicPageHeader";
import { Table } from "../components/Table/Table";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { getKanji } from "../data/getKanji";
import { FlexibleColumnLayout } from "../components/FlexibleColumnLayout/FlexibleColumnLayout";
import { SearchField } from "../components/SearchField/SearchField";
import { IconTabBar } from "../components/IconTabBar/IconTabBar";
import type { Kanji } from "../types/kanji.types";
import { KanjiObjectPage } from "../features/kanji/KanjiObjectPage";

export function OverviewPage() {
  // ——— State ———
  const [kanji, setKanji] = useState<Kanji[]>([]);
  const [selectedKanjiId, setSelectedKanjiId] = useState("");
  const [search, setSearch] = useState("");

  // Load kanji
  useEffect(() => {
    getKanji().then((result) => {
      setKanji(result);
    });
  }, []);

  // ——— Kanji Table ———

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

  // const radicalsTableToolbar = (
  //   <Toolbar title="Radicals (<n>)" items={[tableSearch]} />
  // );

  // const radicalsTable = (
  //   <Table
  //     data={
  //       search
  //         ? radicals.filter((e) => {
  //             return e.name.toLowerCase().includes(search.toLowerCase());
  //           })
  //         : radicals
  //     }
  //     columns={["radical", "name"]}
  //     mode="Navigation"
  //     toolbar={radicalsTableToolbar}
  //     // selectionChange={(row) => setSelectedRadicalId(row.radical)}
  //     getKey={(row) => row.radical}
  //   ></Table>
  // );

  // ——— Overview DynamicPage ———

  const tabs = [
    {
      value: "kanjiTab",
      text: "Kanji",
      content: kanjiTable,
    },
    // {
    //   value: "radicalsTab",
    //   text: "Radicals",
    //   content: radicalsTable,
    // },
  ];

  const iconTabBar = <IconTabBar id="iconTabBar" tabs={tabs}></IconTabBar>;

  const dynamicPageHeader = (
    <DynamicPageHeader heading="Kanji Do It"></DynamicPageHeader>
  );

  const dynamicPage = (
    <DynamicPage
      content={iconTabBar}
      dynamicPageHeader={dynamicPageHeader}
      subheaderProvider="iconTabBar"
    />
  );

  // ——— Kanji ObjectPage ———

  const selectedKanji = kanji.find((e) => e.kanji === selectedKanjiId);
  let detailPage;

  if (!selectedKanji) {
    detailPage = <div></div>;
  } else {
    detailPage = <KanjiObjectPage kanji={selectedKanji} setState={()=>{setSelectedKanjiId("")}}></KanjiObjectPage>;
  }

  return (
    <>
      <FlexibleColumnLayout
        masterColumn={dynamicPage}
        detailColumn={detailPage}
        showDetailColumn={!!selectedKanji}
      ></FlexibleColumnLayout>
    </>
  );
}

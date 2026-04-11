import { Button } from "../../components/Button/Button";
import { StandardListItem } from "../../components/StandardListItem/StandardListItem";
import { ObjectPage } from "../../components/ObjectPage/ObjectPage";
import { ObjectPageHeader } from "../../components/ObjectPageHeader/ObjectPageHeader";
import { ObjectPageSection } from "../../components/ObjectPageSection/ObjectPageSection";
import { TextArea } from "../../components/TextArea/TextArea";
import { Title } from "../../components/Title/Title";
import type { Kanji } from "../../types/kanji";

type kanjiObjectPageProps = {
  kanji: Kanji;
  setState: () => void;
};

export function KanjiObjectPage({ kanji, setState }: kanjiObjectPageProps) {

  const header = (
    <ObjectPageHeader
      heading={kanji.meaning}
      subheading="Kanji"
      actions={[
        // <Button
        //   text="Mark as Learned"
        //   type="primary"
        //   onPress={() => {}}
        // ></Button>,
        <Button
          icon="decline"
          type="tertiary"
          onPress = {setState}
        ></Button>
      ]}
    ></ObjectPageHeader>
  );

  const wordsList = (
      <div style={{ display: "block"}}>
        {kanji?.words.map((e) => (
          <StandardListItem
            text={e.word}
            byline={`${e.meaning} — ${e.pronunciation}`}
          ></StandardListItem>
        ))}
      </div>
    );
  
    const radicalsList = (
      <div style={{ display: "block"}}>
        {kanji?.radicals.map((e) => (
          <StandardListItem text={e}></StandardListItem>
        ))}
      </div>
    );
  
    const readingsSectionContent = (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Title text="On'yomi" level="h6"></Title>
        <div style={{ display: "block", paddingBottom: "1rem"}}>
          {kanji?.readings.onyomi.map((e) => (
            <StandardListItem text={e}></StandardListItem>
          ))}
        </div>
        <Title text="Kun'yomi" level="h6"></Title>
        <div style={{ display: "block"}}>
          {kanji?.readings.kunyomi.map((e) => (
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

  const sections = [
    <ObjectPageSection
      heading="Readings"
      content={readingsSectionContent}
    ></ObjectPageSection>,
    <ObjectPageSection
      heading="Mnemonic"
      content={textArea}
      actions={[
        <Button text="Edit" type="tertiary" onPress={() => {}}></Button>,
      ]}
    ></ObjectPageSection>,
    <ObjectPageSection
      heading="Radicals"
      content={radicalsList}
    ></ObjectPageSection>,
    <ObjectPageSection heading="Words" content={wordsList}></ObjectPageSection>,
  ];



  return <ObjectPage objectPageHeader={header} content={sections}></ObjectPage>;
}

// function mnemonicSection() {
//   return <ObjectPageSection heading="Mneomnic"></ObjectPageSection>;
// }

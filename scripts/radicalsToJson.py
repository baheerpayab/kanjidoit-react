import json
from pathlib import Path

script_dir = Path(__file__).parent
json_path = script_dir / "radicalsRaw.json"

with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for entry in data:
    entry["kanji"] = [r.strip().split(" (")[0] for r in entry["kanji"].split("), ")]


with open(script_dir / "radicals.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

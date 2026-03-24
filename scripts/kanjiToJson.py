import json
from pathlib import Path

script_dir = Path(__file__).parent
json_path = script_dir / "kanji.json"

with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for entry in data:
    entry["radicals"] = [r.strip() for r in entry["radicals"].split("+")]

with open(script_dir / "kanji_fixed.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

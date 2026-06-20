import json
import pandas as pd
from collections import Counter

# ==========================
# LOAD JSON DATA
# ==========================

records = []

with open(
    "output/emotion_log.json",
    "r"
) as file:

    for line in file:

        line = line.strip()

        if line:
            records.append(
                json.loads(line)
            )

# ==========================
# RAW DATA SHEET
# ==========================

raw_df = pd.DataFrame(records)

# ==========================
# EMOTION SUMMARY SHEET
# ==========================

emotion_counter = Counter()

for record in records:

    emotion = record.get(
        "dominant_emotion",
        "unknown"
    )

    emotion_counter[emotion] += 1

total = sum(
    emotion_counter.values()
)

summary_data = []

for emotion, count in sorted(
    emotion_counter.items(),
    key=lambda x: x[1],
    reverse=True
):

    percentage = (
        count / total
    ) * 100

    summary_data.append({
        "Emotion": emotion,
        "Count": count,
        "Percentage": round(
            percentage,
            2
        )
    })

summary_df = pd.DataFrame(
    summary_data
)

# ==========================
# SESSION INFORMATION SHEET
# ==========================

session_df = pd.DataFrame([{

    "Session ID":
        records[-1]["session_id"]
        if records else "N/A",

    "Total Records":
        len(records),

    "Unique Emotions":
        len(emotion_counter),

    "Most Common Emotion":
        max(
            emotion_counter,
            key=emotion_counter.get
        )
        if emotion_counter
        else "N/A"
}])

# ==========================
# WRITE EXCEL FILE
# ==========================

with pd.ExcelWriter(
    "output/emotion_report.xlsx",
    engine="openpyxl"
) as writer:

    raw_df.to_excel(
        writer,
        sheet_name="Raw Data",
        index=False
    )

    summary_df.to_excel(
        writer,
        sheet_name="Emotion Summary",
        index=False
    )

    session_df.to_excel(
        writer,
        sheet_name="Session Info",
        index=False
    )

print(
    "Excel Report Generated Successfully!"
)

print(
    "Saved to output/emotion_report.xlsx"
)
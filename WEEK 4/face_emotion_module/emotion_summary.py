import json
from collections import Counter

emotion_counter = Counter()

with open(
    "output/emotion_log.json",
    "r"
) as file:

    for line in file:

        line = line.strip()

        if not line:
            continue

        record = json.loads(line)

        emotion = record.get(
            "dominant_emotion",
            "unknown"
        )

        emotion_counter[emotion] += 1

total = sum(emotion_counter.values())

print("\nEmotion Summary")
print("-" * 30)

for emotion, count in sorted(
    emotion_counter.items(),
    key=lambda x: x[1],
    reverse=True
):

    percentage = (
        count / total
    ) * 100

    print(
        f"{emotion:<10} : "
        f"{percentage:.2f}% "
        f"({count} samples)"
    )
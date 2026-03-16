import os

papers = [
    {
        "filename": "probing_memes_preview.svg",
        "title": "Probing Memes in LLMs",
        "subtitle": "A Paradigm for the Entangled Evaluation World",
        "color": "#4F46E5"
    },
    {
        "filename": "ecg_expert_qa_preview.svg",
        "title": "ECG-Expert-QA",
        "subtitle": "Benchmark for Medical LLMs in ECG",
        "color": "#E11D48"
    },
    {
        "filename": "dualsg_preview.svg",
        "title": "DualSG",
        "subtitle": "Dual-Stream Semantic-Guided Forecasting",
        "color": "#059669"
    },
    {
        "filename": "kairos_preview.svg",
        "title": "KAIROS",
        "subtitle": "Unified Training for Universal Forecasting",
        "color": "#7C3AED"
    },
    {
        "filename": "timemosaic_preview.svg",
        "title": "TimeMosaic",
        "subtitle": "Temporal Heterogeneity Guided Forecasting",
        "color": "#D97706"
    },
    {
        "filename": "aigcbench_preview.svg",
        "title": "AIGCBench",
        "subtitle": "Evaluation of Image-to-Video Content",
        "color": "#0D9488"
    },
    {
        "filename": "okw_preview.svg",
        "title": "OKW",
        "subtitle": "Placeholder Project",
        "color": "#4B5563"
    }
]

template = """<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="{color}" />
  <rect x="50" y="50" width="700" height="500" fill="white" fill-opacity="0.9" rx="20" ry="20" />
  <text x="400" y="250" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#1F2937">
    {title}
  </text>
  <text x="400" y="320" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#4B5563">
    {subtitle}
  </text>
  <text x="400" y="500" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#9CA3AF">
    PDF Preview Placeholder
  </text>
</svg>"""

output_dir = "src/assets"
os.makedirs(output_dir, exist_ok=True)

for paper in papers:
    content = template.format(
        color=paper["color"],
        title=paper["title"],
        subtitle=paper["subtitle"]
    )
    with open(os.path.join(output_dir, paper["filename"]), "w") as f:
        f.write(content)
    print(f"Generated {paper['filename']}")

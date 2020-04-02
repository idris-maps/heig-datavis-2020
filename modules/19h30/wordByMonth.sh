#!/bin/bash
ndjson-filter "d.title.toLowerCase().includes('$1')" < segments.ndjson \
| ndjson-sort "a.date > b.date ? 1 : 1" \
| ndjson-map "{ month: d.date.split('-').filter((e, i) => i < 2).join('-'), duration: d.duration }" \
| node scriptes/sum duration month \
| node scriptes/graphDurationByMonth \
| vl2png > images/$1.png
#!/usr/bin/env python

import sys
import time
import datetime

for line in sys.stdin:
    # 擷取時間字串
    line = line.strip()
    words = line.split('[')
    # 過濾-0000
    words = words[1].split(' -0000')
    # 透過datetime module 轉換格式
    time = datetime.datetime.strptime(words[0], "%d/%b/%Y:%H:%M:%S")
    print(time.strftime('%Y-%m-%d T %H:00:00.000') + "\t1")

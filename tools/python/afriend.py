import random
import sys

from pymouse import PyMouse
from pykeyboard import PyKeyboard
import autopy as at

from time import sleep

m = PyMouse()
k = PyKeyboard()

# at.mouse.smooth_move(837, 780)

# 点击添加好友
# m.click(930, 200, 1)
# sleep(3)
# # 点击右上角发送
# m.click(930, 100, 1)
# sleep(2)
# # 处理异常
# # m.click(530, 100, 1)
# # sleep(2)
#
#
# # 点击添加好友
# m.click(930, 270, 1)
# sleep(1)
# # 点击右上角发送
# m.click(930, 100, 1)
# sleep(2)


def drag():
    m.press(830, 500)
    sleep(1)
    m.drag(830, 30)
    sleep(1)
    m.release(830, 30)

def add6():
    for i in range(6):
        m.click(930, 200+i*78, 1)
        sleep(3)
        # 点击右上角发送
        m.click(930, 115, 1)
        sleep(2)
        if i == 5:
            sleep(1)
            drag()
    # pas
    # drag()



for j in range(2):
    add6()

# # 网上拖拽
# m.press(830, 240)
# m.drag(830, 120)

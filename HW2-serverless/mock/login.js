
const tokens = {
  admin: {
    token: 'admin-token'
  },
  company: {
    token: 'company-token'
  },
  site: {
    token: 'site-token'
  }
}

const users = {
  'admin-token': {
    user_id: '1',
    roles: ['admin'],
    available_time: '1565827200',
    name: 'BoostFit Admin',
    email: 'admin@compal.com',
    gender: 'male',
    phone: '098778779',
    birthday: '978278400',
    avatar: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElD%0D%0AICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NW%0D%0ARy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTY3MDc0NzQ3NDk0IiBjbGFzcz0iaWNvbiIg%0D%0Admlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53%0D%0AMy5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwMTEzIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5v%0D%0AcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBl%0D%0APSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTU4Mi4wNDQzMDYgOTkzLjU1NDYw%0D%0AM2wxNy4xMTMwOTgtOTkuNDk0NzUzLTcyLjIzMzE5MS03MC40NDIyODVjLTI1LjA3MjY3OC0yNC4y%0D%0ANzY3Mi0zNC4wMjcyMDYtNTcuMTA5OTg4LTI0LjA3NzczLTg3LjU1NTM4MyA5Ljk0OTQ3NS0zMC40%0D%0ANDUzOTQgMzYuNDE1MDgtNTEuNTM4MjgyIDcwLjg0MDI2NC01Ni41MTMwMmw4Ny4zNTYzOTMtMTIu%0D%0ANzM1MzI4Yy0zLjc4MDgwMS0yLjU4Njg2NC03LjE2MzYyMi01LjE3MzcyNy0xMC4zNDc0NTQtNy45%0D%0ANTk1OC0xMC45NDQ0MjMtOS41NTE0OTYtMTguNzA1MDE0LTE5LjY5OTk2MS0yMy40ODA3NjItMzAu%0D%0AMDQ3NDE1cy03LjU2MTYwMS0yMS4wOTI4ODgtOC4xNTg1Ny0zMS40NDAzNDJjLTAuNTk2OTY5LTEw%0D%0ALjU0NjQ0NCAwLTIwLjg5Mzg5OCAxLjk4OTg5NS0zMS4wNDIzNjMgMS4zOTI5MjctOC4xNTg1NyAz%0D%0ALjU4MTgxMS0xNS4xMjMyMDIgNi4xNjg2NzUtMjAuODkzODk4IDIuNTg2ODY0LTUuNzcwNjk2IDUu%0D%0AOTY5Njg1LTEwLjU0NjQ0NCAxMC4xNDg0NjUtMTQuNzI1MjIzIDQuMTc4NzgtMy45Nzk3OSA4Ljc1%0D%0ANTUzOC03Ljk1OTU4IDE0LjMyNzI0NC0xMS41NDEzOTEgNS41NzE3MDYtMy43ODA4MDEgMTEuMTQz%0D%0ANDEyLTguMTU4NTcgMTcuMzEyMDg3LTEzLjczMDI3NiA1LjM3MjcxNy00Ljc3NTc0OCAxMC4xNDg0%0D%0ANjUtMTEuMzQyNDAyIDE0LjcyNTIyMy0xOS44OTg5NTEgNC4xNzg3OC04LjM1NzU1OSA4LjE1ODU3%0D%0ALTE3LjExMzA5OCAxMS41NDEzOTEtMjUuODY4NjM2IDMuMzgyODIyLTkuOTQ5NDc1IDYuNTY2NjU0%0D%0ALTIwLjY5NDkwOSA5LjE1MzUxNy0zMS40NDAzNDIgNi43NjU2NDMtMS45ODk4OTUgMTMuMTMzMzA3%0D%0ALTUuNTcxNzA2IDE5LjMwMTk4Mi0xMS4xNDM0MTIgNS4zNzI3MTctNC43NzU3NDggMTAuMTQ4NDY1%0D%0ALTExLjM0MjQwMiAxNC43MjUyMjMtMTkuODk4OTUxIDQuMTc4NzgtOC41NTY1NDkgNy41NjE2MDEt%0D%0AMTkuNjk5OTYxIDkuNTUxNDk2LTM0LjAyNzIwNiAxLjM5MjkyNy0xMC45NDQ0MjMgMS4xOTM5Mzct%0D%0AMTkuODk4OTUxLTAuMzk3OTc5LTI3LjQ2MDU1Mi0xLjU5MTkxNi03LjU2MTYwMS0zLjk3OTc5LTEz%0D%0ALjUzMTI4Ni02LjU2NjY1NC0xOC4zMDcwMzUtMi41ODY4NjQtNS41NzE3MDYtNi4zNjc2NjQtOS43%0D%0ANTA0ODYtMTEuMTQzNDEyLTEyLjMzNzM0OSAwLjU5Njk2OS0yNy4wNjI1NzMtMC45OTQ5NDgtNTQu%0D%0AMzI0MTM1LTUuMTczNzI3LTgxLjM4NjcwOC0zLjE4MzgzMi0yMy4wODI3ODMtOS4xNTM1MTctNDcu%0D%0ANTU4NDkyLTE3LjcxMDA2Ni03My42MjYxMTdzLTIxLjI5MTg3Ny00OS45NDYzNjYtMzguMjA1OTg1%0D%0ALTcxLjYzNjIyMmMtNy41NjE2MDEtOS41NTE0OTYtMTcuMzEyMDg3LTE4LjkwNDAwMy0yOS42NDk0%0D%0AMzYtMjguMDU3NTItMTEuOTM5MzctOS4xNTM1MTctMjYuMDY3NjI1LTE3LjMxMjA4Ny00MS41ODg4%0D%0AMDctMjQuODczNjg4LTE1LjcyMDE3MS03LjU2MTYwMS0zMi40MzUyOS0xMy41MzEyODYtNTAuMzQ0%0D%0AMzQ1LTE4LjMwNzAzNXMtMzcuMDEyMDQ4LTcuMTYzNjIyLTU2LjUxMzAyLTcuMTYzNjIyYy0xNS43%0D%0AMjAxNzEgMC0zMS44MzgzMjEgMS41OTE5MTYtNDguMzU0NDUgNC4xNzg3OC0xNi43MTUxMTkgMi45%0D%0AODQ4NDMtMzMuMDMyMjU4IDcuNTYxNjAxLTQ5LjM0OTM5OCAxNC4zMjcyNDQtMTYuMzE3MTQgNi43%0D%0ANjU2NDMtMzIuNDM1MjkgMTYuMTE4MTUtNDguMzU0NDUgMjguMDU3NTJzLTMwLjI0NjQwNSAyNy4w%0D%0ANjI1NzMtNDMuMTgwNzIzIDQ1LjM2OTYwN2MtMTMuNTMxMjg2IDE5LjUwMDk3Mi0yMy44Nzg3NDEg%0D%0ANDEuNTg4ODA3LTMxLjA0MjM2MyA2Ni4wNjQ1MTYtNy4xNjM2MjIgMjQuNDc1NzA5LTEyLjEzODM2%0D%0AIDQ3LjU1ODQ5Mi0xNC43MjUyMjMgNjkuMjQ4MzQ4LTMuNTgxODExIDI1Ljg2ODYzNi00Ljc3NTc0%0D%0AOCA1MS43MzcyNzItNC4xNzg3OCA3Ny40MDY5MTgtNS41NzE3MDYgNi45NjQ2MzMtOS43NTA0ODYg%0D%0AMTMuOTI5MjY1LTEyLjMzNzM0OSAyMS40OTA4NjctMi43ODU4NTMgNi43NjU2NDMtNC41NzY3NTkg%0D%0AMTQuNzI1MjIzLTUuNTcxNzA2IDIzLjg3ODc0MS0xLjE5MzkzNyA5LjE1MzUxNyAwIDE5LjY5OTk2%0D%0AMSAzLjM4MjgyMiAzMS4wNDIzNjMgMy41ODE4MTEgMTEuNTQxMzkxIDcuNTYxNjAxIDIwLjI5Njkz%0D%0AIDEyLjMzNzM0OSAyNi40NjU2MDQgNC43NzU3NDggNi4xNjg2NzUgOS4xNTM1MTcgMTAuOTQ0NDIz%0D%0AIDEzLjMzMjI5NyAxNC4zMjcyNDQgNC43NzU3NDggMy41ODE4MTEgOS41NTE0OTYgNS43NzA2OTYg%0D%0AMTQuMzI3MjQ0IDcuMTYzNjIyIDMuMzgyODIyIDEwLjc0NTQzMyA2Ljc2NTY0MyAyMS4yOTE4Nzcg%0D%0AMTAuMTQ4NDY1IDMxLjQ0MDM0MiAzLjM4MjgyMiA4Ljc1NTUzOCA2Ljk2NDYzMyAxNy4zMTIwODcg%0D%0AMTEuMTQzNDEyIDI1Ljg2ODYzNiA0LjE3ODc4IDguNTU2NTQ5IDguNzU1NTM4IDE1LjEyMzIwMiAx%0D%0ANC4zMjcyNDQgMTkuODk4OTUxIDExLjc0MDM4MSA5LjU1MTQ5NiAyMS44ODg4NDYgMTguNzA1MDE0%0D%0AIDMxLjA0MjM2MyAyNy40NjA1NTIgOS4xNTM1MTcgOC43NTU1MzggMTQuMzI3MjQ0IDIxLjI5MTg3%0D%0ANyAxNS43MjAxNzEgMzcuNjA5MDE3IDAuNTk2OTY5IDEwLjM0NzQ1NCAwLjk5NDk0OCAxOS44OTg5%0D%0ANTEgMC45OTQ5NDggMjguNjU0NDg5IDAgOC45NTQ1MjgtMS41OTE5MTYgMTcuMzEyMDg3LTQuNTc2%0D%0ANzU5IDI1LjQ3MDY1Ny0yLjk4NDg0MyA4LjE1ODU3LTguNTU2NTQ5IDE2LjMxNzE0LTE2LjMxNzE0%0D%0AIDI0LjQ3NTcwOS03Ljc2MDU5MSA4LjE1ODU3LTE4LjcwNTAxNCAxNi43MTUxMTktMzMuMDMyMjU4%0D%0AIDI1LjQ3MDY1Ny0xNy41MTEwNzcgMTEuNTQxMzkxLTM4LjAwNjk5NiAyMC4yOTY5My02MS40ODc3%0D%0ANTcgMjYuNDY1NjA0LTIzLjQ4MDc2MiA2LjE2ODY3NS0xMjUuNzYxMzY4IDQxLjM4OTgxNy0xNDcu%0D%0AODQ5MjAzIDQ4Ljk1MTQxOS0yMS44ODg4NDYgNy4zNjI2MTItNDEuMTkwODI4IDE3LjUxMTA3Ny01%0D%0ANy41MDc5NjcgMzAuNDQ1Mzk0LTE2LjExODE1IDEyLjczNTMyOC0yNi4yNjY2MTUgMzEuODM4MzIx%0D%0ALTMwLjQ0NTM5NCA1Ni45MTA5OTlDMi4zODc4NzUgODgxLjUyMzUxIDAuOTk0OTQ5IDg4OC40ODgx%0D%0ANDMgNC41NzY3NiA5MTYuMzQ2Njc0YzMuNTgxODExIDI3LjY1OTU0MSA5LjE1MzUxNyA0NC4xNzU2%0D%0ANyAxNi43MTUxMTkgNDkuNzQ3Mzc3IDYuMTY4Njc1IDQuNTc2NzU5IDIzLjY3OTc1MSAxMC4xNDg0%0D%0ANjUgNTIuOTMxMjA5IDE2LjcxNTExOSAyOS4yNTE0NTcgNi41NjY2NTQgMjEzLjExNzc2IDQxLjE5%0D%0AMDgyOCA0MjYuNjMzNTAxIDQxLjE5MDgyOCAyNy44NTg1MzEgMCA1NC43MjIxMTQtMC41OTY5Njkg%0D%0AODAuNTkwNzUtMS43OTA5MDZDNTgwLjI1MzQwMSAxMDEyLjg1NjU4NSA1ODAuNDUyMzkgMTAwMy4z%0D%0AMDUwODggNTgyLjA0NDMwNiA5OTMuNTU0NjAzeiIgcC1pZD0iMTAxMTQiPjwvcGF0aD48cGF0aCBk%0D%0APSJNMTAwNC4zMDAwMzggNzQ4LjM5OTUzMmwtMTA2LjQ1OTM4Ni0xNS41MjExODJjLTE2LjMxNzE0%0D%0ALTIuMzg3ODc0LTM1LjYxOTEyMi0xNi4zMTcxNC00Mi45ODE3MzMtMzEuMjQxMzUzbC00Ny41NTg0%0D%0AOTItOTYuNTA5OTExYy0zLjU4MTgxMS03LjM2MjYxMi04LjU1NjU0OS0xMS4xNDM0MTItMTMuMzMy%0D%0AMjk3LTExLjE0MzQxMi00Ljc3NTc0OCAwLTkuNTUxNDk2IDMuNzgwODAxLTEzLjMzMjI5NyAxMS4x%0D%0ANDM0MTJsLTQ3LjU1ODQ5MiA5Ni41MDk5MTFjLTcuMzYyNjEyIDE0LjcyNTIyMy0yNi42NjQ1OTQg%0D%0AMjguODUzNDc4LTQyLjk4MTczMyAzMS4yNDEzNTNsLTEwNi40NTkzODYgMTUuNTIxMTgyYy0xNi4z%0D%0AMTcxNCAyLjM4Nzg3NC0yMC4wOTc5NCAxMy43MzAyNzYtOC4xNTg1NyAyNS4yNzE2NjdsNzcuMDA4%0D%0AOTM5IDc1LjAxOTA0NGMxMS43NDAzODEgMTEuNTQxMzkxIDE5LjEwMjk5MyAzNC4yMjYxOTUgMTYu%0D%0AMzE3MTQgNTAuNTQzMzM1bC0xOC4xMDgwNDUgMTA2LjA2MTQwN2MtMS45ODk4OTUgMTEuNzQwMzgx%0D%0AIDIuNTg2ODY0IDE4LjcwNTAxNCAxMC43NDU0MzMgMTguNzA1MDE0IDMuMTgzODMyIDAgNi43NjU2%0D%0ANDMtMC45OTQ5NDggMTAuNzQ1NDMzLTMuMTgzODMybDk1LjExNjk4NC01MC4xNDUzNTZjNy4zNjI2%0D%0AMTItMy43ODA4MDEgMTYuOTE0MTA4LTUuNzcwNjk2IDI2LjQ2NTYwNC01Ljc3MDY5NiA5LjU1MTQ5%0D%0ANiAwIDE5LjMwMTk4MiAxLjk4OTg5NSAyNi40NjU2MDQgNS43NzA2OTZsOTUuMTE2OTg0IDUwLjE0%0D%0ANTM1NmMzLjk3OTc5IDIuMTg4ODg1IDcuNzYwNTkxIDMuMTgzODMyIDEwLjc0NTQzMyAzLjE4Mzgz%0D%0AMiA4LjE1ODU3IDAgMTIuNzM1MzI4LTYuOTY0NjMzIDEwLjc0NTQzMy0xOC43MDUwMTRsLTE4LjEw%0D%0AODA0NS0xMDYuMDYxNDA3Yy0yLjc4NTg1My0xNi4zMTcxNCA0LjU3Njc1OS0zOS4wMDE5NDMgMTYu%0D%0AMzE3MTQtNTAuNTQzMzM1bDc3LjAwODkzOS03NS4wMTkwNDRDMTAyNC4xOTg5ODggNzYyLjEyOTgw%0D%0AOCAxMDIwLjYxNzE3NyA3NTAuNzg3NDA2IDEwMDQuMzAwMDM4IDc0OC4zOTk1MzJ6IiBwLWlkPSIx%0D%0AMDExNSI+PC9wYXRoPjwvc3ZnPg=='
  },
  'company-token': {
    user_id: '2',
    roles: ['company'],
    available_time: '1565827200',
    name: 'BoostFit Company',
    email: 'company@compal.com',
    gender: 'female',
    phone: '0965484562',
    birthday: '978278400',
    avatar: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElD%0D%0AICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NW%0D%0ARy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTY3MDc0Njc4NTc1IiBjbGFzcz0iaWNvbiIg%0D%0Admlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53%0D%0AMy5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk5OTUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9y%0D%0AZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9%0D%0AInRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDUyOC44OTZjMTMyLjA5NiAw%0D%0AIDIzOS4xMDQtMTU4LjIwOCAyMzkuMTA0LTI5MC4zMDRDNzUxLjEwNCAxMDcuMDA4IDY0NC4wOTYg%0D%0AMCA1MTIgMFMyNzIuODk2IDEwNy4wMDggMjcyLjg5NiAyMzkuMTA0YzAgMTMxLjU4NCAxMDcuMDA4%0D%0AIDI4OS43OTIgMjM5LjEwNCAyODkuNzkyek04MzQuMDQ4IDY2Ny42NDhMNzI3LjU1MiA2MTQuNGwt%0D%0ANzguODQ4IDI3Ny41MDRzLTQuMDk2IDI4LjY3Mi0zNi4zNTIgMjguNjcyLTQ2LjA4LTI4LjY3Mi00%0D%0ANi4wOC0yOC42NzJWNjY1LjZzMC01MS4yLTUyLjIyNC01MS4yLTU0LjI3MiA1MS4yLTU0LjI3MiA1%0D%0AMS4ydjIyNi4zMDRzMCAyNC4wNjQtNDAuNDQ4IDI0LjA2NC00Mi40OTYtMjQuMDY0LTQyLjQ5Ni0y%0D%0ANC4wNjRMMjk2LjQ0OCA2MTQuNGwtMTA2LjQ5NiA1My4yNDhjLTU3Ljg1NiAyOC42NzItMTA0LjQ0%0D%0AOCAxMDQuNDQ4LTEwNC40NDggMTY4Ljk2djcwLjY1NmMwIDY0LjUxMiA1Mi4yMjQgMTE2LjczNiAx%0D%0AMTYuNzM2IDExNi43MzZoNjE5LjUyYzY0LjUxMiAwIDExNi43MzYtNTIuMjI0IDExNi43MzYtMTE2%0D%0ALjczNnYtNzAuNjU2YzAtNjQuNTEyLTQ2LjU5Mi0xNDAuMjg4LTEwNC40NDgtMTY4Ljk2eiIgcC1p%0D%0AZD0iOTk5NiI+PC9wYXRoPjwvc3ZnPg=='
  },
  'site-token': {
    user_id: '3',
    roles: ['site'],
    available_time: '1565827200',
    name: 'BoostFit Site',
    email: 'site@compal.com',
    gender: 'female',
    phone: '0965874546',
    birthday: '978278400',
    avatar: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElD%0D%0AICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NW%0D%0ARy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTY3MTQyOTYxOTE3IiBjbGFzcz0iaWNvbiIg%0D%0Admlld0JveD0iMCAwIDEwMjYgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53%0D%0AMy5vcmcvMjAwMC9zdmciIHAtaWQ9IjExMTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9y%0D%0AZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwLjM5MDYyNSIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHls%0D%0AZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTk4Ny4xMzYgODY0LjI1%0D%0ANmMtMzAuMDM3MzMzLTI4LjY3Mi02Mi4xMjI2NjctNzkuMTg5MzMzLTIyMS4xODQtMTAyLjRzLTEz%0D%0AMC4zODkzMzMtMTAzLjc2NTMzMy0xMzEuNzU0NjY3LTEwOS4yMjY2NjcgNi4xNDQtNjguMjY2NjY3%0D%0AIDYuMTQ0LTY4LjI2NjY2NkEyNzguNTI4IDI3OC41MjggMCAwIDAgNzE1LjQzNDY2NyA0NzcuODY2%0D%0ANjY3YzM4LjIyOTMzMy0yMy44OTMzMzMgNTIuNTY1MzMzLTI3LjMwNjY2NyA1OS4zOTItNTUuMjk2%0D%0AIDAgMCAxMi45NzA2NjctMTA0LjQ0OC0yNy45ODkzMzQtMTA0LjQ0OCAwIDAtMTcuMDY2NjY3IDAt%0D%0AMTEuNjA1MzMzLTIxLjg0NTMzNGE2NjYuOTY1MzMzIDY2Ni45NjUzMzMgMCAwIDAgMC0xMjguMzQx%0D%0AMzMzYzAtMjcuMzA2NjY3IDUuNDYxMzMzLTEwNS4xMzA2NjctNTIuNTY1MzMzLTExNi4wNTMzMzMt%0D%0AMzguOTEyLTcuNTA5MzMzLTQzLjY5MDY2NyAzLjQxMzMzMy02Mi44MDUzMzQgMFM1NzguOTAxMzMz%0D%0AIDAgNTQ2LjEzMzMzMyAwTDQ2OC45OTIgMTIuMjg4Yy0zNS40OTg2NjcgMC0zMC4wMzczMzMgMTAu%0D%0AOTIyNjY3LTQ5LjE1MiAxMy42NTMzMzNhMzAxLjA1NiAzMDEuMDU2IDAgMCAwLTUzLjkzMDY2NyA4%0D%0ALjE5MmMtNTcuMzQ0IDEwLjkyMjY2Ny03Ny44MjQgODMuOTY4LTgwLjU1NDY2NiAxMTEuMjc0NjY3%0D%0Acy0zLjQxMzMzMyAxMDMuNzY1MzMzIDAgMTQ0LjcyNTMzM2M1LjQ2MTMzMyAyNC41NzYtMTMuNjUz%0D%0AMzMzIDI0LjU3Ni0xMy42NTMzMzQgMjQuNTc2LTM0LjEzMzMzMyAwLTE5LjExNDY2NyAxMDQuNDQ4%0D%0ALTE5LjExNDY2NiAxMDQuNDQ4IDQuNzc4NjY3IDI2LjYyNCAwIDM5LjU5NDY2NyA0OS4xNTIgNjAu%0D%0AMDc0NjY3YTIxMC45NDQgMjEwLjk0NCAwIDAgMCA4NS4zMzMzMzMgMTAzLjA4MjY2N3MwIDQ0LjM3%0D%0AMzMzMyA0LjA5NiA3NS43NzZjLTUuNDYxMzMzIDAgMTYuMzg0IDgwLjU1NDY2Ny0xNDEuOTk0NjY3%0D%0AIDEwMy43NjUzMzNTNjAuMDc0NjY3IDgzNi4yNjY2NjcgMzAuMDM3MzMzIDg2NC4yNTYgMCAxMDI0%0D%0AIDAgMTAyNGgxMDI0cy02LjgyNjY2Ny0xMzEuMDcyLTM2Ljg2NC0xNTkuNzQ0eiIgcC1pZD0iMTEx%0D%0AMyIgZmlsbD0iIzJjMmMyYyI+PC9wYXRoPjwvc3ZnPg=='
  }
}

const userUIList = {
  'admin-token': [
    {
      'type': 'company',
      'site_id': '1',
      'company_id': '1',
      'title': 'Compal'
    },
    {
      'type': 'site',
      'site_id': '1',
      'company_id': '1',
      'title': 'B1'
    }, {
      'type': 'site',
      'site_id': '2',
      'company_id': '2',
      'title': '中華票券'
    }, {
      'type': 'site',
      'site_id': '3',
      'company_id': '3',
      'title': '進修推廣部'
    }
  ],
  'company-token': [
    {
      'type': 'site',
      'site_id': '1',
      'company_id': '1',
      'title': 'B1'
    }, {
      'type': 'site',
      'site_id': '2',
      'company_id': '2',
      'title': '中華票券'
    }, {
      'type': 'site',
      'site_id': '3',
      'company_id': '3',
      'title': '進修推廣部'
    }
  ],
  'site-token': [
    {
      'type': 'site',
      'site_id': '1',
      'company_id': '1',
      'title': 'B1'
    }, {
      'type': 'site',
      'site_id': '2',
      'company_id': '2',
      'title': '中華票券'
    }, {
      'type': 'site',
      'site_id': '3',
      'company_id': '3',
      'title': '進修推廣部'
    }
  ]
}

const userList = {
  admin: 'admin',
  company: 'company',
  site: 'site'
}

export default [
  // user login
  {
    url: '/User/LoginUI/password',
    type: 'post',
    response: config => {
      const { account, password } = config.body
      if (password === userList[account]) {
        var token = tokens[account]
      }
      // mock error
      if (!token) {
        return {
          status: 60204,
          result: 'Account and password are incorrect.'
        }
      }
      return {
        status: 200,
        message: 'get data success',
        result: token
      }
    }
  },

  // get user info
  {
    url: '/User/LoginUI/userinfo\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          status: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        status: 200,
        result: info
      }
    }
  },
  // ui-selector
  {
    url: '/UI/UISystem/UserUIList',
    type: 'post',
    response: config => {
      const { token, user_id } = config.body
      const info = userUIList[token]
      // mock error
      if (!info) {
        return {
          status: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        status: 200,
        message: 'query ui list success.',
        count: info.length,
        is_admin: true,
        result: info
      }
    }
  },

  // user logout
  {
    url: '/User/logout',
    type: 'post',
    response: _ => {
      return {
        status: 200,
        result: 'success'
      }
    }
  }
]

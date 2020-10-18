<template>
  <div class="set-ui-page-container">
    <div
      style="display: inline-block;padding: 20px 40px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 400px;box-shadow: 0 0 3px #888888;"
    >
      <div class="hidden-xs-only">
        <b style="font-size: 32px">{{ title || 'Weather Info' }}</b>
        <el-button type="info" icon="el-icon-caret-left" style="float: right;" @click="handleBack">
          back
        </el-button>
      </div>
      <div class="hidden-sm-and-up">
        <b style="font-size: 20px;">{{ title || 'Weather Info' }}</b>
        <el-button type="info" icon="el-icon-caret-left" style="float: right;padding: 12px" @click="handleBack" />
      </div>
    </div>
    <div style="background-color: white;padding:30px;margin: 15px 20px 0 36px;border-radius: 4px;min-height: 68vh">
      <div style="margin: 30px 20px;">
        <el-row v-for="(value,index,key) in weatherList" :key="key">
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            {{ value['locationName'] }}
            <el-row v-for="(value2,index2,key2) in value['weatherElement']" :key="key2">
              {{ elementFilter(value2['elementName']) }}
              <el-row v-for="(value3,index3,key3) in value2['time']" :key="key3">
                {{value3['endTime']}}~{{value3['endTime']}}: {{value3['parameter']['parameterName']}}
              </el-row>
            </el-row>
            <br>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWeatherInfo } from '@/api/weather-model'

export default {
  components: {},
  data() {
    return {
      weatherList: [],
      title: ''
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.getWeatherInfo()
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    getWeatherInfo() {
      getWeatherInfo(getWeatherInfo).then(response => {
        this.title = response['records']['datasetDescription']
        this.weatherList = response['records']['location']
      })
    },
    elementFilter(elementName) {
      switch (elementName) {
        case 'Wx':
          return '天氣現象'
        case 'PoP':
          return '降雨機率(%)'
        case 'CI':
          return '舒適度'
        case 'MinT':
          return '最低溫度(攝氏度)'
        case 'MaxT':
          return '最高溫度(攝氏度)'
        default:
          return 'Default'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  // 勾選框
  /deep/ .el-checkbox__input .el-checkbox__inner {
    background-color: #fff;
    border-color: #6c7c92;
    border-radius: 100%;
    margin-top: 30px;
    margin-right: 10px;
  }

  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner::after {
    border: 2px solid #6c7c92;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    top: 1px;
    width: 3px;
    -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
  }

  //文字超出換行
  /deep/ .el-checkbox__label {
    word-break: normal;
    width: auto;
    display: inline-grid;
    white-space: pre-line;
    word-wrap: break-word;
    overflow: hidden;
    block-size: inherit;
    line-height: 14px;
  }

  // 一行一項
  /deep/ .el-checkbox {
    width: 100%;
    margin-top: 20px;
    padding-top: 10px;
  }

  .set-ui-page-container {
    min-width: 400px;
    clear: both;

    .el-checkbox.is-bordered {
    }

    .el-checkbox.is-bordered.is-checked {
      background-color: rgb(228, 246, 254);
    }
  }

</style>

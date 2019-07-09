//index.js
//获取应用实例
const app = getApp()

var countTooGetLocation = 0;
var total_micro_second = 0;
var starRun = 0;
var totalSecond = 0;
var oriMeters = 0.0;

/* 毫秒级倒计时 */
function count_down(that){

  if(starRun == 0){
    return;
  }

  if(countTooGetLocation >= 100){
    var time = date_format(total_micro_second);
    that.updateTime(time);
  }

  if(countTooGetLocation >=5000){
    that.getLocation();
    countTooGetLocation = 0;
  }

  setTimeout
    setTimeout(function(){
    countTooGetLocation += 10;
    total_micro_second += 10;
    count_down(that);
    }
    ,10
    )
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second){
  var second = Math.floor(micro_second / 1000);
  var hr = Math.floor(second / 3600);
  var min = fill_zero_prefix(Math.floor((second - hr * 3600)/60));
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// 等价于  var sec = second % 60;
  return hr + ":" + min + ":" + sec + " ";
}

function getDistance(lat1, lng1, lat2, lng2){
  var dis = 0;

  var radLat1 = toRadians(lat1);
  var radLat2 = toRadians(lat2);
  //toRadians() 方法用于将角度转换为弧度。

  var deltaLat = radLat1 - radLat2;
  var deltaLng = toRadians(lng1) - toRadians(lng2);
  var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2),2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));

  return dis * 6378137;

  function toRadians(d){
    return d * Math.PI / 180;
  }
  
}

function fill_zero_prefix(num){
  return num < 10 ? "0" + num :num
}

Page({
  /*  data: {
      item: '1',
      list: [
        "/images/星星.png",
      ]

    },

    getImage: function(e) {
      let length = this.data.list.length;
      let item1 = this.data.list[Math.floor(Math.random() * (length - 0 + 1) + 0)];
      this.setData({
        item: item1,
      })
    }


  data: {
    imageUrl:'',
    list: [
      "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/01/ChMkJ1mhRcaISLHUAAaIAQtVJyoAAf_UAJK9e8ABogZ224.jpg",
      "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/01/ChMkJ1mhRciIK04QAAPSUiTmb7UAAf_UAJRfggAA9Jq257.jpg",
      "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/01/ChMkJ1mhRciIGHuyAAIISdSwzIYAAf_UAJ1MKkAAghh731.jpg"
    ]

  },
  onLoad: function() {

  },

  getImage: function(e) {
    //先写一个数组,

    //在写随机数
    let length = this.data.list.length;
    let randomImg = this.data.list[Math.floor(Math.random() * (length - 0 + 1) + 0)];
    //最后就直接可以在分享中调用
    this.setData({
      imageUrl: randomImg,
    })

  }

  data: {
    imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg"
  },
  downLoadImage: function (event) {
    console.log(event)
    var that = this;
    this.setData({
      imageUrl: "http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"
    })
  }
*/

  data:{
    clock:'',
    isLocation:false,
    latitude:0,
    longitude:0,
    markers:[],
    covers:[],
    meters:0.00,
    time: "0:00:00"

  },

//----------------分割线---------------------

  onLoad:function(options){
    this.getLocation()
    console.log("onload")
    count_down(this);
  },

//----------------分割线---------------------

  openLocation:function(){
    wx.getLocation({
      type: 'gcj02',// 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          scale:28,
        })
      },
    })

  },

//----------------分割线---------------------

  starRun:function(){
    if (starRun == 1){
      return;
    }
    starRun = 1;
    count_down(this)
    this.getLocation();
  },

//----------------分割线---------------------

  stopRun:function(){
    starRun = 0;
    count_down(this);
  },

//----------------分割线---------------------

  updateTime:function(time){
    var data = this.data;
    data.time = time;
    this.data = data;
    this.setData({
      time :time,
    })
  },

  getLocation:function(){
    var that = this
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        console.log("res-----")
        console.log(res)

        var newCover = {
          latitude:res.latitude,
          longitude:res.longitude,
          iconPath:'data:image/png;base64,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',
        };

        var oriCovers = that.data.covers;

        console.log("oriMeters----------")
        console.log(oriMeters);

        var len = oriCovers.length;
        var lastCover;
        if(len == 0){
          oriCovers.push(newCover);
        }

        len = oriCovers.length;
        var lastCover = oriCovers[len - 1];

        console.log("oriCovers----------")
        console.log(oriCovers, len);

        var newMeters = getDistance(lastCover.latitude, lastCover.longitude, res.latitude, res.longitude) / 1000;

        if (newMeters < 0.0015) {
          newMeters = 0.0;
        }

        oriMeters = oriMeters + newMeters;
        console.log("newMeters----------")
        console.log(newMeters);


        var meters = new Number(oriMeters);
        var showMeters = meters.toFixed(2);

        oriCovers.push(newCover);

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [],
          covers: oriCovers,
          meters: showMeters,
        });
      },
    })
  }

})


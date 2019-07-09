//logs.js
const util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    item: ' ',
    color:'颜色',
    list:[
      "鸡胸肉", "土豆炖牛腩", "红烧茄子", "西红柿炒鸡蛋", "包菜炒肉", "炒河粉", "炒饭", "卤肉饭", "土豆鸡丁", "麦片粥", "腌面", "木耳炒鸡蛋", "水煮肉片", "蒸鱼", "烤地瓜", "京酱面", "猪扒饭", "猪扒饭", "麻辣烫", "炸炸", "沙县小吃", "减肥不吃了", "火锅", "皮蛋瘦肉粥", "丝瓜炒肉",
    ],
    colorList:[
      'pink', 'yellow', 'green', 'caolv', 'blue', 'red', 'grey', 'orange'      
    ]
  },

  onLoad: function () {

  },

  getLunch:function(e){
    let length = this.data.list.length;
    let length1 = this.data.colorList.length;
    let color1 = this.data.colorList[Math.floor(Math.random() * (length1 - 0 + 1) + 0)];
    let item1 = this.data.list[Math.floor(Math.random() * (length - 0 + 1) + 0)];
    this.setData({
      item:item1,
      color:color1,
    })
  }

})

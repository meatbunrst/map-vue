##v-charts配置  https://v-charts.js.org/
### :extend 所有的配置都可以用这个值重新设置
若存在extend extend中出现的设置类均为最终设置<br>
即 :legend-visible="false" 默认图例不显示<br>
但是又存在 :extend="extend"设置  'legend.textStyle.color': '#fff'（图例字体颜色设置）<p>
最终还是会显示图例
```
{
  'xAxis.0.axisLabel.rotate': 45,
   yAxis: {
    splitLine: {
      show: true,
      lineStyle: {
        color: '#303055',
        width: 0.5
      }
    }
  },
  textStyle: {
    color: '#fff'
  }
}
```
                                     
### grid 绘制区域
```
{
  bottom: 120
 }

```







<template>

  <div id="base-content">
    <input id="id1" type="hidden" value="1">
    <!--首页前进后退-->
    <go-home/>
    <!--全局搜索框-->
    <div id="search">
      <input v-model="searchParam" type="text" @keyup.enter="queryInfo">
      <button @click="queryInfo"/>
    </div>
    <!--工具栏-->
    <div class="top-tool">
      <div class="t-r"/>
      <div class="t-mid">
        <div class="t-box">
          <ul class="t-u">
            <li><a class="f-i" href="#"/></li>
            <li><a class="e-i" href="#"/></li>
            <li><a class="d-i" href="#"/></li>
            <li><a class="c-i" href="#"/></li>
            <li><a class="b-i" href="#"/></li>
            <li><a class="a-i" href="#"/></li>
          </ul>
        </div>
        <div class="line-space"/>
        <div class="t-box">
          <div class="toggle" @click="btnOff">
            <label :class="[btnOpenTrue?'toggle-radio':'toggle-radio-off']">{{ btnOpenTrue?'ON':'OFF' }}</label>
          </div>
          <h3>浮动面板：</h3>
        </div>

        <div class="line-space"/>

        <div class="t-box">
          <div class="mainBar">
            <div id="sub-3" @click="qdMenu">渠道快速定位</div>
          </div>
          <div v-show="qdMenuShow" class="menu">
            <nav class="cl-effect-1"><a class="clear-btn" @click="closeQdMenu">清除</a></nav>
            <div class="close-y"><span @click="closeQdMenu"/></div>
            <div class="m-con">
              <ul class="mu-1">
                <div class="m-title">
                  <label class="checkbox" for="checkbox1">
                    <input type="checkbox" value="">
                    <span>4G渠道</span>
                  </label>
                </div>
                <li>
                  <label class="checkbox" for="checkbox2"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox3"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox4"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox5"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox6"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox7"><input type="checkbox" value="">A1</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="line-space"/>

        <div class="t-box">
          <div class="mainBar">
            <div id="sub-2" @click="orgMenu">组织</div>
            <div id="sub-1" @click="areaMenu">地域</div>
          </div>
          <div v-show="orgMenuShow" class="menu-2">
            <nav class="cl-effect-1"><a class="clear-btn" @click="closeOrgMenu">清除</a></nav>
            <div class="close-y"><span @click="closeOrgMenu"/></div>
            <div class="m-con">
              <ul class="mu-1">
                <div class="m-title">
                  <label class="checkbox" for="checkbox1">
                    <input type="checkbox" value="">
                    <span>4G渠道</span>
                  </label>
                </div>
                <li>
                  <label class="checkbox" for="checkbox2"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox3"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox4"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox5"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox6"><input type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox7"><input type="checkbox" value="">A1</label>
                </li>
              </ul>
              <ul class="mu-1">
                <div class="m-title">
                  <label class="checkbox" for="checkbox1">
                    <input id="checkbox1" type="checkbox" value="">
                    <span>4G渠道</span>
                  </label>
                </div>
                <li>
                  <label class="checkbox" for="checkbox2"><input id="checkbox2" type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox3"><input id="checkbox3" type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox4"><input id="checkbox4" type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox5"><input id="checkbox5" type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox6"><input id="checkbox6" type="checkbox" value="">A1</label>
                </li>
                <li>
                  <label class="checkbox" for="checkbox7"><input id="checkbox7" type="checkbox" value="">A1</label>
                </li>
              </ul>
              <ul class="mu-2">
                <li>全市</li>
                <li>市级连锁组</li>
                <li>区域连锁组</li>
                <li class="l-a">东城组</li>
                <li>南城组</li>
                <li>万江组</li>
                <li>樟木头组</li>
              </ul>
            </div>
          </div>
          <div v-show="areaMenuShow" class="menu-3">
            <nav class="cl-effect-1"><a class="clear-btn" @click="closeAreaMenu">清除</a></nav>
            <div class="close-y"><span @click="closeAreaMenu"/></div>
            <div class="m-con">
              <ul class="mu-2">
                <li>全市</li>
                <li>市级连锁组</li>
                <li>区域连锁组</li>
                <li>东城组</li>
                <li>南城组</li>
                <li>万江组</li>
                <li class="l-b" href="#" >设置</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="line-space"/>

        <a class="setting" href="#"/>
      </div>
      <div class="t-l"/>
    </div>

    <div class="left-box">
      <input id="l-btn" class="l-1" type="button" value="" onclick="ShowDiv('MyDiv','fade')" >
      <!--弹出层-->
      <div id="fade" class="black_overlay"/>
      <div id="MyDiv" class="l_content" >
        <h1 class="left-title" style="float:left; font-size:24px; padding:10px 0 20px 20px;">大朗镇</h1>
        <div class="close-w"><span onclick="CloseDiv('MyDiv','fade')"/></div>
        <div class="table-box">
          <a class="add-task">发起任务</a>
          <div class="task-content">
            <ul class="menu-one">
              <li class="firstChild">
                <div class="header">
                  <span class="arrow"/>
                  <span class="txt">当月重点</span>
                </div>
                <ul class="menu-two">
                  <div class="subNavBox">
                    <div class="subNav currentDd currentDt">4G换卡渠道推进<span class="t-per"> (10%)</span> </div>
                    <ul class="navContent " style="display:block">
                      <div class="t-ti">接口人：<span class="jkman">宋慈</span>任务周期：<span class="jkman">2014/10/10--2014/11/10</span></div>
                      <p class="task-details">
                        1、确保店面已经掌握换卡的相关优惠。<br>
                        2、重点跟进渠道现有库存套卡4GUSIM卡换卡，7、8月换卡仅12%。<br>
                        3、对激活量较高但换卡量为0的渠道进行重点跟进。<br>
                        4、对渠道白卡消耗情况进行关注，及时补充。
                      </p>
                    </ul>
                    <div class="subNav">4G终端转换率<span class="t-per"> (30%)</span> </div>
                    <ul class="navContent">
                      <div class="t-ti">接口人：<span class="jkman">宋慈</span>任务周期：<span class="jkman">2014/10/10--2014/11/10</span></div>
                      <p class="task-details">
                        1、要求渠道对销售4G手机100%更换4G卡：8月销售4万4G终端中有1.3万未换4G卡。使用4G终端又换了4G卡的客户我司会月内赠送0元1G体验包。<br>
                        2、三换客户送话费优惠落地：2014年3月1日前客户完成3换（换机、换卡、换套餐），使用套餐为58/88Y以上的，11月可获赠50/100元话费。提醒渠道选择0元15G赠送方案务必选择当月生效。。<br>
                      </p>
                    </ul>
                    <div class="subNav">百日攻坚<span class="t-per"> (50%)</span><a class="brgj-icon"/></div>
                    <ul class="navContent">
                      <div class="t-ti">接口人：<span class="jkman">宋慈</span>任务周期：<span class="jkman">2014/10/10--2014/11/10</span></div>
                      <p class="task-details">
                        1、确保店面已经掌握换卡的相关优惠<br>
                        2、重点跟进渠道现有库存套卡4GUSIM卡换卡，7、8月换卡仅12%。<br>
                        3、对激活量较高但换卡量为0的渠道进行重点跟进。<br>
                        4、对渠道白卡消耗情况进行关注，及时补充。
                      </p>
                    </ul>
                  </div>
                </ul>
              </li>
              <li>
                <div class="header">
                  <span class="arrow"/>
                  <span class="txt">当月重点</span>
                </div>
                <ul class="menu-two">
                  <div class="subNavBox">
                    <div class="subNav currentDd currentDt">“雷霆万钧”渠道巡检工作第2阶段统计结果反馈<span class="t-per"> (10%)</span> </div>
                    <ul class="navContent " style="display:block">
                      <div class="t-ti">接口人：<span class="jkman">宋慈</span>任务周期：<span class="jkman">2014/10/10--2014/11/10</span></div>
                      <p class="task-details">
                        1、确保店面已经掌握换卡的相关优惠。<br>
                        2、重点跟进渠道现有库存套卡4GUSIM卡换卡，7、8月换卡仅12%。<br>
                        3、对激活量较高但换卡量为0的渠道进行重点跟进。<br>
                        4、对渠道白卡消耗情况进行关注，及时补充。
                      </p>
                    </ul>
                    <div class="subNav">社会渠道iPhone自带机优惠单张等宣传物料配送覆盖<span class="t-per"> (30%)</span> </div>
                    <ul class="navContent">
                      <div class="t-ti">接口人：<span class="jkman">宋慈</span>任务周期：<span class="jkman">2014/10/10--2014/11/10</span></div>
                      <p class="task-details">
                        1、要求渠道对销售4G手机100%更换4G卡：8月销售4万4G终端中有1.3万未换4G卡。使用4G终端又换了4G卡的客户我司会月内赠送0元1G体验包。<br>
                        2、三换客户送话费优惠落地：2014年3月1日前客户完成3换（换机、换卡、换套餐），使用套餐为58/88Y以上的，11月可获赠50/100元话费。提醒渠道选择0元15G赠送方案务必选择当月生效。。<br>
                      </p>
                    </ul>
                  </div>
                </ul>
              </li>
              <li>
                <div class="header">
                  <span class="arrow"/>
                  <span class="txt">当月重点</span>
                </div>
                <ul class="menu-two">
                  <div class="subNavBox">
                    <div class="subNav currentDd currentDt">4G换卡渠道推进<span class="t-per"> (10%)</span> </div>
                    <ul class="navContent " style="display:block">
                      <div class="t-ti">接口人：<span class="jkman">宋慈</span>任务周期：<span class="jkman">2014/10/10--2014/11/10</span></div>
                      <p class="task-details">
                        1、确保店面已经掌握换卡的相关优惠。<br>
                        2、重点跟进渠道现有库存套卡4GUSIM卡换卡，7、8月换卡仅12%。<br>
                        3、对激活量较高但换卡量为0的渠道进行重点跟进。<br>
                        4、对渠道白卡消耗情况进行关注，及时补充。
                      </p>
                    </ul>
                  </div>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="left-box-2">
      <input id="l-btn" class="l-2" type="button" value="" onclick="ShowDiv('MyDiv','fade')" >
      <!--弹出层-->
      <div id="fade1" class="black_overlay"/>
      <div id="MyDiv1" class="l_content-2" >
        <div class="close-w"><span onclick="CloseDiv('MyDiv1','fade1')"/></div>
        <div class="table-box">
          <div id="organic-tabs">
            <ul id="explore-nav">
              <li id="ex-tab-1"><a rel="tab-1" href="#" class="current">2014年6月各镇区情况统计</a></li>
              <li id="ex-tab-2"><a rel="tab-2" href="#">2014年6月发展异常镇区情况</a></li>
            </ul>
            <div id="all-list-wrap">
              <ul id="tab-1"/>
              <ul id="tab-2"/>
            </div> <!-- END List Wrap -->

          </div>
        </div>
      </div>
    </div>

    <div class="right-box">
      <input class="r-btn-1" type="button" value="">
      <div id="fade2" class="black_overlay"/>
      <div id="MyDiv2" class="r_content" >
        <div class="close-w"><span onclick="CloseDiv('MyDiv2','fade2')"/></div>
        <div class="table-box">
          fj;lajsl;dfj;asf
        </div>
      </div>
    </div>

    <div class="bottom-box">
      <a class="b-a-1" href="#"/>
      <div class="b-b">
        <div class="b-header">
          <div class="tuli">图例：</div>
          <ul class="u-1">
            <li><span class="warn-1"/>3个指标异常</li>
            <li><span class="warn-2"/>2个指标异常</li>
            <li><span class="warn-3"/>1个指标异常</li>
            <li><span class="warn-4"/>新增客户份额前十的镇区</li>
          </ul>
          <ul class="u-2">
            <li class="s-focus" ><span class="warn-15"/>考勤异常红色预警</li>
            <li><span class="warn-16"/>考勤异常橙色预警</li>
            <li><span class="warn-17"/>GIS正常登陆</li>
            <li><span class="warn-18"/>后台办公</li>
            <li><span class="warn-19"/>培训休假</li>
          </ul>
          <ul class="u-3">
            <li><span class="warn-20"/>考勤红色预警</li>
            <li><span class="warn-21"/>考勤橙色预警</li>
            <li><span class="warn-22"/>考勤正常</li>
          </ul>
        </div>
        <div class="bottom-show">
          <p>【新增份额异常】： 镇区新增份额自身环比幅度与全市环比幅度比较，绝对值超过3%，视为该镇区异常。<br><br>【预付费激活异常】：镇区预付费激活量自身环比幅度与社会渠道环比幅度比较，绝对值超过15%，视为该镇区异常。<br><br>【全球通开户异常】：镇区全球通开户量自身环比幅度与社会渠道环比幅度比较，绝对值超过15%，视为该镇区异常。
          </p>
          <ul class="u-list">
            <li><span class="warn-15"/>考勤异常红色预警：渠道经理外勤时，连续1个小时以上未登陆GIS。</li>
            <li><span class="warn-16"/>考勤异常橙色预警：渠道经理外勤时，连续半个小时以上、1个小时以内未登陆GIS。</li>
            <li><span class="warn-17"/>GIS正常登陆：渠道经理在手机客户端登陆GIS，并成功定位。</li>
            <li><span class="warn-18"/>后台办公人员：渠道经理当天排班计划表内容为后台办公。</li>
            <li><span class="warn-19"/>培训休假人员：渠道经理当天排班计划表内容为培训或者休假。</li>
            <li><span class="warn-20"/>考勤红色预警：渠道经理当月迟到、早退累计达3次以上。</li>
            <li><span class="warn-21"/>考勤橙色预警：渠道经理当月迟到、早退累计达3次以内（含3次）。</li>
            <li><span class="warn-22"/>考勤正常：渠道经理当月无迟到、早退记录。</li>
          </ul>
        </div>
      </div>
      <div class="b-c"/>
    </div>

    <div class="window-box-1">
      <h1 class="w-title">
        2014.10 渠道总览总概
      </h1>
      <div class="w-content">
        <div class="w-box">1、截止**年*月，社会渠道共有网点5600家，其中4星以上网点**家。<br><br>2、移动网点占比80%，移动核心网点占比76%，双排他占比67%，VI占比68%。<br><br>3、共有A类商圈8个，B类商圈42个和C类商圈50个。<br><br>4、**年*月共有全球通开户**，预付费套卡**，终端**。1、截止**年*月，社会渠道共有网点5600家，其中4星以上网点**家。<br><br>2、移动网点占比80%，移动核心网点占比76%，双排他占比67%，VI占比68%。<br><br>3、共有A类商圈8个，B类商圈42个和C类商圈50个。<br><br>4、**年*月共有全球通开户**，预付费套卡**，终端**。1、截止**年*月，社会渠道共有网点5600家，其中4星以上网点**家。<br><br>2、移动网点占比80%，移动核心网点占比76%，双排他占比67%，VI占比68%。<br><br>3、共有A类商圈8个，B类商圈42个和C类商圈50个。<br><br>4、**年*月共有全球通开户**，预付费套卡**，终端**。
        </div>
      </div>
    </div>

    <div class="time-box">
      <div class="t-r"/>
      <div class="t-m">
        <div class="time-select">
          <div class="year-box">
            <div class="y-pre"/>
            <input type="text" value="2014" class="year-text">
            <input type="text" value="2014" class="year-text-edit">
            <div class="y-next"/>
          </div>
          <div class="month-box">
            <div class="m-pre"/>
            <input type="text" value="12" class="month-text">
            <input type="text" value="12" class="month-text-edit">
            <div class="m-next"/>
          </div>
        </div>
        <div class="day-box">
          <div class="d-pre"/>
          <input type="text" value="15" class="day-text">
          <input type="text" value="15" class="day-text-edit">
          <div class="d-next"/>
        </div>
        <div class="hour-min-second">
          <input type="text" value="10" class="hour-text-edit"><span class="maohao">：</span>
          <input type="text" value="24" class="min-text-edit"><span class="maohao">：</span>
          <input type="text" value="36" class="second-text-edit">
        </div>
      </div>
      <div class="t-l"/>
    </div>

    <div id="map-box"><img src="@/assets/images/map.png" width="2720" height="1536" alt=""></div>

  </div>
</template>

<script>
import '@/assets/css/main.css'
import '@/assets/css/style.css'
import GoHome from '@/components/go-home'

export default {
  name: 'Base',
  components: { GoHome },
  data() {
    return {
      searchParam: '',
      btnOpenTrue: true,
      qdMenuShow: false,
      orgMenuShow: false,
      areaMenuShow: false

    }
  },
  methods: {
    onload() {

    },
    queryInfo() {
      alert(111)
    },
    btnOff() {
      // 切换样式即可
      this.btnOpenTrue = !this.btnOpenTrue
    },
    qdMenu() {
      // 渠道快速定位面板
      this.qdMenuShow = true
    },
    orgMenu() {
      // 组织面板
      this.orgMenuShow = true
    },
    areaMenu() {
      // 地域面板
      this.areaMenuShow = true
    },
    closeQdMenu() {
      // 关闭渠道面板
      this.qdMenuShow = false
    },
    closeOrgMenu() {
      // 关闭组织面板
      this.orgMenuShow = false
    },
    closeAreaMenu() {
      // 关闭地域面板
      this.areaMenuShow = false
    }

  }
}

</script>

<style scoped>

</style>

/**
 * Created by youyou on 2016/3/12.
 */
var oLi=$('ul li')
var oImg=$('ul li img')

//存储轮播图初始位置
var initLi=new Array
for(var i=0;i<oLi.length;i++){
    initLi[i]={}
    initLi[i].w=oLi.eq(i).css('width')
    initLi[i].h=oLi.eq(i).css('height')
    initLi[i].t=oLi.eq(i).css('top')
    initLi[i].l=oLi.eq(i).css('left')
    initLi[i].z=oLi.eq(i).css('z-index')
    initLi[i].o=oLi.eq(i).css('opacity')

}

//防止连续点击，程序没有运行完
var click=true
//调用函数
function start(judge){
    if(click){
        click=false
        //给数组排位置
        if(judge){
            btnPre.css({'background-size':'50px'})
            initLi.push(initLi.shift())
        }else{
            btnNext.css({'background-size':'50px'})
            initLi.unshift(initLi.pop())
        }
        //计算每个属性值的速度，时间300毫秒，间隔10毫秒调用一次
        for(var i=0;i<initLi.length;i++){
            for(var m in initLi[i]){
                switch (m){
                    case 'w':initLi[i].ws=(parseInt(initLi[i].w)-parseInt(oLi.eq(i).css('width')))/30;break
                    case 'h':initLi[i].hs=(parseInt(initLi[i].h)-parseInt(oLi.eq(i).css('height')))/30;;break
                    case 't':initLi[i].ts=(parseInt(initLi[i].t)-parseInt(oLi.eq(i).css('top')))/30;break
                    case 'l':initLi[i].ls=(parseInt(initLi[i].l)-parseInt(oLi.eq(i).css('left')))/30;break
                    case 'o':initLi[i].os=(parseFloat(initLi[i].o)-parseFloat(oLi.eq(i).css('opacity')))/30
                        ;break
                }
            }
        }
        //一共调用30次，记录调用次数
        var j=0
        var setCount=setInterval(function(){
            ++j
            for(var i=0;i<initLi.length;i++){
                //判断底部图片
                if(initLi[i].ts==0){
                    if(j<15){
                        oLi.eq(i).css({'width':parseInt(oLi.eq(i).css('width'))+initLi[i].ws,'height':parseInt(oLi.eq(i).css('height'))+initLi[i].hs,'left':parseInt(oLi.eq(i).css('left'))+initLi[i].ls,'top':parseInt(oLi.eq(i).css('top'))+initLi[i].ts,'z-index':initLi[i].z,
                            'opacity':parseFloat(oLi.eq(i).css('opacity'))+0.05
                        })
                    }else if(j>=15){
                        oLi.eq(i).css({'width':parseInt(oLi.eq(i).css('width'))+initLi[i].ws,'height':parseInt(oLi.eq(i).css('height'))+initLi[i].hs,'left':parseInt(oLi.eq(i).css('left'))+initLi[i].ls,'top':parseInt(oLi.eq(i).css('top'))+initLi[i].ts,'z-index':initLi[i].z,
                            'opacity':parseFloat(oLi.eq(i).css('opacity'))-0.05
                        })
                    }
                }else{
                    oLi.eq(i).css({'width':parseInt(oLi.eq(i).css('width'))+initLi[i].ws,'height':parseInt(oLi.eq(i).css('height'))+initLi[i].hs,'left':parseInt(oLi.eq(i).css('left'))+initLi[i].ls,'top':parseInt(oLi.eq(i).css('top'))+initLi[i].ts,'z-index':initLi[i].z,
                        'opacity':parseFloat(oLi.eq(i).css('opacity'))+initLi[i].os
                    })
                }
            }
            //结束调用
            if(j==28){
                clearInterval(setCount)
                for(var q=0;q<oLi.length;q++){
                    oLi.eq(q).css({'width':initLi[q].w,'height':initLi[q].h,'left':initLi[q].l,'top':initLi[q].t,'z-index':initLi[q].z,
                        'opacity':initLi[q].o
                    })
                    oLi.eq(q).css({'border':'none'})
                    if(parseInt(initLi[q].t)==0){
                        oLi.eq(q).css({'border':'5px white solid'})
                    }
                }
                if(judge){
                    btnPre.css({'background-size':'72px'})
                }else{
                    btnNext.css({'background-size':'72px'})
                }

                click=true
            }
        },10)
    }
}


var btnPre=$('#btnPre')
var btnNext=$('#btnNext')
btnPre.mouseover(function(){
    btnPre.css({'left':'82px','opacity':'0.8'})
})
btnPre.mouseout(function(){
    btnPre.css({'left':'72px','opacity':'1'})
})
btnNext.mouseout(function(){
    btnNext.css({'right':'62px','opacity':'1'})
})
btnNext.mouseover(function(){
    btnNext.css({'right':'72px','opacity':'0.8'})
})


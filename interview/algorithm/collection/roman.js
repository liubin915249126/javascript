// 基本字符
// I、V、X、L、C、D、M
// 分别代表
// 1、5、10、50、100、500、1000

// 计数规则：
// 若干相同数字连写表示的数是这些罗马数字的和，如III=3；
// 小数字在大数字前面表示的数是用大数字减去小数字，如IV＝4；
// 小数字在大数字后面表示的数是用大数字加上小数字，如VI=6;
// 组合规则：
// 基本数字Ⅰ、X 、C 中的任何一个，自身连用构成数目，或者放在大数的右边连用构成数目，都不能超过三个；放在大数的左边只能用一个。
// 不能把基本数字 V 、L 、D 中的任何一个作为小数放在大数的左边采用相减的方法构成数目；放在大数的右边采用相加的方式构成数目，只能使用一个。
// V 和 X 左边的小数字只能用 Ⅰ。
// L 和 C 左边的小数字只能用 X。
// D 和 M 左 边的小数字只能用 C 。
// 4000 以下的正整数阿拉伯数字



// 按照1000，100，10，1来进行分步，所以循环四次。
// 在循环内部进行位数的处理，先看位数是否是9，是9，字符串直接加入相应字符。
// 否是否>=5，是的先将5的字符放入。
// 再处理剩下的，如果剩余==4，加入4的特殊字符，否则直接repeat对应位的字符。

function convert(num) {
    var n,m,str="",i=1000;
      for(;i>0;i/=10){
        n=Math.floor(num/i);//向下取整
        m=n;
        switch(i){
          case 1000:
        {
    
          if(m>0) str+="M".repeat(n);
          num-=n*i;//减去
          break;
        }
          case 100:
        {
          if(n==9) {str+="CM";m-=9;}
          if(m>=5) {str+="D"; m-=5;}
          if(m==4) {str+="CD"; m-=4;}
          if(m>0) str+="C".repeat(m);
          num-=n*i;
          break;
        }
          case 10:
        { if(n==9) {str+="XC";m-=9;}
          if(m>=5) {str+="L"; m-=5;}
          if(m==4) {str+="XL"; m-=4;}
          if(m>0) str+="X".repeat(m);
          num-=n*i;
          break;
        }
          case 1:
        {
           if(n==9) {str+="IX";m-=9;}
          if(m>=5) {str+="V"; m-=5;}
          if(m==4) {str+="IV"; m-=4;}
          if(m>0) str+="I".repeat(m);
          num-=n*i;
          break;
        }
      }
      }
    
      return str;
    }
    
    convert(16);







function convert(num) {
  var a = [
    ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
    ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
    ["", "M", "MM", "MMM"],
  ];
  var i = a[3][Math.floor(num / 1000)];
  var j = a[2][Math.floor((num % 1000) / 100)];
  var k = a[1][Math.floor((num % 100) / 10)];
  var l = a[0][num % 10];
  return i + j + k + l;
}

convert(36);

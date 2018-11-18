var datas = [{a:3,b:"haha"},{a:5,b:"hehe"},{a:1,b:"xixi"},{a:9,b:"lele"},{a:0,b:"lesle"},{a:11,b:"lelee"},{a:0,b:"lerle"},{a:0,b:"letle"}];

var da = [];

for(i=0;i<datas.length;i++){
	if(datas[i].a>0){
		da = da.push(datas[i]);

	}else{
		datas = datas;
	}
}

console.log(da)


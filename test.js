var add = [[1,2],[2,3],[3,4],4,5];

const promise = add.map(function(item){
	return item
})


Promise.all(promise).then(function(value){
	console.log(value)
})




var arr = [1,23,4,6,8,10];

function bableSort(arr){
    for (var i = 1; i < arr.length; i++) {
    	for (var j = 0; j < arr.length -i ; j++) {
    		if (arr[j]>arr[j+1]) {
    			[arr[j+1],arr[j]] =  [arr[j],arr[j+1]];
    		}
    	}
    }
    return arr;
}
console.log(bableSort(arr))

function quickSort(arr){
    var arrL = [],
    	arrR = [];
    for (var i = 1; i < arr.length; i++) {
    	arr[0]
    	if (arr[i] > arr[0]) {
    		arrL.push(arr[i]);
    	}else {
    		arrR.push(arr[i]);
    	}
    }	
    return quickSort(arrL).concat(arr[0],quickSort(arrR));
}
console.log(quickSort(arr))
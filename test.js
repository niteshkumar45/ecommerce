let arr = [34,76,9,43,78,45,32,766,9,8]

let newarr = []

arr = arr.filter(item=>{
    if(item===9 || item ===32){
        return true;
    }
})

console.log(arr);
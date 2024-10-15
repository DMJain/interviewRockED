const modifySearchedQuerry = (data) => {
    var nowDate = new Date(); 
    var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
    let returnData = []

    for(x in data){
        console.log(x)
        if(data[x].status == 'PUBLISHED' && data[x].start_Date >= date ){
            data[x].status = 'ACTIVE'
        }
        returnData.push(data[x])
    }

    console.log('return data',returnData)

    return returnData;
}

module.exports = {modifySearchedQuerry}
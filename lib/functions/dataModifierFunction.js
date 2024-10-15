const addMonthsToDate = (dateString, monthsToAdd) => {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date; // Format as YYYY-MM-DD
  }

var nowDate = new Date(); 

const modifySearchedQuerry = (data) => {
    let returnData = data.map((certificate) => {
        const endDate = addMonthsToDate(certificate.start_Date, certificate.duration_month)
        if(certificate.status === 'PUBLISHED' && certificate.start_Date <= nowDate){
            if(endDate < nowDate){
                return {...certificate, status: 'EXPIRED'}
            }else {
                return {...certificate, status: 'ACTIVE'};
            }   
        }else {
            return certificate
        }
    })

    return returnData;
}

const modifyUserSearchData = (data) => {
    let returnData = data.map((certificate) => {
        const endDate = addMonthsToDate(certificate.start_Date, certificate.duration_month)
            if(endDate >= nowDate){
                return {...certificate, status: 'ACTIVE'};
            }
    })

    return returnData;
}

module.exports = {modifySearchedQuerry, modifyUserSearchData}
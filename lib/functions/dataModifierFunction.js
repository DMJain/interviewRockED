function addMonthsToDate(dateString, monthsToAdd) {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date; // Format as YYYY-MM-DD
  }
  
  const dateString = '2023-10-15';
  const newDateString = addMonthsToDate(dateString, 3);
  console.log(newDateString); // Output: 2024-01-15


const modifySearchedQuerry = (data) => {
    var nowDate = new Date(); 
    var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();

    let returnData = data.map((certificate) => {
        const endDate = addMonthsToDate(certificate.start_Date, certificate.duration_month)
        if(certificate.status === 'PUBLISHED'){
            if(certificate.start_Date <= nowDate){
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

module.exports = {modifySearchedQuerry}
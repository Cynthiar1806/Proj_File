const listOfBills = [
    //Bill 1
    {
      name:"Lunch",
      lineItems:[
          {
            paidBy:"A",
            amount: 1000
          },
          {
            paidBy:"B",
            amount: 500
          },
          {
            paidBy:"C",
            amount: 2000
          }
      ]
    },
    //Bill 2
     {
      name:"Dinner",
      lineItems:[
          {
            paidBy:"A",
            amount: 3000
          },
          {
            paidBy:"B",
            amount: 0
          },
          {
            paidBy:"C",
            amount: 0
          }
      ]
    }
   ]
   
   //function summarizeByUsers can return an output in this format
   
   const summarizedByUsers =[
     {
       user:"A",
       average: 2166.67,
       paid: 4000
     },
     {
       user:"B",
       average: 2166.67,
       paid: 500
     },
     {
       user:"C",
       average: 2166.67,
       paid: 2000
     }
    ]
   
   //function settleBills() takes this object and returns in this format
   /*
   *  4000    2166.67     +1833.33
   *   500    2166.67     -1666.67
   *  2000     2166.67     -166.67
   */

   console.log("**BILL SPLITS**");

   function create_lists(listOfBills:any):any[]{
    var array_list=new Array();
    //for(var i=0;i<listOfBills['lineItems'].length;i++){
      for(var i in listOfBills['lineItems']){
        //console.log(Object.values(listOfBills['lineItems'][i]));
      array_list.push(Object.values(listOfBills['lineItems'][i]));
  }
  return array_list;
  }
  
  var array_list=listOfBills.map(create_lists);
  

  function create_dicts(array_list:any):any{
      var list=[];
    //for(var i=0;i<array_list.length;i++){
      for(var i in array_list){
        var dicts = {};
       // create an empty array
      //for(var j=0;j<array_list[i].length;j++){
        for(var j in array_list[i]){
        dicts[array_list[i][j][0]]=array_list[i][j][1];
        }
        list.push(dicts);
    }
    return list;
  }
  
  var items=create_dicts(array_list);
  var Bill1=items[0];
  var Bill2=items[1];
  
  function summarizeByUsers(dicts_array:any):any{
    var out_dict = {};
    for(var dict in dicts_array){
        for(var d in dicts_array[dict]){
            if(!(Object.keys(out_dict).includes(d))){
                out_dict[d] = dicts_array[dict][d];
            } else {
                out_dict[d] += dicts_array[dict][d];
            }
        }
    }
    
    return out_dict
}

var summarize_ByUsers:any=summarizeByUsers([Bill1,Bill2]);
console.log("Summarised By Users:");
console.log(summarize_ByUsers);

function BillSplits(dict:any):any {
    var paidBy:string[]= Object.keys(dict);
    let listInitial:string[]=paidBy.slice();
    var amount:number[]= Object.values(dict);
    let totalAmount:number= amount.reduce((acc, curr) => curr+acc);
    var share:number = Math.round(totalAmount/paidBy.length);
    let sortedPaidBy:string[]= paidBy.sort((p1,p2) => dict[p1]-dict[p2]);
    const sortedValuesPaid:number[]= sortedPaidBy.map((person) => dict[person]-share);
    console.log("PaidBy "+" Share "+" Amount "+" Remaining ");
    for(var d in paidBy){
        console.log(listInitial[d]+"\t"+share+"\t"+amount[d]+"\t"+(amount[d]-share));
    }
    console.log("\n");
    let i = 0;
    let j = sortedPaidBy.length - 1;
    let debt:number;
    while (i < j) {
      debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;
      console.log(sortedPaidBy[i]+" owes "+sortedPaidBy[j]+" "+debt);
      if (sortedValuesPaid[i] === 0) {
        i++;
      }
      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
  }
  
  BillSplits(summarize_ByUsers);
  
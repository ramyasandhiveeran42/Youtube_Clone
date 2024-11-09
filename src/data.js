export const API_KEY = "AIzaSyCiPJvLIoIC9MBeLr81QF_KEjOlM0IWQsI";
import moment from 'moment';


/// views converter
export const value_converter =(value)=>{
    if(value >= 1000000){
       return Math.floor(value/1000000)+"M"
    } else if(value >= 1000){
          return Math.floor(value/1000)+"K"
    }else{
        return value
    }
}

/// 2 days ago 5 days ago like this converter using moment package
export const beforeDaysMonths =(value)=>{
    return moment(value).fromNow();
}
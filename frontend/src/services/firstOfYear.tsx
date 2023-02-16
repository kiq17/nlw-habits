import dayjs from "dayjs";



const allDates = () => {
    const firstOfYear = dayjs().startOf("year");
    const today = new Date();


    const dates= [];
    let compareDays = firstOfYear;

    while(compareDays.isBefore(today)){
        dates.push(compareDays.toDate());
        compareDays = compareDays.add(1, "day")
    };

    return dates;
}

export default allDates;
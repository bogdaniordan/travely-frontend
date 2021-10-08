export const getCityCoordinates = city => {
    if (city.toLowerCase() === "london") {
        return [51.507351, -0.127758]
    } else if (city.toLowerCase() === "bucharest") {
        return [44.426765, 26.102537]
    } else if (city.toLowerCase() === "toronto") {
        return [43.653225, -79.383186]
    } else if (city.toLowerCase() === "paris") {
        return [48.856613, 2.352222]
    } else if(city.toLowerCase() === "mumbai") {
        return [19.075983, 72.877655]
    }
}

export const getBookingDuration = (rawStartDate, rawEndDate) => {
    const startDate = new Date(rawStartDate);
    const endDate = new Date(rawEndDate);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    let days = differenceInTime / (1000 * 3600 * 24) + 1;
    if (days < 1) {
        days = 1;
    }
    return days
}
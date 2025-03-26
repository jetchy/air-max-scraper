const fetchAirMaxTrainers = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/scrapers");
        if (response.status !== 200) {
            throw "Unable to get data"
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

export {
    fetchAirMaxTrainers
}
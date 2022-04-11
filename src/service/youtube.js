class Youtube{
    constructor(key) {
        this.key = key
        this.requestOptions = {
            method: "GET",
            redirect: "follow",
        };
    }    

    mostPopular = async () => {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
            this.requestOptions);
        const result_1 = await response.json();
        return result_1.items;   
    }

    search = async (query) => {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
            this.requestOptions
        );
        const result_1 = await response.json();
        console.log(result_1.items);
        return result_1.items.map((item) => ({ ...item, id: item.id.videoId }));
        }
}

export default Youtube;
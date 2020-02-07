const apiKey = 'obgzb9WQz1YAA0HDfVVlTb7OEVByz63EHypQfWQ93KjO6ue_hkonlEIdgK1WlrUYkAKyK4O8BQZ1tvWUOXvQ_RxfroDrkLR6y8P3SP8vnSg876ha7BfOTU_ZDGc8XnYx';


const Yelp = {
    search: function (term, location, sortBy){
        return fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            }
        ).then(response =>{
            return response.json();
        }).then(jsonResponse =>{
            if (jsonResponse.businesses){
                return jsonResponse.businesses.map(business => ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                }));
            }
        });
    }
}

export default Yelp;
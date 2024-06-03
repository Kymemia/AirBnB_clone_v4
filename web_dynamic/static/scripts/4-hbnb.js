#!/usr/bin/node
// This script is executed only when DOM is loaded
$(document).ready(function () {
  const amenityDict = {};

  $('input:checkbox').change(function () {
    const dataId = $(this).data('id');
    const dataName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenityDict[dataId] = dataName;
    } else {
      delete amenityDict[dataId];
    }

    const amenityNames = Object.values(amenityDict).join(', ');
    $('DIV.amenities h4').text(amenityNames);
  });

  function checkApiStatus () {
    fetch('http://0.0.0.0:5001/api/v1/status/')
		    .then(response => response.json())
		    .then(data => {
			    if (data.status === 'OK') {
				    document.querySelector('#api_status').classList.add('available');
			    } else {
				    document.querySelector('#api_status').classList.remove('available');
			    }
		    })
		    .catch(() => {
			    document.querySelector('#api_status').classList.remove('available');
		    });
  }
  checkApiStatus();

  function fetchPlaces () {
    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(data => {
        const placesSection = document.querySelector('section.places');
        placesSection.innerHTML = ''; // Clear any existing places
        data.forEach(place => {
          const article = document.createElement('article');

          const titleBox = document.createElement('div');
          titleBox.className = 'title_box';
          const title = document.createElement('h2');
          title.textContent = place.name;
          const price = document.createElement('div');
          price.className = 'price_by_night';
          price.textContent = `$${place.price_by_night}`;
          titleBox.appendChild(title);
          titleBox.appendChild(price);

          const information = document.createElement('div');
          information.className = 'information';
          const maxGuest = document.createElement('div');
          maxGuest.className = 'max_guest';
          maxGuest.textContent = `${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`;
          const numberRooms = document.createElement('div');
          numberRooms.className = 'number_rooms';
          numberRooms.textContent = `${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`;
          const numberBathrooms = document.createElement('div');
          numberBathrooms.className = 'number_bathrooms';
          numberBathrooms.textContent = `${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`;
          information.appendChild(maxGuest);
          information.appendChild(numberRooms);
          information.appendChild(numberBathrooms);

          const description = document.createElement('div');
          description.className = 'description';
          description.innerHTML = place.description;

          article.appendChild(titleBox);
          article.appendChild(information);
          article.appendChild(description);

          placesSection.appendChild(article);
        });
      })
      .catch(error => console.error('Error fetching places:', error));
  }

  fetchPlaces();

	$('button').click(function() {
		const selectedAmenities = Object.keys(amenityDict);
		const requestData = selectedAmenities.length ? { amenities: selectedAmenities } : {};
		fetchPlaces(requestData);
	});
});

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
});

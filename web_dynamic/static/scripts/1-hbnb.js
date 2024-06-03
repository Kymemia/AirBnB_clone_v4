#!/usr/bin/node
// This script is executed only when DOM is loaded
$(document).ready(function() {
	const amenityDict = {};

	$('input:checkbox').change(function() {
		const dataId = $(this).data('id');
		const dataName = $(this).data('name');

		if ($(this).prop(':checked')) {
			amenityDict[dataId] = dataName;
		} else {
			delete amenityDict[dataId];
		}

		const amenityNames = object.values(amenityDict).join(', ');
		$('DIV.amenities h4').text(amenityNames);
	});
});

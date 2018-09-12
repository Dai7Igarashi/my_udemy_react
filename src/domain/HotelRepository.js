import geolib from 'geolib';

import Rakuten from '../lib/Rakuten';
import ENV from '../../config';

// eslint-disable-next-line import/prefer-default-export
export const searchHotelByLocation = (location) => {
	const params = {
		applicationId: ENV.RAKUTEN_APP_ID,
		datumType: 1,
		latitude: location.lat,
		longitude: location.lng,
	};
	return Rakuten.Travel.simpleHotelSearch(params)
		.then(result =>
			result.data.hotels.map((hotel) => {
				console.log(hotel);
				const basicInfo = hotel.hotel[0].hotelBasicInfo;
				const distance = geolib.getDistance(
					{ latitude: params.latitude, longitude: params.longitude },
					{ latitude: basicInfo.latitude, longitude: basicInfo.longitude },
				);
				return {
					id: basicInfo.hotelNo,
					name: basicInfo.hotelName,
					url: basicInfo.hotelInformationUrl,
					thumbUrl: basicInfo.roomThumbnailUrl,
					price: basicInfo.hotelMinCharge,
					reviewAverage: basicInfo.reviewAverage,
					reviewCount: basicInfo.reviewCount,
					distance,
				};
			}),
		);
};

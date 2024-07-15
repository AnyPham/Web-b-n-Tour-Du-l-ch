import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

//export những giá trị trong redux mà chúng ta muốn lấy ra, khi muốn lấy ra chúng ta gọi đến lớp này

export const toursSelector = (state) => state.tours.tours
export const statusToursSelector = (state) => state.tours.status
export const errorToursSelector = (state) => state.tours.error

export const filtersSelector = (state) => state.filters
export const arrangementSelector = (state) => state.arrangement.arrangement


export const toursRemainingSelector = createSelector(
    toursSelector,
    filtersSelector,
    arrangementSelector,
    (tours, filters, arrangement) => {
        const { key, starting, destination, date, areaHot } = filters;

        // Kiểm tra nếu các giá trị filters đều rỗng
        if (!key && !starting && !destination && !date && !areaHot) {
            return tours;
        }

        // Áp dụng các bộ lọc nếu các giá trị filters không rỗng
        let filteredTours = tours;
        if (key) {
            filteredTours = filteredTours.filter((tour) => tour.catagoryId == key);
        }
        if (starting) {
            filteredTours = filteredTours.filter((tour) => tour.start_location === starting);
        }
        if (destination) {
            filteredTours = filteredTours.filter((tour) => tour.end_location === destination);
        }

        if (date) {
            filteredTours = filteredTours.filter((tour) => tour.start_date === date);
        }
        if (areaHot) {
            filteredTours = filteredTours.filter((tour) => tour.end_location === areaHot);
        }
        // Áp dụng sắp xếp theo arrangement
        if (arrangement === 'duration') {
            filteredTours.sort((a, b) => a.quantity_date.localeCompare(b.quantity_date));
        } else if (arrangement === 'departure') {
            filteredTours.sort((a, b) => a.start_date.localeCompare(b.start_date));
        } else if (arrangement === 'price') {
            filteredTours.sort((a, b) => Number(a.price_adult) - Number(b.price_adult));
        }
        return filteredTours;
    }
);

export const cartsSelector = (state) => state.carts

export const startlocationsSelector = createSelector(
     toursSelector,
     (tours) => {
        const startLocations = tours.map((item) => item.start_location);
        return startLocations.filter((value, index, self) => self.indexOf(value) === index);
     }
)

export const startDatesSelector = createSelector(
     toursSelector,
     (tours) => {
        const startLocations = tours.map((item) => item.start_date);
        return startLocations.filter((value, index, self) => self.indexOf(value) === index);
     }
)

export const endLocationsSelector = createSelector(
     toursSelector,
     (tours) => {
        const endlocations = tours.map((item) => item.end_location);
        return endlocations.filter((value, index, self) => self.indexOf(value) === index);
     }
)

export const locationHotDomestic = createSelector(
  toursSelector,
  (tours) => {
    const categoryIdToFilter = 1;

    // Lọc danh sách các end_location có catagoryId = 1 và loại bỏ giá trị trùng lặp
    const Locations = [...new Set(
      tours
        .filter(tour => tour.catagoryId === categoryIdToFilter)
        .map(tour => tour.end_location)
    )].slice(0, 10);

    return Locations;
  }
);


export const locationHotForeign = createSelector(
     toursSelector,
     (tours) => {
        const categoryIdToFilter = 2;
        const Locations = [...new Set(
            tours
            .filter(tour => tour.catagoryId === categoryIdToFilter)
            .map(tour => tour.end_location)
        )].slice(0, 10);;

        return Locations;
    }

)

export const commentsSelector = (state) => state.comments.comments

export const getcommentsByIdTour = createSelector(
  [commentsSelector, (_, idTour) => idTour], // Đặt tham số idComment vào selector
  (comments, idTour) =>
    comments.filter((comment) => comment.idTour === idTour)
);


export const subCommentsSelector = (state) => state.subComments.subComments
// Selector lấy ra các object trong mảng "subComments" dựa trên giá trị của "idComment"
export const getSubCommentsByIdComment = createSelector(
  [subCommentsSelector, (_, idComment) => idComment], // Đặt tham số idComment vào selector
  (subComments, idComment) =>
    subComments.filter((comment) => comment.idComment === idComment)
);


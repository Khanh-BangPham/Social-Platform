import { userService } from "../services/user";
import { USER_LOGIN, getGlobalState } from "../store/queryClient";

function getLocation() {
  return new Promise<GeolocationPosition>((res, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        res(position);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      rej("Geolocation is not supported by this browser.");
    }
  });
}

export const updateUserLocation = async () => {
  let user = getGlobalState(USER_LOGIN);
  if (user) {
    let location = await getLocation();
    await userService.updateLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }
};

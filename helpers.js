import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";

//helpers functions to create and cancel local notifications

const NOTIFICATION_KEY = "flashcardnotification";

export const clearLocalNotifications = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};

const localNotification = {
  title: "It's Quiz Time!",
  body: "Have to quiz yourself today!",
};
export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationAsync();

            const time = new Date();
            time.setDate(time.getDate() + 1);
            time.setHours(16);
            time.setMinutes(0);

            const schedulingOptions = {
              time: time,
            };
            Notifications.scheduleLocalNotificationAsync(
              localNotification,
              schedulingOptions
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};

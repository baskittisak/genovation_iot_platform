import { AxiosError } from "axios";
import Cookies from "universal-cookie";
import modal from "antd/lib/modal";
import notification from "antd/lib/notification";

export const onLogout = () => {
  const cookies = new Cookies();
  cookies.remove("access_token");
  cookies.remove("username");
  window.location.reload();
};

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message;
    const isTokenValid = error.status === 403 && message?.includes("Token");
    if (isTokenValid) {
      modal.error({
        title: message,
        content: "Please log out and log in again to obtain a new token.",
        onOk: () => onLogout(),
      });
    } else {
      notification.error({
        message: error.response?.data?.message,
        description: "Please try again.",
      });
    }
  } else {
    notification.error({
      message: (error as string).toString(),
      description: "Please try again.",
    });
  }
};

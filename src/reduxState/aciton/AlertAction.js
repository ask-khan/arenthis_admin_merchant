import swal from "sweetalert";

const setAlert = (status, message, variant) => {
  swal(status, message, variant);
};

export { setAlert };
